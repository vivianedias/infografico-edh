import { useState } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { log } from "next-axiom";

import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import {
  Head,
  BrazilMap,
  BrazilGeojson,
  YearButtons,
} from "../shared/components";

import fetcher from "../shared/utils/fetcher";
import { Response } from "../shared/types/airtable";

export default function Home({
  data: tableData,
  error,
}: {
  data: Response[] | null;
  error?: boolean;
}) {
  const { t } = useTranslation("home");

  const periodsDistinct = tableData
    ? [...new Set(tableData.map((item) => item.periodo))]
    : [""];
  const [selectedPeriod, selectPeriod] = useState<string>(periodsDistinct[0]);

  const tableDataFilteredByPeriod = tableData?.filter(
    (data) => data.periodo === selectedPeriod
  );

  return (
    <>
      <Head title={t("meta.title")} description={t("meta.description")} />
      <Box width={"100%"}>
        <Heading size={"3xl"} color={"brand.primary"} pb={4}>
          {t("title")}
        </Heading>
        <Text fontSize={"3xl"} fontWeight={300} color={"brand.primary"} pb={8}>
          {t("subtitle")}
        </Text>
        {error ? <p>There was an error while fetching the data</p> : null}
        <HStack justifyContent={"center"} align={"flex-start"}>
          {tableDataFilteredByPeriod && tableDataFilteredByPeriod.length > 0 ? (
            <BrazilGeojson>
              {({ data, error }) => {
                return (
                  <BrazilMap
                    data={data}
                    tableData={tableDataFilteredByPeriod}
                    error={error}
                  />
                );
              }}
            </BrazilGeojson>
          ) : null}
          <YearButtons
            years={periodsDistinct}
            selectPeriod={selectPeriod}
            selectedPeriod={selectedPeriod}
          />
        </HStack>
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const data = await fetcher(`/api/airtable?lng=${ctx.locale || "pt-BR"}`);

    return {
      props: {
        data,
        locale: ctx.locale,
        ...(await serverSideTranslations(ctx.locale || "pt-BR", [
          "home",
          "header",
          "footer",
        ])),
      },
    };
  } catch (e) {
    log.error(`Error trying to fetch airtable data`, e);
    return {
      props: {
        data: null,
        error: true,
        locale: ctx.locale,
        ...(await serverSideTranslations(ctx.locale || "pt-BR", [
          "home",
          "header",
          "footer",
        ])),
      },
    };
  }
};

import { useState } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { log } from "next-axiom";

import { Box, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import {
  Head,
  BrazilMap,
  BrazilGeojson,
  YearButtons,
  Timeline,
} from "../shared/components";

import fetcher from "../shared/utils/fetcher";
import { Response } from "../shared/types/airtable";
import getDistinct from "@/shared/utils/getDistinct";

export default function Home({
  data: { tableData, timeline },
  error,
}: {
  data: Response;
  error?: boolean;
}) {
  const { t } = useTranslation("home");

  const periodsDistinct = getDistinct(tableData, "periodo");
  const [selectedPeriod, selectPeriod] = useState<string>(periodsDistinct[0]);

  return (
    <>
      <Head title={t("meta.title")} description={t("meta.description")} />
      <Box width={"full"}>
        <Heading size={"3xl"} color={"brand.primary"} pb={4}>
          {t("title")}
        </Heading>
        <Text fontSize={"3xl"} fontWeight={300} color={"brand.primary"} pb={8}>
          {t("subtitle")}
        </Text>
        {error ? <Text>{t("errorMsg.loadingMapData")}</Text> : null}
        {tableData && tableData.length > 0 ? (
          <BrazilGeojson>
            {({ data }) => {
              return (
                <Stack
                  justifyContent={"center"}
                  align={"flex-start"}
                  direction={{ base: "column-reverse", lg: "row" }}
                  spacing={8}
                >
                  <BrazilMap
                    data={data}
                    tableData={tableData}
                    selectedPeriod={selectedPeriod}
                  />
                  <VStack
                    spacing={6}
                    align={"flex-start"}
                    minW={{ base: "100%", lg: "unset" }}
                  >
                    <YearButtons
                      years={periodsDistinct}
                      selectPeriod={selectPeriod}
                      selectedPeriod={selectedPeriod}
                    />
                    <Timeline
                      timeline={timeline}
                      selectedPeriod={selectedPeriod}
                    />
                  </VStack>
                </Stack>
              );
            }}
          </BrazilGeojson>
        ) : null}
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

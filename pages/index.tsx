import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import { Head, BrazilMap, BrazilGeojson } from "../shared/components";

import fetcher from "../shared/utils/fetcher";
import { Response } from "../shared/types/airtable";
import { log } from "next-axiom";

export default function Home({
  data: tableData,
  error,
}: {
  data: Response[] | null;
  error?: boolean;
}) {
  const { t } = useTranslation("home");

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
        {tableData ? (
          <HStack justifyContent={"center"}>
            <BrazilGeojson tableData={tableData}>
              {({ data, error }) => (
                <BrazilMap data={data} tableData={tableData} error={error} />
              )}
            </BrazilGeojson>
          </HStack>
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

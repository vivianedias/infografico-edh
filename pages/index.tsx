import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { Box } from "@chakra-ui/react";
import { Head, BrazilMap, BrazilGeojson } from "../shared/components";

import fetcher from "../shared/utils/fetcher";
import { Response } from "../shared/types/airtable";

export default function Home({
  data,
  error,
}: {
  data: Response[] | null;
  error?: boolean;
}) {
  const { t } = useTranslation("common");

  return (
    <>
      <Head title={t("title")} description={t("description")} />
      <Box width={"100%"}>
        {t("content")}
        {error ? <p>There was an error while fetching the data</p> : null}
        {data ? data.map((i) => <p key={i.id}>{i.estado__nome}</p>) : null}
        <BrazilGeojson>
          {({ data, error }) => <BrazilMap data={data} error={error} />}
        </BrazilGeojson>
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
          "common",
          "header",
          "footer",
        ])),
      },
    };
  } catch (e) {
    return {
      props: {
        data: null,
        error: true,
        locale: ctx.locale,
        ...(await serverSideTranslations(ctx.locale || "pt-BR", [
          "common",
          "header",
          "footer",
        ])),
      },
    };
  }
};

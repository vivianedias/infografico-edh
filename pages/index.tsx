import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { Box } from "@chakra-ui/react";
import { Head } from "../shared/components";

import fetcher from "../shared/utils/fetcher";
import { Response } from "../shared/types/airtable";

export default function Home({ data }: { data: Response[] }) {
  const { t } = useTranslation("common");

  return (
    <>
      <Head title={t("title")} description={t("description")} />
      <Box>
        {t("content")}
        {data.map(i => <p key={i.id}>{i.estado__nome}</p>)}
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await fetcher("/api/airtable");

  try {
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
        data: {
          name: "Something went wrong",
        },
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

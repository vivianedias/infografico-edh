import { Box, Divider, Flex, HStack, Link, Text, Stack, VStack } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { IS_IN_MAINTENANCE } from "../utils/constants";

import Logo from "./Logo";

export default function Footer() {
  const { t } = useTranslation("footer");

  if (IS_IN_MAINTENANCE) {
    return null;
  }

  return (
    <Box width={"100%"} as="header">
      <Flex
        bg={"black"}
        minH={{ base: "190px", md: "385px" }}
        w={"100%"}
        align={"center"}
        justify={"center"}
      >
        <VStack spacing={10}>
        <HStack
          maxW={{ base: "550px", md: "1080px" }}
          align={{ base: "flex-start", md: "flex-start" }}
          justify={{ base: "space-between", md: "sparce-between" }}
          spacing={20}
          paddingRight={{ base: "15px", md: "0" }}
        >
          <Logo t={t} w={{ base: "300px", md: "225px" }} />
          <FooterColumn FOOTER_ITEMS={FIRST_SESSION_ITEMS(t)} />
          <FooterColumn FOOTER_ITEMS={SECOND_SESSION_ITEMS(t)} />
          <FooterColumn FOOTER_ITEMS={THIRD_SESSION_ITEMS(t)} />
          
        </HStack>
        <Divider borderColor={"header.menu.hover"} />
        </VStack>
      </Flex>
    </Box>
  );
}

const FooterColumn = ({ FOOTER_ITEMS }: { FOOTER_ITEMS: FooterItensType }) => {
  return (
    <Stack align={"flex-start"} spacing={0.5} w={{ md: "225px" }}>
      {FOOTER_ITEMS.map((navItem, i) => (
        <Link
          key={`${navItem.label}-${i}`}
          href={"#"}
          isExternal
          fontSize={"16px"}
          fontWeight={500}
          _hover={{
            textDecoration: "none",
            color: "header.menu.hover",
          }}
        >
          {navItem.label}
        </Link>
      ))}
    </Stack>
  );
};

const FIRST_SESSION_ITEMS = (t: TranslationType): FooterItensType => {
  return [
    {
      label: t("home"),
      href: "https://institutoaurora.org/",
    },
    {
      label: t("whoWeAre"),
      href: "https://institutoaurora.org/quem-somos/",
    },
    {
      label: t("blog"),
      href: "https://institutoaurora.org/blog/",
    },
    {
      label: t("portfolio"),
      href: "https://institutoaurora.org/portfolio/",
    },
    {
      label: t("transparency"),
      href: "https://institutoaurora.org/transparencia/",
    },
  ];
};

const SECOND_SESSION_ITEMS = (t: TranslationType): FooterItensType => {
  return [
    {
      label: t("donate"),
      href: "https://bit.ly/doeparaoaurora",
    },
    {
      label: t("join"),
      href: "https://institutoaurora.org/faca-parte/",
    },
    {
      label: t("nextEvents"),
      href: "https://www.sympla.com.br/urlAlias/render?alias=institutoaurora",
    },
    {
      label: t("contact"),
      href: "https://institutoaurora.org/contato/",
    },
  ];
};

const THIRD_SESSION_ITEMS = (t: TranslationType): FooterItensType => {
  return [
    {
      label: t("useTerms"),
      href: "https://institutoaurora.org/politica-de-privacidade-e-termos-de-uso/",
    },
    {
      label: t("privacyPolicy"),
      href: "https://institutoaurora.org/politica-de-privacidade-e-termos-de-uso/",
    },
  ];
};

type TranslationType = (param: string) => string;
type FooterItensType = Array<{
  label: string;
  href: string;
}>;

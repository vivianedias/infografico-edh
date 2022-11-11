import { Box, Button, Flex, Heading, Link, Stack } from "@chakra-ui/react";
import NextLink from "next/link";
import { useTranslation } from "next-i18next";
import { IS_IN_MAINTENANCE } from "../utils/constants";
import React from "react";

export default function Header() {
  const { t } = useTranslation("header");

  if (IS_IN_MAINTENANCE) {
    return null;
  }

  return (
    <Box position={"fixed"} width={"100%"} zIndex={1000} fontFamily={"heading"}>
      <Flex
        bg={"header.background"}
        // color={useColorModeValue("gray.600", "gray.50")}
        minH={"124px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderStyle={"solid"}
        align={"center"}
      >
        <Flex
          flex={{ base: 1 }}
          display={{ base: "none", md: "flex" }}
          justify={{ base: "center" }}
        >
          <DesktopNav />
        </Flex>
      </Flex>
    </Box>
  );
}

const DesktopNav = () => {
  const { t } = useTranslation("header");
  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS(t).map((navItem, i) => (
        <Link
          key={`${navItem.label}-${i}`}
          href={navItem.href}
          isExternal
          fontSize={"14px"}
          fontWeight={700}
          color={"header.link"}
          _hover={{
            textDecoration: "solid",
            color: "header.linkHover",
          }}
          textTransform={"uppercase"}
        >
          {navItem.label}
        </Link>
      ))}
    </Stack>
  );
};

const NAV_ITEMS = (t: any) => {
  return [
    {
      label: t("whatWeDo"),
      href: "#",
    },
    {
      label: t("whoWeAre"),
      href: "https://institutoaurora.org/quem-somos/",
    },
    {
      label: t("join"),
      href: "https://institutoaurora.org/faca-parte/",
    },
    {
      label: t("transparency"),
      href: "https://institutoaurora.org/transparencia/",
    },
    {
      label: t("blog"),
      href: "https://institutoaurora.org/blog/",
    },
  ];
};

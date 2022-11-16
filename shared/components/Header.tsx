import { Box, Flex, Link, Stack } from "@chakra-ui/react";
import NextImage from "next/image";
import { useTranslation } from "next-i18next";
import { IS_IN_MAINTENANCE } from "../utils/constants";
import React from "react";

import logo from "/public/imgs/logo-instituto-aurora.png";

type translation = (param: string) => string;

export default function Header() {
  const { t } = useTranslation("header");

  if (IS_IN_MAINTENANCE) {
    return null;
  }

  return (
    // <Box position={"fixed"} width={"100%"} zIndex={1000} fontFamily={"heading"}>
      <Flex
        bg={"header.background"}
        minH={"124px"}
        w={"100%"}
        // py={{ base: 2 }}
        // px={{ base: 4 }}
        borderStyle={"solid"}
        align={"center"}
        justify={"center"}
      >
        <Flex 
          w={"1080px"} 
          align={"center"}
          justify={"space-between"}
        >
        
          <Logo t={t} />
          {/* <Flex justify={"center"}> */}
            <DesktopNav t={t} />
          {/* </Flex> */}
        </Flex>

      </Flex>

  );
}

const DesktopNav = ({ t }: { t: translation }) => {
  return (
    <Stack direction={"row"} spacing={5}>
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

const Logo = ({ t }: { t: translation }) => {
  return <ChakraNextImage w={168} src={logo} alt={t("title")} />;
};

const ChakraNextImage = (props: any) => {
  const { src, alt, ...rest } = props;
  return (
    <Box position="relative" {...rest}>
      <NextImage 
        objectFit="cover" 
        src={src} 
        alt={alt} 
      />
    </Box>
  );
};

const NAV_ITEMS = (t: translation): Array<{ label: string; href: string; }> => {
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

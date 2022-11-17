import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Icon,
  IconButton,
  Link,
  Spacer,
  Slide,
  Stack,
  HStack,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { useTranslation } from "next-i18next";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { IS_IN_MAINTENANCE } from "../utils/constants";
import React from "react";

import logo from "/public/imgs/logo-instituto-aurora.png";
import { css } from "@emotion/react";

type translation = (param: string) => string;

export default function Header() {
  const { t } = useTranslation("header");

  if (IS_IN_MAINTENANCE) {
    return null;
  }

  return (
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
      <HStack w={"1080px"} align={"center"} spacing={20}>
        <Logo t={t} />
        <DesktopNav t={t} />
        <DonateButton t={t} />
      </HStack>
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
      <NextImage objectFit="cover" src={src} alt={alt} />
    </Box>
  );
};

const DonateButton = ({ t }: { t: translation }) => {
  return (
    <Link
          key={"button"}
          href={"https://app.doare.org/br/doacao/229743/instituto-aurora/por-um-mundo-onde-nenhuma-vida-vale-menos-do-que-outra"}
          isExternal
          _hover={{
            textDecoration: "solid"}}>
    <ButtonGroup size="sm" isAttached variant="outline">
      <Button
        display={{ base: "none", md: "inline-flex" }}
        maxW={"75px"}
        fontSize={"sm"}
        fontWeight={700}
        color={"white"}
        bg={"header.button"}
        borderRadius={0}
        textTransform={"uppercase"}
        rightIcon={
          <Icon
            className="icon"
            as={ChevronRightIcon}
            display={"none"}
            _groupHover={{ display: "inline" }}
          />
        }
        _groupHover={{ bg: "header.button" }}
      >
        {t("donateButton")}
      </Button>
    </ButtonGroup>
    </Link>
  );
};

const NAV_ITEMS = (t: translation): Array<{ label: string; href: string }> => {
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

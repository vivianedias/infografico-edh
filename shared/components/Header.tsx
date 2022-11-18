import NextImage from "next/image";
import { useTranslation } from "next-i18next";

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Icon,
  IconButton,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Slide,
  Stack,
  Text,
  HStack,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

import { IS_IN_MAINTENANCE } from "../utils/constants";
import DonateButton from "./Header/DonateButton";
import Logo from "./Header/Logo";
import DesktopNav from "./Header/DesktopNav";


type translation = (param: string) => string;

export default function Header() {
  const { t } = useTranslation("header");

  if (IS_IN_MAINTENANCE) {
    return null;
  }

  return (
    <Flex
      bg={"header.menu.background"}
      minH={"124px"}
      w={"100%"}
      align={"center"}
      justify={"center"}
    >
      <HStack w={"1080px"} align={"center"} spacing={20}>
        <Logo t={t} />
        <DesktopNav t={t} NAV_ITEMS={NAV_ITEMS} />
        <DonateButton t={t} />
      </HStack>
    </Flex>
  );
}


const NAV_ITEMS = (
  t: translation
): Array<{
  label: string;
  href: string;
  children?: Array<{ label: string; href: string }>;
}> => {
  return [
    {
      label: t("whatWeDo"),
      href: "#",
      children: [
        {
          label: t("education"),
          href: "https://institutoaurora.org/ods-04/",
        },
        {
          label: t("genderEquality"),
          href: "https://institutoaurora.org/ods-05/",
        },
        {
          label: t("inequalities"),
          href: "https://institutoaurora.org/ods-10/",
        },
        {
          label: t("culture"),
          href: "https://institutoaurora.org/ods-16/",
        },
      ],
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

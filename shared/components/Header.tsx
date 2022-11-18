import { useTranslation } from "next-i18next";

import { Flex, HStack, useDisclosure, VStack } from "@chakra-ui/react";

import { IS_IN_MAINTENANCE } from "../utils/constants";
import DonateButton from "./Header/DonateButton";
import Logo from "./Header/Logo";
import DesktopNav from "./Header/DesktopNav";
import MobileIcon from "./Header/MobileIcon";

type translation = (param: string) => string;

export default function Header() {
  const { t } = useTranslation("header");
  const { isOpen, onToggle } = useDisclosure();

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
        <VStack align={"end"}>
          <MobileIcon t={t} onToggle={onToggle} />
          <DonateButton t={t} />
        </VStack>
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

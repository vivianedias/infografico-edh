import {
  Divider,
  Flex,
  HStack,
  Link,
  Text,
  Stack,
  VStack,
  Icon,
  Square,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { IS_IN_MAINTENANCE } from "../utils/constants";
import FacebookIcon from "./Icons/FacebookIcon";
import InstagramIcon from "./Icons/InstagramIcon";
import YoutubeIcon from "./Icons/YoutubeIcon";

import Logo from "./Logo";

export default function Footer() {
  const { t } = useTranslation("footer");

  if (IS_IN_MAINTENANCE) {
    return null;
  }

  return (
    <Flex
      width={"100%"}
      bg={"black"}
      paddingTop={20}
      paddingBottom={20}
      as={"footer"}
      align={"center"}
      justify={"center"}
    >
      <VStack
        spacing={7}
        align={"flex-start"}
        w={{ base: "100%", lg: "6xl" }}
        mx={10}
      >
        <HStack
          w={"100%"}
          h={"100%"}
          align={{ base: "space-between", md: "flex-start" }}
          justify={{ base: "space-between", md: "space-between" }}
          flexWrap={"wrap"}
          spacing={12}
        >
          <Flex
            w={"100%"}
            flexWrap={"wrap"}
            gap={8}
            align={"space-between"}
            justify={"space-between"}
          >
            <Logo t={t} w={{ base: "80%", sm: "45%", md: "20%" }} />
            <FooterColumn FOOTER_ITEMS={FIRST_SESSION_ITEMS(t)} />
            <FooterColumn FOOTER_ITEMS={SECOND_SESSION_ITEMS(t)} />
            <FooterColumn FOOTER_ITEMS={THIRD_SESSION_ITEMS(t)} />
          </Flex>
        </HStack>
        <Divider borderColor={"header.menu.hover"} />
        <Flex flexWrap={"wrap"} gap={8} w={"100%"} justify={"space-between"}>
          <FooterText t={t} />
          <HStack>
            <SocialMediaIcon
              bgColor={"blue.600"}
              href={"https://facebook.com/aurora.direitoshumanos/"}
              SVGIcon={FacebookIcon}
            />
            <SocialMediaIcon
              bgColor={"pink.500"}
              href={"https://www.instagram.com/institutoaurora/"}
              SVGIcon={InstagramIcon}
            />
            <SocialMediaIcon
              bgColor={"red.600"}
              href={"https://www.youtube.com/channel/UCJMevU2-5jU9p7wVc0gb1TQ"}
              SVGIcon={YoutubeIcon}
            />
          </HStack>
        </Flex>
      </VStack>
    </Flex>
  );
}

const FooterColumn = ({ FOOTER_ITEMS }: { FOOTER_ITEMS: FooterItensType }) => {
  return (
    <Stack spacing={0.5} w={{ base: "80%", sm: "45%", md: "20%" }}>
      {FOOTER_ITEMS.map((navItem, i) => (
        <Link
          key={`${navItem.label}-${i}`}
          color={"header.menu.link"}
          href={navItem.href}
          isExternal
          fontSize={"16px"}
          fontWeight={500}
          _hover={{
            textDecoration: "none",
            color: "header.menu.hover",
          }}
          textAlign={"start"}
        >
          {navItem.label}
        </Link>
      ))}
    </Stack>
  );
};

const FooterText = ({ t }: { t: TranslationType }) => {
  return (
    <VStack align={"start"} spacing={0.5}>
      <Text color={"header.menu.link"} fontWeight={500}>
        {t("association")}
      </Text>
      <Text color={"header.menu.link"} fontWeight={700}>
        {t("cnpj")}
      </Text>
    </VStack>
  );
};

const SocialMediaIcon = ({
  bgColor,
  href,
  SVGIcon,
}: {
  bgColor: string;
  href: string;
  SVGIcon: () => JSX.Element;
}) => {
  return (
    <Link isExternal href={href}>
      <Square bgColor={bgColor} size={"32px"}>
        <Icon as={SVGIcon} />
      </Square>
    </Link>
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

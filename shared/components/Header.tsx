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
  Stack,
  Text,
  HStack,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { useTranslation } from "next-i18next";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
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
    <Box position={"fixed"} width={"100%"} zIndex={1000} fontFamily={"heading"}>
      <Flex
        bg={"header.menuBackground"}
        minH={{ base: "190px", md: "124px" }}
        w={"100%"}
        borderStyle={"solid"}
        align={"center"}
        justify={"center"}
      >
        <HStack
          w={{ base: "550px", md: "1080px" }}
          align={{ base: "flex-start", md: "center" }}
          justify={{ base: "space-between", md: "center" }}
          spacing={20}
          paddingRight={{ base: "15px", md: "0" }}
        >
          <Logo t={t} />
          <DesktopNav t={t} />
          <VStack 
          align={"end"}
            >
            <MobileIcon t={t} />
            <DonateButton t={t} />
          </VStack>
        </HStack>
      </Flex>
    </Box>
  );
}

const Logo = ({ t }: { t: translation }) => {
  const ChakraNextImage = (props: any) => {
    const { src, alt, ...rest } = props;
    return (
      <Box position="relative" {...rest}>
        <NextImage objectFit="cover" src={src} alt={alt} />
      </Box>
    );
  };
  return (
    <ChakraNextImage
      w={{ base: "300px", md: 168 }}
      src={logo}
      alt={t("title")}
    />
  );
};

const DesktopNav = ({ t }: { t: translation }) => {
  const DesktopSubNav = ({ label, href, subLabel }: any) => {
    return (
      <Link
        href={href}
        role={"group"}
        display={"block"}
        p={2}
        _hover={{
          textDecoration: "solid",
          bg: "header.subMenuLinkHoverBackground",
        }}
      >
        <Stack direction={"row"} align={"center"}>
          <Box>
            <Text
              fontSize={"14px"}
              color={"header.subMenuLink"}
              fontWeight={700}
              textTransform={"uppercase"}
              transition={"all .3s ease"}
              _groupHover={{
                color: "header.subMenuLinkHover",
              }}
            >
              {label}
            </Text>
          </Box>
        </Stack>
      </Link>
    );
  };

  return (
    <Stack direction={"row"} spacing={5} display={{ base: "none", md: "flex" }}>
      {NAV_ITEMS(t).map((navItem, i) => {
        console.log({ navItem });
        return (
          <Box key={`${navItem.label}-${i}`}>
            <Popover trigger={"hover"} placement={"bottom-start"}>
              <PopoverTrigger>
                <Link
                  href={navItem.href}
                  isExternal={navItem.href != "#"}
                  fontSize={"sm"}
                  fontWeight={700}
                  color={"header.menuLink"}
                  _hover={{
                    textDecoration: "solid",
                    color: "header.menuLinkHover",
                  }}
                  textTransform={"uppercase"}
                >
                  <Flex alignItems={"center"}>
                    {navItem.label}
                    <Icon
                      as={ChevronDownIcon}
                      w={5}
                      display={navItem.href == "#" ? "inline" : "none"}
                    />
                  </Flex>
                </Link>
              </PopoverTrigger>
              {navItem.children && (
                <PopoverContent
                  borderTopWidth={"3px"}
                  borderColor={"header.subMenuBorder"}
                  bg={"header.subMenuBackground"}
                  p={6}
                  rounded={0}
                  maxW={"240px"}
                >
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        );
      })}
    </Stack>
  );
};

const MobileIcon = ({ t }: { t: translation }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <IconButton
    onClick={onToggle}
      icon={<Icon as={Bars3Icon} boxSize={"1.5em"} color={"header.button"} />}
      variant={"ghost"}
      aria-label={t("navigation")}
      colorScheme={"header.menuBackground"}
    />
  );
};

const DonateButton = ({ t }: { t: translation }) => {
  return (
    <Link
      key={"button"}
      href={
        "https://app.doare.org/br/doacao/229743/instituto-aurora/por-um-mundo-onde-nenhuma-vida-vale-menos-do-que-outra"
      }
      isExternal
      _hover={{
        textDecoration: "solid",
      }}
    >
      <ButtonGroup size="sm" isAttached variant="outline">
        <Button
          // display={{ base: "inline-flex", md: "inline-flex" }}
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

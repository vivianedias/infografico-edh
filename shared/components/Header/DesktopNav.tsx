import {
  Box,
  Icon,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const DesktopNav = ({ NAV_ITEMS, t }: DesktopNavType) => {
  return (
    <Stack direction={"row"} spacing={5}>
      {NAV_ITEMS(t).map((navItem, i) => {
        return (
          <Box key={`${navItem.label}-${i}`}>
            <NavItem navItem={navItem} />
          </Box>
        );
      })}
    </Stack>
  );
};

const NavItem = ({ navItem }: any) => {
  return (
    <Popover trigger={"hover"} placement={"bottom-start"}>
      <MenuLinkDropDownTrigger href={navItem.href} label={navItem.label} />
      {navItem.children && (
        <DropDownContent navItemChildren={navItem.children} />
      )}
    </Popover>
  );
};

const MenuLinkDropDownTrigger = ({
  label,
  href,
}: MenuLinkDropDownTriggerType) => {
  return (
    <PopoverTrigger>
      <Link
        href={href}
        isExternal={href != "#"}
        fontSize={"sm"}
        fontWeight={700}
        color={"header.menu.link"}
        _hover={{
          textDecoration: "solid",
          color: "header.menu.hover",
        }}
        textTransform={"uppercase"}
      >
        {label}
        <DownArrowIcon href={href} />
      </Link>
    </PopoverTrigger>
  );
};

const DropDownContent = ({ navItemChildren }: DropDownContentType) => {
  return (
    <PopoverContent
      borderTopWidth={"3px"}
      borderTopColor={"header.subMenu.border"}
      bg={"header.subMenu.background"}
      p={6}
      rounded={0}
      maxW={"240px"}
    >
      <Stack>
        {navItemChildren.map((child: any) => (
          <SubNavItem key={child.label} {...child} />
        ))}
      </Stack>
    </PopoverContent>
  );
};

const SubNavItem = ({ label, href }: SubNavItemType) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      _hover={{
        textDecoration: "solid",
        bg: "header.subMenu.hoverBackground",
      }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            fontSize={"sm"}
            color={"header.subMenu.link"}
            fontWeight={700}
            textTransform={"uppercase"}
            transition={"all .3s ease"}
            _groupHover={{
              color: "header.subMenu.hover",
            }}
          >
            {label}
          </Text>
        </Box>
      </Stack>
    </Link>
  );
};

const DownArrowIcon = ({ href }: DownArrowIconType) => {
  return (
    <Icon
      as={ChevronDownIcon}
      w={5}
      display={href == "#" ? "inline" : "none"}
    />
  );
};

type TranslationType = (param: string) => string;

type DesktopNavType = {
  NAV_ITEMS: (t: TranslationType) => Array<{
    label: string;
    href: string;
    children?: Array<{ label: string; href: string }>;
  }>;
  t: TranslationType;
};

type NavItemType = {
  label: string;
  href: string;
  children?: Array<{ label: string; href: string }>;
};

type MenuLinkDropDownTriggerType = {
  label: string;
  href: string;
};

type DropDownContentType = {
  navItemChildren: Array<{ label: string; href: string }>;
};

type SubNavItemType = {
  label: string;
  href: string;
};

type DownArrowIconType = {
  href: string;
};

export default DesktopNav;

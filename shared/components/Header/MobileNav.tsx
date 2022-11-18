import {
  Collapse,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const MobileNav = ({ NAV_ITEMS, t }: MobileNavType) => {
  return (
    <Stack
      bg={"white"}
      p={4}
      display={{ md: "none" }}
      borderTopWidth={"5px"}
      borderTopColor={"header.subMenu.border"}
    >
      {NAV_ITEMS(t).map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, href, children }: any) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        isExternal={href != "#"}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={"header.subMenu.link"}
          textTransform={"uppercase"}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
            color={"black"}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          align={"start"}
        >
          {children &&
            children.map((child: any) => (
              <Link
                key={child.label}
                isExternal
                py={2}
                href={child.href}
                color={"header.subMenu.link"}
                textTransform={"uppercase"}
                fontWeight={500}
              >
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

type TranslationType = (param: string) => string;

type MobileNavType = {
  NAV_ITEMS: (t: TranslationType) => Array<{
    label: string;
    href: string;
    children?: Array<{ label: string; href: string }>;
  }>;
  t: TranslationType;
};

export default MobileNav;

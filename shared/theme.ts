import { type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const font = `'Montserrat', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`

const theme: Record<string, any> = {
  fonts: {
    heading: font,
    body: font,
  },
  config,
  colors: {
    brand: {
      primary: "rgba(98, 66, 110, 1)",
      pink: "rgba(171, 57, 124, 1)",
      light: "rgba(244, 240, 239, 1)"
    },
    header: {
      menuBackground: "#000000",
      menuLink: "#FFFFFF",
      menuLinkHover: "#878787",
      subMenuBackground: "#FFFFFF",
      subMenuLink: "#4B4B4B",
      subMenuLinkHover: "#878787",
      subMenuLinkHoverBackground: "#FAFAFA",
      subMenuBorder: "#FBBC44",
      button: "#FBBC44"
    }
  }
};

export default theme;

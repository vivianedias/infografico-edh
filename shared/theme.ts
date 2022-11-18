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
      menu: {
        background: "#000000",
        link: "#FFFFFF",
        hover: "#878787",
      },
      subMenu: {
        background: "#FFFFFF",
        link: "#4B4B4B",
        hover: "#878787",
        hoverBackground: "#FAFAFA",
        border: "#FBBC44",
      },
      button: "#FBBC44"
    }
  }
};

export default theme;

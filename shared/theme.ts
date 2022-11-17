import { type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const font = `'Montserrat', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`

const theme = {
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
    }
  }
};

export default theme;

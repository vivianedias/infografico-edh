import { type ThemeConfig } from "@chakra-ui/react";
import Modal from "./ModalCustomTheme";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const font = `'Montserrat', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`;

const theme = {
  fonts: {
    heading: font,
    body: font,
  },
  config,
  components: {
    Modal,
  },
  colors: {
    brand: {
      primary: "rgba(98, 66, 110, 1)",
      pink: "rgba(171, 57, 124, 1)",
      light: "rgba(244, 240, 239, 1)",
      gradient: {
        high: {
          primary: "rgba(236, 104, 58, 1)",
          secondary: "#f6a589",
          text: "white",
        },
        medium: {
          primary: "rgba(98, 66, 110, 1)",
          secondary: "#9970a8",
          text: "white",
        },
        low: {
          primary: "rgba(171, 57, 124, 1)",
          secondary: "#d378ae",
          text: "white",
        },
        none: {
          primary: "rgba(188, 154, 200, 1)",
          secondary: "#e0cce7",
          text: "rgba(98, 66, 110, 1)",
        },
        no_info: {
          primary: "rgba(239, 198, 223, 1)",
          secondary: "#fde9f6",
          text: "rgba(98, 66, 110, 1)",
        },
      },
    },
  },
};

export default theme;

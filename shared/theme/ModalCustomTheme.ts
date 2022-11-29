import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle((props) => {
  const { colorScheme: c } = props;

  return {
    header: {
      textAlign: "center",
      bgColor: `brand.gradient.${c}.primary`,
      color: `brand.gradient.${c}.text`,
    },
    body: {
      bgColor: "white",
      color: "brand.primary",
      maxH: "3xl",
      overflowX: "hidden",
    },
    dialog: {
      w: "xl",
      borderRadius: "lg",
      border: `1px solid`,
      borderColor: `brand.gradient.${c}.primary`,
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
    closeButton: {
      color: `brand.gradient.${c}.text`,
      border: `2px solid`,
      borderColor: `brand.gradient.${c}.text`,
      borderRadius: "full",
      p: 2.5,
    },
    footer: {
      justifyContent: "center",
      py: 2,
    },
  };
});

const xl = defineStyle({
  py: 5,
  fontSize: "3xl",
  lineHeight: "150%",
  fontWeight: 500,
});

const md = defineStyle({
  fontSize: "sm",
  py: 10,
  px: 8,
  fontWeight: 400,
  lineHeight: "none",
});

const sizes = {
  lg: definePartsStyle({ header: xl, body: md }),
};

const modalTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: "lg",
  },
});

export default modalTheme;

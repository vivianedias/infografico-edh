import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const baseStyle = defineStyle({
  fontWeight: 500, // change the font weight to normal
  lineHeight: 8,
  _hover: {
    opacity: 0.8,
  },
  alignItems: "center",
  display: "flex",
});

const sizes = {
  md: defineStyle({
    fontSize: "xl",
    minH: 16,
    minW: 32,
    margin: "0 !important",
  }),
};

// Defining a custom variant
const customVariant = defineStyle((props) => {
  const { colorScheme: c } = props;
  const btnColors: Record<string, Record<string, string>> = {
    selected: {
      bgColor: "brand.primary",
      color: "brand.light",
    },
    disabled: {
      bgColor: "brand.light",
      color: "brand.primary",
    },
  };

  return btnColors[c];
});

const buttonTheme = defineStyleConfig({
  baseStyle,
  sizes,
  variants: {
    custom: customVariant,
  },
  defaultProps: {
    size: "md",
  },
});

export default buttonTheme;

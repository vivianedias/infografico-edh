import customTheme from "../../theme";
import { StylesConfig } from "react-select";
import defaultStyles from "./singleSelectStyles";

type Option = {
  value: string;
  label: string;
};

const primaryColor = customTheme.colors.brand.primary;
const textColor = customTheme.colors.brand.light;
const styles: StylesConfig<Option> = {
  ...defaultStyles,
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: primaryColor,
    color: primaryColor,
    borderRadius: "10px",
    minWidth: "24rem",
  }),
  multiValue: (styles, { data }) => ({
    ...styles,
    backgroundColor: primaryColor,
    fontWeight: 500,
    borderRadius: "5px",
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: textColor,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: textColor,
    ":hover": {
      backgroundColor: textColor,
      color: primaryColor,
    },
  }),
};

export default styles;

import customTheme from "../../theme";
import { StylesConfig } from "react-select";

type Option = {
  value: string;
  label: string;
};

const primaryColor = customTheme.colors.brand.primary;
const textColor = customTheme.colors.brand.light;
const styles: StylesConfig<Option> = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: primaryColor,
    color: primaryColor,
    width: "250px",
    borderRadius: "10px",
  }),
  placeholder: (baseStyles, state) => ({
    ...baseStyles,
    color: primaryColor,
    opacity: 0.5,
  }),
  dropdownIndicator: (baseStyles, state) => ({
    ...baseStyles,
    color: primaryColor,
    transform: `rotate(${state.isFocused ? -180 : 0}deg)`,
  }),
  option: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: isFocused ? primaryColor : styles.backgroundColor,
    color: isFocused ? textColor : styles.color,
  }),
};

export default styles;

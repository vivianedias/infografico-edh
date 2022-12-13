import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import Select, { StylesConfig } from "react-select";
import { Heading, Text, Box, Stack, Flex } from "@chakra-ui/react";

import getDistinct from "../utils/getDistinct";
import customTheme from "../theme";
import { type StatesResponse } from "../types/airtable";
import ComparisonCard from "./ComparisonCard";

type Option = {
  value: string;
  label: string;
};

type PlaceholderCardProps = {
  tableData: StatesResponse[];
  optionsStates: Option[];
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

function PlaceholderCard({ tableData, optionsStates }: PlaceholderCardProps) {
  const { t } = useTranslation("home");
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [state, setState] = useState<StatesResponse | null>(null);

  function handleChange(e: any) {
    setSelectedState(e.value);
  }

  useEffect(() => {
    const findState = tableData.find((t) => t.estado__nome === selectedState);
    setState(findState || null);
  }, [selectedState]);

  return state ? (
    <ComparisonCard state={state} setState={setState} />
  ) : (
    <Flex
      w={"sm"}
      h={"lg"}
      bgColor={"brand.light"}
      border={"1px dashed"}
      borderColor={"brand.primary"}
      borderRadius={"md"}
      justify={"center"}
      p={12}
    >
      <Box>
        <Select
          options={optionsStates}
          placeholder={t("comparison.select.placeholder")}
          styles={styles}
          onChange={handleChange}
        />
      </Box>
    </Flex>
  );
}

export default function Comparison({
  tableData,
}: {
  tableData: StatesResponse[];
}) {
  const { t } = useTranslation("home");
  const states = getDistinct(tableData, "estado__nome");
  const optionsStates = states.map((s) => ({
    value: s,
    label: s,
  }));

  return (
    <Box pt={10}>
      <Heading size={"lg"} color={"brand.primary"} pb={4}>
        {t("comparison.title")}
      </Heading>
      <Text fontSize={"xl"} fontWeight={300} color={"brand.primary"} pb={8}>
        {t("comparison.subtitle")}
      </Text>
      <Stack spacing={16} direction={{ base: "column", xl: "row" }}>
        {[...Array(3).keys()].map((i) => (
          <PlaceholderCard
            key={`placeholder-card-${i}`}
            optionsStates={optionsStates}
            tableData={tableData}
          />
        ))}
      </Stack>
    </Box>
  );
}

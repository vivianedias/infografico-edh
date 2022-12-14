import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import Select from "react-select";
import { Heading, Text, Box, Stack, Flex } from "@chakra-ui/react";

import ComparisonCard from "../ComparisonCard";
import getDistinct from "../../utils/getDistinct";
import { STATE_SECRETARIES } from "../SecretaryContent";
import { type StatesResponse } from "../../types/airtable";
import singleSelectStyles from "./singleSelectStyles";
import multiSelectStyles from "./multiSelectStyles";

type Option = {
  value: string;
  label: string;
};

type ComparisonCardsProps = {
  tableData: StatesResponse[];
  optionsStates: Option[];
};

function ComparisonCards({ tableData, optionsStates }: ComparisonCardsProps) {
  const { t } = useTranslation("home");
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [state, setState] = useState<StatesResponse | null>(null);

  const handleChange = useCallback(
    (e: any) => {
      setSelectedState(e.value);
    },
    [setSelectedState]
  );

  useEffect(() => {
    const findState = tableData.find((t) => t.estado__nome === selectedState);
    setState(findState || null);
  }, [selectedState]);

  return state ? (
    <ComparisonCard state={state} setState={setState} />
  ) : (
    <Flex
      w={{ base: "full", xl: "30rem" }}
      h={"3xl"}
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
          styles={singleSelectStyles}
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
  const multiSelectInfo = STATE_SECRETARIES.map((s) => ({
    value: s,
    label: t(`popup.expanded.${s}`),
  }));

  return (
    <Flex align={"center"} direction={"column"}>
      <Box w={{ base: "full", xl: "6xl" }}>
        <Heading size={"lg"} color={"brand.primary"} pb={4}>
          {t("comparison.title")}
        </Heading>
        <Text fontSize={"xl"} fontWeight={300} color={"brand.primary"} pb={8}>
          {t("comparison.subtitle")}
        </Text>
      </Box>
      <Select options={multiSelectInfo} isMulti styles={multiSelectStyles} />
      <Stack spacing={5} direction={{ base: "column", xl: "row" }}>
        {[...Array(3).keys()].map((i) => (
          <ComparisonCards
            key={`placeholder-card-${i}`}
            optionsStates={optionsStates}
            tableData={tableData}
          />
        ))}
      </Stack>
    </Flex>
  );
}

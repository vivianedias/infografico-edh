import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import Select from "react-select";
import { Heading, Text, Box, Stack, Flex } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import ComparisonCard from "./Card";
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
};

function ComparisonCards({ tableData }: ComparisonCardsProps) {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [state, setState] = useState<StatesResponse | null>(null);
  const { t } = useTranslation("home");

  const states = getDistinct(tableData, "estado__nome");
  const optionsStates = states.map((s) => ({
    value: s,
    label: s,
  }));

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
    <ComparisonCard state={state} setSelectedState={setSelectedState} />
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

const dynamicStyle = (props: { secretaryList: string[] }) => {
  if (props.secretaryList.length < 1) return ``;

  const listOfClasses = props.secretaryList.map(
    (s) => `.secretary-content-lineitem-${s}`
  );
  return css`
    & ${listOfClasses.join(",")} {
      opacity: 0;
    }
  `;
};

const ControlSecrearyLineItem = styled.div<{ secretaryList: string[] }>`
  ${dynamicStyle}
`;

export default function Comparison({
  tableData,
}: {
  tableData: StatesResponse[];
}) {
  const { t } = useTranslation("home");
  const [secretaryList, setSecretaryInfoList] = useState<string[]>([]);
  const multiSelectInfo = STATE_SECRETARIES.map((s) => ({
    value: s,
    label: t(`popup.expanded.${s}`),
  }));
  const [selectValue, setSelectValue] = useState(multiSelectInfo);
  const all = {
    value: "all",
    label: t("comparison.selectAll") ?? "",
  };

  const handleChange = useCallback(
    (selected: any) => {
      const selectedAllOption = selected.find(
        (option: Option) => option.value === "all"
      );

      if (!selectedAllOption) {
        setSelectValue(selected);

        const selectedOptionsValue = selected.map((s: any) => s.value);
        const deselectedOptions = STATE_SECRETARIES.filter(
          (s) => !selectedOptionsValue.includes(s)
        );
        return setSecretaryInfoList(deselectedOptions);
      }

      setSelectValue(multiSelectInfo);
      return setSecretaryInfoList([]);
    },
    [multiSelectInfo]
  );

  return (
    <Flex align={"center"} direction={"column"}>
      <Box w={{ base: "full", xl: "6xl" }} mb={8}>
        <Heading size={"lg"} color={"brand.primary"} pb={4}>
          {t("comparison.title")}
        </Heading>
        <Text fontSize={"xl"} fontWeight={300} color={"brand.primary"} pb={8}>
          {t("comparison.subtitle")}
        </Text>
        <Select
          value={selectValue}
          options={[all, ...multiSelectInfo]}
          isMulti
          styles={multiSelectStyles}
          onChange={handleChange}
        />
      </Box>
      <ControlSecrearyLineItem secretaryList={secretaryList}>
        <Stack spacing={5} direction={{ base: "column", xl: "row" }}>
          {[...Array(3).keys()].map((i) => (
            <ComparisonCards
              key={`placeholder-card-${i}`}
              tableData={tableData}
            />
          ))}
        </Stack>
      </ControlSecrearyLineItem>
    </Flex>
  );
}

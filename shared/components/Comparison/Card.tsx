import { useCallback, useState } from "react";
import { useTranslation } from "next-i18next";
import { Box, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

import Pagination from "../Pagination";
import StateInfo from "../StateInfo";

import { StatesResponse } from "../../types/airtable";
import { INFO_ACCESS } from "../../utils/buildCaseFilters";

function ComparisonHeader({
  children,
  gradient,
  setState,
}: {
  gradient: string;
  children: React.ReactNode;
  setState: React.Dispatch<React.SetStateAction<StatesResponse | null>>;
}) {
  const { t } = useTranslation("home");

  const handleResetState = useCallback(() => {
    setState(null);
  }, [setState]);

  return (
    <Flex
      bgColor={`brand.gradient.${gradient}.primary`}
      px={4}
      w={"full"}
      h={12}
      align={"center"}
      justify={"center"}
      position={"relative"}
    >
      <Text fontSize={"xl"} color={"white"} fontWeight={700}>
        {children}
      </Text>
      <IconButton
        icon={<Icon as={XMarkIcon} boxSize={4} />}
        aria-label={t("comparison.unselectState")}
        variant={"unstyled"}
        borderRadius={"full"}
        border={"2px solid white"}
        size={"xs"}
        color={"white"}
        position={"absolute"}
        right={4}
        display={"inline-flex"}
        alignItems={"center"}
        onClick={handleResetState}
      />
    </Flex>
  );
}

export default function ComparisonCard({
  state,
  setState,
}: {
  state: StatesResponse;
  setState: React.Dispatch<React.SetStateAction<StatesResponse | null>>;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const degree = state.estado_basico__grau_institucionalizacao;
  const gradient = INFO_ACCESS[degree];

  return (
    <Box
      borderRadius={"lg"}
      border={"1px solid"}
      borderColor={"brand.primary"}
      w={{ base: "full", md: "30rem" }}
      h={"3xl"}
      overflow={"hidden"}
      position={"relative"}
    >
      <ComparisonHeader gradient={gradient} setState={setState}>
        {state.estado__nome}
      </ComparisonHeader>

      <Box py={5} px={2} overflowY={"scroll"} h={"2xl"}>
        <StateInfo
          gradient={gradient}
          stateInfo={state}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </Box>

      {state.orgaos && state.orgaos.length > 1 ? (
        <Flex
          bgColor={"white"}
          w={"full"}
          h={"2.5rem"}
          align={"center"}
          justify={"center"}
        >
          <Pagination
            page={activeIndex ? activeIndex + 1 : 1}
            setPage={setActiveIndex}
            gradient={gradient}
          />
        </Flex>
      ) : null}
    </Box>
  );
}

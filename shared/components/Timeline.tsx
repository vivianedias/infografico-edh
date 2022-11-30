import { useTranslation } from "next-i18next";
import {
  Box,
  Circle,
  Collapse,
  Flex,
  Heading,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

import aggregateMonthDescriptions from "../utils/aggregateMonthDescriptions";
import { type TimelineResponse } from "../types/airtable";
import { type MonthWithAggregatedDescription } from "../types/timeline";
import getDistinct from "../utils/getDistinct";

function YearBlock({
  months,
  year,
}: {
  year: number;
  months: TimelineResponse[];
}) {
  const monthDistinct = getDistinct(months, "acontecimento__mes");

  return (
    <Box
      position={"relative"}
      borderLeft={"3px solid"}
      borderColor={"brand.primary"}
      w={"full"}
    >
      <Circle
        size={5}
        borderColor={"brand.pink"}
        border={"3px solid"}
        bgColor={"white"}
        position={"absolute"}
        left={"-10px"}
        top={0}
        className={"circle"}
      />
      <VStack spacing={3.5}>
        {monthDistinct.map((month, i) => {
          return (
            <MonthlyBlock
              key={`monthly-block-${i}`}
              year={year}
              {...aggregateMonthDescriptions(months, month)}
            />
          );
        })}
      </VStack>
    </Box>
  );
}

function MonthlyBlock({
  year,
  acontecimento__mes: month,
  description,
}: {
  year: number;
} & MonthWithAggregatedDescription) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <VStack spacing={3.5} pl={8} w={"full"}>
      <Flex
        width={"full"}
        direction={"row"}
        fontSize={"xl"}
        justifyContent={"space-between"}
        borderBottom={"1px solid"}
        borderColor={"brand.primary"}
        pb={2.5}
        alignItems={"center"}
      >
        <HStack spacing={3.5}>
          <Text color={"brand.pink"} fontWeight={500}>
            {year}
          </Text>
          <Text color={"brand.primary"} fontWeight={300}>
            {month}
          </Text>
        </HStack>
        <IconButton
          variant={"link"}
          aria-label={"Expandir texto do mês"}
          icon={isOpen ? <MinusSmallIcon /> : <PlusSmallIcon />}
          color={"brand.primary"}
          size={"xs"}
          onClick={onToggle}
        />
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <VStack spacing={3.5}>
          {description.map((d, i) => (
            <Text
              color={"brand.primary"}
              lineHeight={"shorter"}
              letterSpacing={"tight"}
              fontSize={"sm"}
              fontWeight={400}
              key={`description-${i}`}
            >
              {d}
            </Text>
          ))}
        </VStack>
      </Collapse>
    </VStack>
  );
}

export default function Timeline({
  timeline,
  selectedPeriod,
}: {
  timeline: TimelineResponse[];
  selectedPeriod: string;
}) {
  const { t } = useTranslation("home");
  const filterSelectedYears = timeline.filter((t) => {
    const currentYear = t.acontecimento__ano;
    const [minPeriod, maxPeriod] = selectedPeriod.split("-");
    if (currentYear >= Number(minPeriod) && currentYear <= Number(maxPeriod)) {
      return true;
    }
    return false;
  });
  const yearsDistinct = getDistinct(filterSelectedYears, "acontecimento__ano");

  return (
    <VStack
      as="article"
      border={"1px solid"}
      color={"brand.pink"}
      boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
      borderRadius={"lg"}
      bgColor={"white"}
      p={{ base: 3, lg: 10 }}
      w={{ base: "100%", lg: "sm" }}
      h={"2xl"}
      overflowY={"hidden"}
      spacing={7}
      align={"flex-start"}
    >
      <Heading color={"brand.primary"} size={"lg"}>
        {t("timeline.title")}
      </Heading>
      <Box
        w={"full"}
        overflowY={"auto"}
        px={{ base: 2, lg: 2.5 }}
        css={css`
          & > :not(:first-of-type) {
            padding-top: var(--chakra-space-8);
            .circle {
              top: var(--chakra-space-8);
            }
          }

          & {
            scrollbar-gutter: stable;
            scrollbar-width: thin; /* "auto" or "thin" */
            scrollbar-color: var(--chakra-colors-brand-pink)
              var(--chakra-colors-white); /* scroll thumb and track */
          }

          &::-webkit-scrollbar {
            width: 0.5rem;
          }

          &::-webkit-scrollbar-track {
            background-color: var(--chakra-colors-white);
          }

          &::-webkit-scrollbar-thumb {
            background-color: var(--chakra-colors-brand-pink);
          }
        `}
      >
        {yearsDistinct.map((year, i) => {
          const months = timeline.filter((t) => t.acontecimento__ano === year);
          return (
            <YearBlock key={`year-block-${i}`} months={months} year={year} />
          );
        })}
      </Box>
    </VStack>
  );
}

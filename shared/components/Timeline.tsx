import {
  Box,
  Circle,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PlusSmallIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "next-i18next";

type YearBlockProps = {
  years: Record<
    string,
    Array<{
      month: string;
      description: string;
    }>
  >;
};

function YearBlock({ years }: YearBlockProps) {
  return (
    <>
      {Object.keys(years).map((year, i) => {
        return (
          <Box
            position={"relative"}
            borderLeft={"3px solid"}
            borderColor={"brand.primary"}
            key={`year-block-${i}`}
          >
            <Circle
              size={"20px"}
              borderColor={"brand.pink"}
              border={"3px solid"}
              bgColor={"white"}
              position={"absolute"}
              left={"-10px"}
              top={0}
            />
            <VStack spacing={3.5}>
              {years[year].map((month, i) => (
                <MonthlyBlock
                  key={`monthly-block-${i}`}
                  year={year}
                  {...month}
                />
              ))}
            </VStack>
          </Box>
        );
      })}
    </>
  );
}

function MonthlyBlock({
  year,
  month,
  description,
}: {
  year: string;
  month: string;
  description: string;
}) {
  return (
    <VStack spacing={3.5} pl={8}>
      <Flex
        width={"100%"}
        direction={"row"}
        fontSize={"2xl"}
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
          icon={<PlusSmallIcon />}
          color={"brand.primary"}
          size={"xs"}
        />
      </Flex>
      <Text
        color={"brand.primary"}
        lineHeight={"shorter"}
        letterSpacing={"tight"}
        fontSize={"sm"}
        fontWeight={400}
      >
        {description}
      </Text>
    </VStack>
  );
}

export default function Timeline() {
  const { t } = useTranslation("home");

  return (
    <VStack
      as="article"
      border={"1px solid"}
      color={"brand.pink"}
      boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
      borderRadius={"lg"}
      bgColor={"white"}
      p={10}
      w={"sm"}
      h={"2xl"}
      overflowY={"hidden"}
      spacing={7}
      align={"flex-start"}
    >
      <Heading color={"brand.primary"} size={"xl"}>
        {t("timeline.title")}
      </Heading>
      <Box>
        <YearBlock
          years={{
            "2019": [
              {
                month: "Jan",
                description: `
                  A Secretaria de Educação Continuada, Alfabetização, Diversidade e Inclusão - SECADI, intituída em 2004, é extinta. A pasta de EDH é desarticulada do MEC
    
                  MEC abandona o programa Pacto Universitário pela Promoção do Respeito à Diversidade, Cultura da Paz e Direitos Humanos, inciado em 2017 e que tinha a intenção de fortalecer a promoção dessas temáticas entre universidades. Na época, 326 universidades haviam aderido ao Pacto de acordo com dados do MEC.
                  `,
              },
              {
                month: "Mar",
                description: `
                  Sérgio Augusto de Queiroz assume a Secretaria Nacional de Proteção Global
                  `,
              },
            ],
          }}
        />
      </Box>
    </VStack>
  );
}

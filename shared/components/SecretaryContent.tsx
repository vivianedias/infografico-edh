import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import {
  HStack,
  VStack,
  Text,
  Divider,
  Box,
  Flex,
  Circle,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { css } from "@emotion/react";

import StatusIcon from "./StatusIcons";
import { OrgaosFields } from "../types/airtable";
import styles from "../../styles/SecretaryContent.module.css";

function renderEducationalPlansTags({
  gradient,
  tags,
}: {
  gradient: string;
  tags: string[];
}) {
  return (
    <Flex flexWrap={"wrap"} gap={2}>
      {tags.map((t, i) => (
        <Box
          key={`educational-plans-tags-${i}`}
          p={2.5}
          bgColor={`brand.gradient.${gradient}.primary`}
          color={`brand.gradient.${gradient}.text`}
          fontSize={"sm"}
          fontWeight={500}
          borderRadius={"base"}
        >
          {t}
        </Box>
      ))}
    </Flex>
  );
}

function renderSecretaryContentLineText({
  description,
  property,
  gradient,
}: {
  description: string | string[];
  property: string;
  gradient: string;
}) {
  switch (property) {
    case "orgao__temas_principais":
      return renderEducationalPlansTags({
        gradient,
        tags: description as string[],
      });
    case "orgao__edh_plano_educacao":
      return (
        <Circle size={5} bgColor={`brand.gradient.${gradient}.primary`}>
          <StatusIcon
            status={description as string}
            gradient={gradient}
            category={"plano de educação"}
          />
        </Circle>
      );
    default:
      return <Text>{description}</Text>;
  }
}

function SecretaryContentLineItem({
  title,
  description,
  property,
  gradient,
}: {
  title: string;
  description: any;
  property: string;
  gradient: string;
}) {
  return (
    <>
      <GridItem>
        <Text textAlign={"right"} lineHeight={"none"} fontWeight={700}>
          {title}:
        </Text>
      </GridItem>
      <Box height={"100%"} position={"absolute"} left={"125px"}>
        <Divider
          border={"1px solid"}
          borderColor={"brand.primary"}
          orientation={"vertical"}
          alignItems={"stretch"}
        />
      </Box>
      <GridItem
        opacity={1}
        transition={"opacity 0.5s"}
        className={`secretary-content-lineitem-${property}`}
      >
        {renderSecretaryContentLineText({
          description,
          property,
          gradient,
        })}
      </GridItem>
    </>
  );
}

type SecretaryContentItemProps = {
  stateSecretary: Omit<
    OrgaosFields,
    "estado__sigla" | "createdAt" | "id" | "periodo"
  >;
  gradient: string;
};

export const STATE_SECRETARIES = [
  "orgao__nome",
  "orgao__orcamento",
  "orgao__conceito_edh",
  "orgao__temas_principais",
  "orgao__atividades_principais",
  "orgao__edh_plano_educacao",
  "orgao__equipe_edh",
];

function SecretaryContentItem({
  stateSecretary,
  gradient,
}: SecretaryContentItemProps) {
  const { t } = useTranslation("home");
  const sortedStateSecretary = Object.keys(stateSecretary).sort(
    (a, b) => STATE_SECRETARIES.indexOf(a) - STATE_SECRETARIES.indexOf(b)
  );
  return (
    <Grid
      position={"relative"}
      gridTemplateColumns={"100px 13.5rem"}
      gridTemplateRows={"1fr"}
      columnGap={5}
      rowGap={5}
      bgColor={"brand.light"}
      borderRadius={"2xl"}
      py={6}
      px={4}
      minW={"90%"}
      w={"md"}
      overflow={"hidden"}
    >
      {sortedStateSecretary.map((secretaryKey, i) => {
        const key = secretaryKey as keyof typeof stateSecretary;
        return (
          <SecretaryContentLineItem
            key={`secretary-content-item-${i}`}
            title={t(`popup.expanded.${secretaryKey}`)}
            description={stateSecretary[key]}
            property={key}
            gradient={gradient}
          />
        );
      })}
    </Grid>
  );
}

export default function SecretaryContent({
  stateSecretaries,
  activeIndex,
  gradient,
  setActiveIndex,
}: {
  stateSecretaries: OrgaosFields[];
  activeIndex: number | null;
  gradient: string;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  useEffect(() => {
    return () => {
      setActiveIndex(null);
    };
  }, []);

  return (
    <HStack
      w={"full"}
      align={"flex-start"}
      css={
        !activeIndex &&
        stateSecretaries.length > 1 &&
        css`
          position: relative;
          left: 10px;
        `
      }
      className={`${activeIndex === 0 && styles["slide-in"]} ${
        activeIndex === 1 && styles["slide-out"]
      }`}
    >
      {stateSecretaries.map((stateSecretary, i) => {
        const { estado__sigla, createdAt, id, periodo, ...rest } =
          stateSecretary;
        return (
          <SecretaryContentItem
            stateSecretary={rest}
            key={`secretary-${i}`}
            gradient={gradient}
          />
        );
      })}
    </HStack>
  );
}

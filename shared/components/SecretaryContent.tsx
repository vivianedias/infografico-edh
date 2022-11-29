import { HStack, VStack, Text, Divider, Box } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { OrgaosFields } from "../types/airtable";
import styles from "../../styles/SecretaryContent.module.css";
import { css } from "@emotion/react";

function SecretaryContentLineItem({
  title,
  description,
}: {
  title: string;
  description: any;
}) {
  return (
    <HStack
      direction={"column"}
      spacing={7}
      align={"flex-start"}
      mt={"0 !important"}
      position={"relative"}
      w={"100%"}
      pb={7}
    >
      <Text
        textAlign={"right"}
        lineHeight={"none"}
        fontWeight={700}
        flex={0.5}
        textTransform={"capitalize"}
      >
        {title}:
      </Text>
      <Box height={"100%"} position={"absolute"} right={"73%"}>
        <Divider
          border={"1px solid"}
          borderColor={"brand.primary"}
          orientation={"vertical"}
          alignItems={"stretch"}
        />
      </Box>
      <Text flex={1.5}>{description}</Text>
    </HStack>
  );
}

type SecretaryContentItemProps = {
  stateSecretary: Omit<OrgaosFields, "orgao__estado" | "createdAt" | "id">;
  onClick: () => void;
};

function SecretaryContentItem({
  stateSecretary,
  onClick,
}: SecretaryContentItemProps) {
  const { t } = useTranslation("home");

  return (
    <VStack
      bgColor={"brand.light"}
      borderRadius={"2xl"}
      py={6}
      px={4}
      minW={"90%"}
      onClick={onClick}
    >
      {Object.keys(stateSecretary).map((secretaryKey, i) => {
        const key = secretaryKey as keyof typeof stateSecretary;
        return (
          <SecretaryContentLineItem
            key={`secretary-content-item-${i}`}
            title={t(`popup.expanded.${secretaryKey}`)}
            description={stateSecretary[key]}
          />
        );
      })}
    </VStack>
  );
}

export default function SecretaryContent({
  stateSecretaries,
}: {
  stateSecretaries: OrgaosFields[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <HStack
      w={"md"}
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
        const { orgao__estado, createdAt, id, ...rest } = stateSecretary;
        return (
          <SecretaryContentItem
            onClick={() => setActiveIndex(i)}
            stateSecretary={rest}
            key={`secretary-${i}`}
          />
        );
      })}
    </HStack>
  );
}

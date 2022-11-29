import { HStack, VStack, Text, Divider, Box } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { OrgaosFields } from "../types/airtable";

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
        flex={1}
        textTransform={"capitalize"}
      >
        {title}:
      </Text>
      <Box height={"100%"} position={"absolute"} right={"50%"}>
        <Divider
          border={"1px solid"}
          borderColor={"brand.primary"}
          orientation={"vertical"}
          alignItems={"stretch"}
        />
      </Box>
      <Text flex={1}>{description}</Text>
    </HStack>
  );
}

type SecretaryContentItemProps = {
  stateSecretary: Omit<OrgaosFields, "orgao__estado" | "createdAt" | "id">;
};

function SecretaryContentItem({ stateSecretary }: SecretaryContentItemProps) {
  const { t } = useTranslation("home");

  return (
    <VStack bgColor={"brand.light"} borderRadius={"2xl"} p={7}>
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
  return (
    <HStack>
      {stateSecretaries.map((stateSecretary, i) => {
        const { orgao__estado, createdAt, id, ...rest } = stateSecretary;
        return (
          <SecretaryContentItem stateSecretary={rest} key={`secretary-${i}`} />
        );
      })}
    </HStack>
  );
}

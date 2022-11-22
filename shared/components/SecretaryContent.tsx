import { HStack, VStack, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

function SecretaryContentItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <HStack direction={"column"} spacing={7} align={"flex-start"}>
      <Text
        textAlign={"right"}
        lineHeight={"base"}
        fontWeight={500}
        fontSize={"lg"}
        flex={0.5}
        textTransform={"capitalize"}
      >
        {title}:
      </Text>
      <Text flex={1}>{description}</Text>
    </HStack>
  );
}

type SecretariesReturn = {
  title: string;
  description: string;
};

const SECRETARIES = (t: (param: string) => string): SecretariesReturn[] => [
  {
    title: t("popup.expanded.governmentBodies"),
    description: "",
  },
  {
    title: t("popup.expanded.budget"),
    description: "",
  },
  {
    title: t("popup.expanded.concept"),
    description: "",
  },
  {
    title: t("popup.expanded.mainTopics"),
    description: "",
  },
  {
    title: t("popup.expanded.policies"),
    description: "",
  },
  {
    title: t("popup.expanded.plans"),
    description: "",
  },
  {
    title: t("popup.expanded.teamSize"),
    description: "",
  },
];

export default function SecretaryContent() {
  const { t } = useTranslation("home");

  return (
    <VStack spacing={5}>
      {SECRETARIES(t).map((props, i) => (
        <SecretaryContentItem
          {...props}
          key={`secretary-content-item-${i}`}
          description={`Coordenadoria de Direitos Humanos da Secretaria de Estado da Mulher, Inclusão, Assistência Social, do Trabalho e dos Direitos Humanos. Serviço de Projetos Escolares em Direitos Humanos da Secretaria de Estado da Educação.`}
        />
      ))}
    </VStack>
  );
}

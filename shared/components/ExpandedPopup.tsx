import {
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Text,
} from "@chakra-ui/react";
import { Response } from "../types/airtable";
import {
  BriefcaseIcon,
  UsersIcon,
  DocumentTextIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import IconWithEmoji from "./IconWithEmoji";
import { useTranslation } from "next-i18next";
import { INFO_ACCESS } from "../utils/buildCaseFilters";

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
function SecretaryContent({}) {
  const { t } = useTranslation("home");

  return (
    <VStack spacing={5}>
      <SecretaryContentItem
        title={t("popup.expanded.governmentBodies")}
        description={`Coordenadoria de Direitos Humanos da Secretaria de Estado da Mulher, Inclusão, Assistência Social, do Trabalho e dos Direitos Humanos. Serviço de Projetos Escolares em Direitos Humanos da Secretaria de Estado da Educação.`}
      />
      <SecretaryContentItem
        title={t("popup.expanded.budget")}
        description={`Coordenadoria de Direitos Humanos da Secretaria de Estado da Mulher, Inclusão, Assistência Social, do Trabalho e dos Direitos Humanos. Serviço de Projetos Escolares em Direitos Humanos da Secretaria de Estado da Educação.`}
      />
      <SecretaryContentItem
        title={t("popup.expanded.concept")}
        description={`Coordenadoria de Direitos Humanos da Secretaria de Estado da Mulher, Inclusão, Assistência Social, do Trabalho e dos Direitos Humanos. Serviço de Projetos Escolares em Direitos Humanos da Secretaria de Estado da Educação.`}
      />
      <SecretaryContentItem
        title={t("popup.expanded.mainTopics")}
        description={`Coordenadoria de Direitos Humanos da Secretaria de Estado da Mulher, Inclusão, Assistência Social, do Trabalho e dos Direitos Humanos. Serviço de Projetos Escolares em Direitos Humanos da Secretaria de Estado da Educação.`}
      />
      <SecretaryContentItem
        title={t("popup.expanded.policies")}
        description={`Coordenadoria de Direitos Humanos da Secretaria de Estado da Mulher, Inclusão, Assistência Social, do Trabalho e dos Direitos Humanos. Serviço de Projetos Escolares em Direitos Humanos da Secretaria de Estado da Educação.`}
      />
      <SecretaryContentItem
        title={t("popup.expanded.plans")}
        description={`Coordenadoria de Direitos Humanos da Secretaria de Estado da Mulher, Inclusão, Assistência Social, do Trabalho e dos Direitos Humanos. Serviço de Projetos Escolares em Direitos Humanos da Secretaria de Estado da Educação.`}
      />
      <SecretaryContentItem
        title={t("popup.expanded.teamSize")}
        description={`Coordenadoria de Direitos Humanos da Secretaria de Estado da Mulher, Inclusão, Assistência Social, do Trabalho e dos Direitos Humanos. Serviço de Projetos Escolares em Direitos Humanos da Secretaria de Estado da Educação.`}
      />
    </VStack>
  );
}

export default function ExpandedPopup({
  onClose,
  isOpen,
  stateInfo,
}: {
  onClose: () => void;
  isOpen: boolean;
  stateInfo?: Response;
}) {
  const { t } = useTranslation("home");

  if (!stateInfo) {
    return null;
  }

  const degree = stateInfo?.estado_basico__grau_institucionalizacao;
  const gradient = INFO_ACCESS[degree];

  console.log({ stateInfo });

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      scrollBehavior={"inside"}
      colorScheme={gradient}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{stateInfo?.estado__nome}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={8}>
            <HStack justify={"space-around"} color={"brand.primary"}>
              <IconWithEmoji
                category={t("category.document")}
                gradient={gradient}
                EmojiIcon={FaceSmileIcon}
                MainIcon={BriefcaseIcon}
              />
              <IconWithEmoji
                category={t("category.collegiate")}
                gradient={gradient}
                EmojiIcon={FaceSmileIcon}
                MainIcon={UsersIcon}
              />
              <IconWithEmoji
                category={t("category.govern")}
                gradient={gradient}
                EmojiIcon={FaceSmileIcon}
                MainIcon={DocumentTextIcon}
              />
            </HStack>
            <Divider borderColor={"brand.primary"} borderWidth={"1px"} />
            <SecretaryContent />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

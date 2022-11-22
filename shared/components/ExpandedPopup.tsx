import {
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
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
            <Divider color={"brand.primary"} borderWidth={"1px"} />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

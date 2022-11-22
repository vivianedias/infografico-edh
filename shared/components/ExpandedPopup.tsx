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

export default function ExpandedPopup({
  onClose,
  isOpen,
  stateInfo,
  primaryColor,
  textColor,
}: {
  onClose: () => void;
  isOpen: boolean;
  stateInfo?: Response;
  primaryColor: string;
  textColor: string;
}) {
  const { t } = useTranslation("home") 
  console.log({ stateInfo });
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          textAlign={"center"}
          bgColor={primaryColor}
          color={textColor}
        >
          {stateInfo?.estado__nome}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody bgColor={"white"} p={12}>
          <VStack spacing={8}>
            <HStack justify={"space-around"} color={"brand.primary"}>
              <IconWithEmoji
                category={t("category.document")}
                emojiBgColor={primaryColor}
                EmojiIcon={FaceSmileIcon}
                MainIcon={BriefcaseIcon}
              />
              <IconWithEmoji
                category={t("category.collegiate")}
                emojiBgColor={primaryColor}
                EmojiIcon={FaceSmileIcon}
                MainIcon={UsersIcon}
              />
              <IconWithEmoji
                category={t("category.govern")}
                emojiBgColor={primaryColor}
                EmojiIcon={FaceSmileIcon}
                MainIcon={DocumentTextIcon}
              />
            </HStack>
            <Divider color={'brand.primary'} borderWidth={"1px"} />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

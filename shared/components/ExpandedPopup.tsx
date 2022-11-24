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
} from "@chakra-ui/react";
import { StatesResponse } from "../types/airtable";
import {
  BriefcaseIcon,
  UsersIcon,
  DocumentTextIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import IconWithEmoji from "./IconWithEmoji";
import { useTranslation } from "next-i18next";
import { INFO_ACCESS } from "../utils/buildCaseFilters";
import SecretaryContent from "./SecretaryContent";

type IconItemsReturn = {
  label: string;
  EmojiIcon: React.FC;
  MainIcon: React.FC;
};

const ICON_ITEMS = (t: (param: string) => string): IconItemsReturn[] => [
  {
    label: t("category.document"),
    EmojiIcon: FaceSmileIcon,
    MainIcon: BriefcaseIcon,
  },
  {
    label: t("category.collegiate"),
    EmojiIcon: FaceSmileIcon,
    MainIcon: UsersIcon,
  },
  {
    label: t("category.govern"),
    EmojiIcon: FaceSmileIcon,
    MainIcon: DocumentTextIcon,
  },
];

export default function ExpandedPopup({
  onClose,
  isOpen,
  stateInfo,
}: {
  onClose: () => void;
  isOpen: boolean;
  stateInfo?: StatesResponse;
}) {
  const { t } = useTranslation("home");

  if (!stateInfo) {
    return null;
  }

  const degree = stateInfo?.estado_basico__grau_institucionalizacao;
  const gradient = INFO_ACCESS[degree];

  // console.log({ stateInfo });

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
              {ICON_ITEMS(t).map(({ label, ...rest }, i) => (
                <IconWithEmoji
                  key={`icon-with-emoji-${i}`}
                  category={label}
                  gradient={gradient}
                  {...rest}
                />
              ))}
            </HStack>
            <Divider borderColor={"brand.primary"} borderWidth={"1px"} />
            <SecretaryContent />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

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
import { StatesFields, StatesResponse } from "../types/airtable";
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
  status: string;
  MainIcon: React.FC;
};

const ICON_ITEMS = (
  t: (param: string) => string,
  stateInfo: StatesFields
): IconItemsReturn[] => [
  {
    label: t("category.document"),
    status: stateInfo.estado_basico__documento_orientador,
    MainIcon: BriefcaseIcon,
  },
  {
    label: t("category.collegiate"),
    status: stateInfo.estado_basico__orgao_colegiado,
    MainIcon: UsersIcon,
  },
  {
    label: t("category.govern"),
    status: stateInfo.estado_basico__orgao_publico,
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
          <VStack spacing={8} overflowX={"hidden"}>
            <HStack
              justify={"space-around"}
              color={"brand.primary"}
              spacing={16}
            >
              {ICON_ITEMS(t, stateInfo).map(({ label, ...rest }, i) => (
                <IconWithEmoji
                  key={`icon-with-emoji-${i}`}
                  category={label}
                  gradient={gradient}
                  {...rest}
                />
              ))}
            </HStack>
            <Divider borderColor={"brand.primary"} borderWidth={"1px"} />
            {stateInfo.orgaos ? (
              <SecretaryContent stateSecretaries={stateInfo.orgaos} />
            ) : null}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

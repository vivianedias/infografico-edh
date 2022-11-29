import { useState } from "react";
import { useTranslation } from "next-i18next";
import {
  Divider,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  UsersIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/solid";

import IconWithEmoji from "./IconWithEmoji";
import SecretaryContent from "./SecretaryContent";

import { INFO_ACCESS } from "../utils/buildCaseFilters";
import { OrgaosFields, StatesFields, StatesResponse } from "../types/airtable";

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

function Pagination({
  page,
  setPage,
  gradient,
}: {
  page: number;
  setPage: (param: number) => void;
  gradient: string;
}) {
  return (
    <HStack color={`brand.gradient.${gradient}.primary`}>
      <IconButton
        icon={<ChevronLeftIcon />}
        aria-label={"Ir para direita"}
        onClick={() => setPage(0)}
        variant={"link"}
        disabled={page === 1}
        size={"sm"}
        color={`brand.gradient.${gradient}.primary`}
      />
      <Text fontWeight={page === 1 ? 700 : 400}>1</Text> -{" "}
      <Text fontWeight={page === 2 ? 700 : 400}>2</Text>
      <IconButton
        icon={<ChevronRightIcon />}
        aria-label={"Ir para esquerda"}
        onClick={() => setPage(1)}
        variant={"link"}
        disabled={page === 2}
        size={"sm"}
        color={`brand.gradient.${gradient}.primary`}
      />
    </HStack>
  );
}

export default function ExpandedPopup({
  onClose,
  isOpen,
  stateInfo,
}: {
  onClose: () => void;
  isOpen: boolean;
  stateInfo?: StatesResponse;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { t } = useTranslation("home");

  if (!stateInfo) {
    return null;
  }

  const degree = stateInfo?.estado_basico__grau_institucionalizacao;
  const gradient = INFO_ACCESS[degree];
  const hasStateSecretaries = stateInfo.orgaos && stateInfo.orgaos.length > 0;

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
          <VStack
            spacing={8}
            overflowX={"hidden"}
            overflowY={hasStateSecretaries ? "auto" : "hidden"}
          >
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
            {hasStateSecretaries ? (
              <>
                <Divider borderColor={"brand.primary"} borderWidth={"1px"} />
                <SecretaryContent
                  stateSecretaries={stateInfo.orgaos as OrgaosFields[]}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                />
              </>
            ) : null}
          </VStack>
        </ModalBody>
        {stateInfo.orgaos && stateInfo.orgaos.length > 1 ? (
          <ModalFooter>
            <Pagination
              page={activeIndex ? activeIndex + 1 : 1}
              setPage={setActiveIndex}
              gradient={gradient}
            />
          </ModalFooter>
        ) : null}
      </ModalContent>
    </Modal>
  );
}

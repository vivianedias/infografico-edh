import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import Pagination from "./Pagination";
import StateInfo from "./StateInfo";

import { INFO_ACCESS } from "../utils/buildCaseFilters";
import { StatesResponse } from "../types/airtable";

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

  if (!stateInfo) {
    return null;
  }

  const degree = stateInfo.estado_basico__grau_institucionalizacao;
  const gradient = INFO_ACCESS[degree];

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      scrollBehavior={"inside"}
      colorScheme={gradient}
      variant={"secretaries"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{stateInfo?.estado__nome}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <StateInfo
            gradient={gradient}
            stateInfo={stateInfo}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
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

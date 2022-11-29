import { FunctionComponent, ReactNode, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import {
  Box,
  Flex,
  Icon,
  IconButton,
  List,
  ListItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import ExpandedPopup from "./ExpandedPopup";
import { INFO_ACCESS } from "../utils/buildCaseFilters";
import { StatesResponse } from "../types/airtable";

export function PopupContent({
  label,
  stateInfo,
}: {
  label: string;
  stateInfo?: StatesResponse;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!stateInfo) {
    return null;
  }

  const degree = stateInfo?.estado_basico__grau_institucionalizacao;
  const gradient = INFO_ACCESS[degree];

  return (
    <>
      <Box rounded={"md"} boxShadow={"md"} width={"230px"} overflow={"hidden"}>
        <Flex
          justifyContent={"space-evenly"}
          py={2}
          backgroundColor={`brand.gradient.${gradient}.primary`}
          alignItems={"center"}
        >
          <Text
            fontSize={"lg"}
            fontWeight={600}
            color={`brand.gradient.${gradient}.text`}
          >
            {label}
          </Text>
          <IconButton
            boxSize={"30px"}
            size={"sm"}
            variant={"unstyled"}
            aria-label={"Expandir popup"}
            onClick={onOpen}
            display={"flex"}
            alignItems={"center"}
            icon={
              <Icon
                as={InformationCircleIcon}
                color={`brand.gradient.${gradient}.text`}
                boxSize={"25px"}
              />
            }
          />
        </Flex>
        <Box px={7} py={3} backgroundColor={"white"}>
          <List fontSize={"sm"} color={"brand.primary"}>
            <ListItem>Documento orientador</ListItem>
            <ListItem>Orgão de governo</ListItem>
            <ListItem>Orgão colegiado</ListItem>
          </List>
        </Box>
      </Box>
      <ExpandedPopup onClose={onClose} isOpen={isOpen} stateInfo={stateInfo} />
    </>
  );
}

const PopupBase: FunctionComponent<{
  children: ReactNode;
  lngLat: {
    lat: number;
    lng: number;
  };
  map: any;
}> = ({ children, lngLat, map }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const popup = new mapboxgl.Popup({
      className: "popup-base",
      closeButton: false,
    })
      .setLngLat(lngLat)
      .setDOMContent(popupRef.current as any)
      .addTo(map);

    return popup.remove as any;
  }, [children, lngLat, map]);

  return (
    <div className={"popup-outer"} style={{ display: "none" }}>
      <div className={"popup-inner"} ref={popupRef}>
        {children}
      </div>
    </div>
  );
};

export default PopupBase;

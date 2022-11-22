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
import { getColorByInfo } from "../utils/buildCaseFilters";
import ExpandedPopup from "./ExpandedPopup";
import { Response } from "../types/airtable";

export function PopupContent({
  label,
  colorCoding,
  stateInfo,
}: {
  label: string;
  colorCoding?: string;
  stateInfo?: Response;
}) {
  const [primaryColor, textColor] = getColorByInfo(colorCoding || "");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box rounded={"md"} boxShadow={"md"} overflow={"hidden"} width={"230px"}>
        <Flex
          justifyContent={"space-evenly"}
          py={2}
          backgroundColor={primaryColor}
          alignItems={"center"}
        >
          <Text fontSize={"lg"} fontWeight={600} color={textColor}>
            {label}
          </Text>
          <IconButton
            boxSize={"30px"}
            variant={"unstyled"}
            aria-label={"Expandir popup"}
            onClick={onOpen}
            icon={
              <Icon
                as={InformationCircleIcon}
                color={textColor}
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
      <ExpandedPopup
        textColor={textColor}
        primaryColor={primaryColor}
        onClose={onClose}
        isOpen={isOpen}
        stateInfo={stateInfo}
      />
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

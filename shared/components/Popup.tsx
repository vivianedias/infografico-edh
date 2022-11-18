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
} from "@chakra-ui/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { getColorByInfo } from "../utils/buildCaseFilters";

export function PopupContent({
  label,
  colorCoding,
}: {
  label: string;
  colorCoding?: string;
}) {
  const [primaryColor, secondaryColor, textColor] = getColorByInfo(colorCoding || "")
  return (
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
          icon={
            <Icon
              as={InformationCircleIcon}
              color={textColor}
              boxSize={"20px"}
            />
          }
        />
      </Flex>
      <Box px={7} py={3} backgroundColor={secondaryColor}>
        <List fontSize={"sm"} color={textColor}>
          <ListItem>Documento orientador</ListItem>
          <ListItem>Orgão de governo</ListItem>
          <ListItem>Orgão colegiado</ListItem>
        </List>
      </Box>
    </Box>
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

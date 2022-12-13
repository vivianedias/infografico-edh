import { FunctionComponent, ReactNode, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useTranslation } from "next-i18next";
import {
  Box,
  Circle,
  Flex,
  HStack,
  Icon,
  IconButton,
  List,
  ListItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import ExpandedPopup from "./ExpandedPopup";
import StatusIcon from "./StatusIcons";
import { INFO_ACCESS } from "../utils/buildCaseFilters";
import { StatesResponse } from "../types/airtable";

const POPUP_ITEMS = (
  t: (param: string) => string,
  stateInfo: StatesResponse
) => [
  {
    status: stateInfo.estado_basico__documento_orientador,
    documentName: stateInfo.estado_basico__documento_orientador_nome,
    category: t("category.document"),
  },
  {
    status: stateInfo.estado_basico__orgao_colegiado,
    collegiateName: stateInfo.estado_basico__orgao_colegiado_nome,
    category: t("category.collegiate"),
  },
  {
    status: stateInfo.estado_basico__orgao_publico,
    category: t("category.govern"),
  },
];

export function PopupContent({
  label,
  stateInfo,
}: {
  label: string;
  stateInfo?: StatesResponse;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation("home");

  if (!stateInfo) {
    return null;
  }

  const degree = stateInfo?.estado_basico__grau_institucionalizacao;
  const gradient = INFO_ACCESS[degree];

  return (
    <>
      <Box rounded={"md"} boxShadow={"md"} width={56} overflow={"hidden"}>
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
            boxSize={7}
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
                boxSize={6}
              />
            }
          />
        </Flex>
        <Box px={6} py={3} backgroundColor={"white"}>
          <List fontSize={"sm"} color={"brand.primary"} spacing={3}>
            {POPUP_ITEMS(t, stateInfo).map(
              ({ status, documentName, collegiateName, category }, i) => (
                <ListItem key={`popup-items-${i}`}>
                  <HStack>
                    <Circle
                      size={4}
                      bgColor={`brand.gradient.${gradient}.primary`}
                      position={"relative"}
                    >
                      <StatusIcon
                        gradient={gradient}
                        status={status}
                        documentName={documentName}
                        collegiateName={collegiateName}
                        category={category.toLowerCase()}
                        size={"sm"}
                      />
                    </Circle>
                    <Text>{category}</Text>
                  </HStack>
                </ListItem>
              )
            )}
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

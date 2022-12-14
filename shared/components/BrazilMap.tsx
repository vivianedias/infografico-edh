import { useEffect, useRef, useState } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import { Box } from "@chakra-ui/react";

import PopupBase, { PopupContent } from "./Popup";
import Legend from "./Legend";

import buildCaseFilters from "../utils/buildCaseFilters";
import isValid from "../utils/isValid";

import { BrazilStatesGeojson, Feature } from "../types/geojson";
import { StatesResponse } from "../types/airtable";
import getStateInfo from "../utils/getStateInfo";

export default function BrazilMap({
  data,
  tableData,
  selectedPeriod,
}: {
  data: BrazilStatesGeojson;
  tableData: StatesResponse[];
  selectedPeriod: string;
}) {
  if (!process.env.NEXT_PUBLIC_MAPBOX_KEY) {
    throw new Error("Add a mapbox key in the envs");
  }

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || "";

  const filteredTableData = tableData.filter(
    (data) => data.periodo === selectedPeriod
  );
  const [currentTableData, setCurrentTableData] =
    useState<StatesResponse[]>(filteredTableData);

  const mapContainer = useRef(null);
  const [map, setMap] = useState<Map | null>(null);
  const [content, setContent] = useState(null);
  const [popupLngLat, setPopupLngLat] = useState(null);
  const [lng] = useState(-53.4176);
  const [lat] = useState(-14.6196);
  const [zoom] = useState(3.43);

  function setDefaultLayers(map: Map) {
    map.addLayer({
      id: "state-fills",
      type: "fill",
      source: "states",
      layout: {},
      paint: {
        "fill-color": [
          "case",
          ...buildCaseFilters(currentTableData),
          "#F4F0EF",
        ],
        "fill-opacity": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          0.75,
          1,
        ],
      },
    });

    map.addLayer({
      id: "state-borders",
      type: "line",
      source: "states",
      layout: {},
      paint: {
        "line-color": "#FFFFFF",
        "line-width": 2,
      },
    });
  }

  function loadSources(map: Map) {
    map.addSource("states", {
      type: "geojson",
      data: data as any,
    });

    setDefaultLayers(map);
  }

  function includeHoverEffects(map: Map) {
    let hoveredStateId: string | number = "";

    map.on("mousemove", "state-fills", (e: any) => {
      if (e.features.length > 0) {
        map.getCanvas().style.cursor = "pointer";

        if (isValid(hoveredStateId)) {
          map.setFeatureState(
            { source: "states", id: hoveredStateId },
            { hover: false }
          );
        }
        hoveredStateId = e.features[0].id;
        map.setFeatureState(
          { source: "states", id: hoveredStateId },
          { hover: true }
        );
      }
    });

    // When the mouse leaves the state-fill layer, update the feature state of the
    // previously hovered feature.
    map.on("mouseleave", "state-fills", () => {
      map.getCanvas().style.cursor = "default";

      if (isValid(hoveredStateId)) {
        map.setFeatureState(
          { source: "states", id: hoveredStateId },
          { hover: false }
        );
      }
      hoveredStateId = "";
    });
  }

  function includePopups(map: Map) {
    map.on("click", "state-fills", (e: any) => {
      const labels = e.features.map((feature: Feature) => {
        return (
          <PopupContent
            key={feature.properties.id}
            label={feature.properties.name}
            stateInfo={getStateInfo({
              tableData,
              feature,
              selectedPeriod,
            })}
          />
        );
      });

      setContent(labels);
      setPopupLngLat(e.lngLat);
    });
  }

  useEffect(() => {
    if (map) return;

    const newMap = new mapboxgl.Map({
      container: mapContainer.current || "",
      style: "mapbox://styles/mapbox/light-v10",
      center: [lng, lat],
      zoom,
      interactive: false,
    });

    setMap(newMap);

    newMap.on("load", (e) => {
      loadSources(e.target);
    });

    includeHoverEffects(newMap);

    includePopups(newMap);

    return () => newMap?.remove();
  }, []);

  useEffect(() => {
    if (!map) return;

    if (map.isStyleLoaded()) {
      const updatedFilteredTableData = tableData.filter(
        (data) => data.periodo === selectedPeriod
      );

      map.setPaintProperty("state-fills", "fill-color", [
        "case",
        ...buildCaseFilters(updatedFilteredTableData),
        "#F4F0EF",
      ]);

      setCurrentTableData(updatedFilteredTableData);
    }
  }, [selectedPeriod]);

  return (
    <Box as="section" width={{ base: "100%", xl: "unset" }}>
      {popupLngLat ? (
        <PopupBase map={map} lngLat={popupLngLat}>
          {content}
        </PopupBase>
      ) : null}
      <Box
        w={{ base: "100%", xl: "2xl" }}
        h={{ base: "70vh", xl: "3xl" }}
        position="relative"
      >
        <Box ref={mapContainer} className="map-container" boxSize={"100%"} />
        <Legend />
      </Box>
    </Box>
  );
}

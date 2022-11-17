import { Box } from "@chakra-ui/react";
import mapboxgl, { Map } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { BrazilStatesGeojson, Feature } from "../types/geojson";
import buildCaseFilters from "../utils/buildCaseFilters";
import isValid from "../utils/isValid";
import PopupBase, { PopupContent } from "./Popup";

export default function BrazilMap({
  data,
  error,
}: {
  data: BrazilStatesGeojson;
  error: string;
}) {
  if (!process.env.NEXT_PUBLIC_MAPBOX_KEY) {
    throw new Error("Add a mapbox key in the envs");
  }

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || "";

  const mapContainer = useRef(null);
  const [map, setMap] = useState<Map | null>(null);
  const [content, setContent] = useState(null);
  const [popupLngLat, setPopupLngLat] = useState(null);

  function loadSources(map: Map) {
    map.addSource("states", {
      type: "geojson",
      data: data as any,
    });

    map.addLayer({
      id: "state-fills",
      type: "fill",
      source: "states",
      layout: {},
      paint: {
        "fill-color": ["case", ...buildCaseFilters(), "#F4F0EF"],
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

  function mapState(map: Map) {
    let hoveredStateId: string | number = "";

    map.on("mousemove", "state-fills", (e: any) => {
      if (e.features.length > 0) {
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
      if (isValid(hoveredStateId)) {
        map.setFeatureState(
          { source: "states", id: hoveredStateId },
          { hover: false }
        );
      }
      hoveredStateId = "";
    });
  }

  useEffect(() => {
    if (map) return;

    const newMap = new mapboxgl.Map({
      container: mapContainer.current || "",
      style: "mapbox://styles/mapbox/light-v10",
      center: [-47.9373578, -15.7213698],
      zoom: 4,
    });

    setMap(newMap);

    newMap.on("load", (e) => {
      loadSources(e.target);
    });

    mapState(newMap);

    newMap.on("click", "state-fills", (e: any) => {
      const labels = e.features.map((feature: Feature) => (
        <PopupContent
          key={feature.properties.id}
          label={feature.properties.name}
        />
      ));

      setContent(labels);
      setPopupLngLat(e.lngLat);
    });

    return () => newMap?.remove();
  }, []);

  return (
    <Box as="section">
      {popupLngLat ? (
        <PopupBase map={map} lngLat={popupLngLat}>
          {content}
        </PopupBase>
      ) : null}
      <Box
        ref={mapContainer}
        className="map-container"
        height={"1000px"}
        width={"1000px"}
      />
    </Box>
  );
}

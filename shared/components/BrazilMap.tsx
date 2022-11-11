import { Box } from "@chakra-ui/react";
import mapboxgl, { Map } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { BrazilStatesGeojson } from "../types/geojson";

export default function BrazilMap({
  data,
  error,
}: {
  data: any;
  error: string;
}) {
  if (!process.env.NEXT_PUBLIC_MAPBOX_KEY) {
    throw new Error("Add a mapbox key in the envs");
  }

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || "";

  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current || "",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-71.4244124,-9.1286515],
      zoom: 5,
    });

    map.on("load", () => {
      map.addSource("states", {
        type: "geojson",
        data: data,
      });

      map.addLayer({
        id: "state-fills",
        type: "fill",
        source: "states",
        layout: {},
        paint: {
          "fill-color": "#627BC1",
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            1,
            0.5,
          ],
        },
      });

      map.addLayer({
        id: "state-borders",
        type: "line",
        source: "states",
        layout: {},
        paint: {
          "line-color": "#627BC1",
          "line-width": 2,
        },
      });
    });

    let hoveredStateId: null | string | number;

    map.on("mousemove", "state-fills", (e: any) => {
      if (e.features.length > 0) {
        if (hoveredStateId !== null) {
          map.setFeatureState(
            { source: "states", id: hoveredStateId },
            { hover: false }
          );
        }
        hoveredStateId = e.features[0].id;
        map.setFeatureState(
          { source: "states", id: hoveredStateId || undefined },
          { hover: true }
        );
      }
    });

    // When the mouse leaves the state-fill layer, update the feature state of the
    // previously hovered feature.
    map.on("mouseleave", "state-fills", () => {
      if (hoveredStateId !== null) {
        map.setFeatureState(
          { source: "states", id: hoveredStateId },
          { hover: false }
        );
      }
      hoveredStateId = null;
    });

    return () => map.remove();
  }, []);

  return (
    <Box as="section">
      <Box
        ref={mapContainer}
        className="map-container"
        height={"1000px"}
        width={"1000px"}
      />
    </Box>
  );
}

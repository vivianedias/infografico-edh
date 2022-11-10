import { Box } from '@chakra-ui/react'
import mapboxgl, { Map } from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';

export default function BrazilMap({ data, error }: { data: Record<string, any>; error: string }) {
  if (!process.env.NEXT_PUBLIC_MAPBOX_KEY) {
    throw new Error("Add a mapbox key in the envs")
  }

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || '';

  const mapContainer = useRef(null);
  const map = useRef<null | Map>(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current || "",
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
  });

  return (
    <Box as="section">
      <Box ref={mapContainer} className="map-container" height={'400px'} width={"400px"} />
    </Box>
  )
}
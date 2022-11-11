import React, { ReactNode, useContext, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

const PopupBase: React.FunctionComponent<{
  children: ReactNode;
  lngLat: any;
  map: any;
}> = ({ children, lngLat, map }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const popup = new mapboxgl.Popup({})
      .setLngLat(lngLat)
      .setDOMContent(popupRef.current as any)
      .addTo(map);

    return popup.remove as any;
  }, [children, lngLat, map]);

  return (
    <div style={{ display: "none" }}>
      <div ref={popupRef}>{children}</div>
    </div>
  );
};

export default PopupBase;

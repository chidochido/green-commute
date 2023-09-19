import * as React from "react";
import { useRef, useState, useMemo, useCallback } from "react";
import { Marker, Popup } from "react-leaflet";

export default function DraggableMarker(props) {
  const [position, setPosition] = useState(props.center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          props.markerUpdate(marker.getLatLng());
        }
      },
    }),
    []
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span>Mark location</span>
      </Popup>
    </Marker>
  );
}

import { GoogleMap, DirectionsRenderer, Marker } from "@react-google-maps/api";

function Map(props) {
  const center = { lat: 33.772378580982, lng: -84.39474039330827 }; // Tech Tower

  return (
    <GoogleMap
      center={center}
      zoom={15}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      options={{
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      {!props.directionsResponse && <Marker position={center} />}

      {props.directionsResponse && (
        <DirectionsRenderer directions={props.directionsResponse} />
      )}
    </GoogleMap>
  );
}

export default Map;

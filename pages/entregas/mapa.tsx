import React from 'react'
import { GoogleMap, useJsApiLoader ,Marker} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -1.049752,
  lng: -78.587458
};

function MyComponent({ubicacion,setubicacion}) {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyC8oVhatkXa6BuOm1jUWCTUDcYTWbDD72Q"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])


const marcar = m => {
  setubicacion(m.latLng.lat()+"@"+m.latLng.lng())
}
  return isLoaded ? (
      <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker
          
          onDrag={marcar}
          position={center}
          draggable={true}
        />
      </GoogleMap>
      
      </>
  ) : <></>
}

export default React.memo(MyComponent)
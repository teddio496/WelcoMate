import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// HOW TO USE: <GoogleMapsComponent latitude={...} longitude={...} />

const GoogleMapsComponent = ({ latitude, longitude }) => {
  // Set the container style and initial center for the map
  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: latitude,  // Latitude of location
    lng: longitude  // Longitude of location
  };

  const [markers, setMarkers] = useState([]);

  // Effect to set marker on load
    useEffect(() => {
        if (latitude && longitude) {
        setMarkers([{ id: 1, lat: latitude, lng: longitude }]);
        }
    }, [latitude, longitude]);

  return (
    <div>
      {/* Google Map Component */}
      <LoadScript googleMapsApiKey={"AIzaSyCC70goPw8Fz2hBoiwvs5i-VcxwCgIblWs"}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={12} // Set the zoom level
        >
          {/* Render markers */}
          {markers.map(marker => (
            <Marker key={marker.id} position={{ lat: marker.lat, lng: marker.lng }} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapsComponent;
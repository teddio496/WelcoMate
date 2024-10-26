import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GoogleMapComponent = () => {
  // Set the container style for the map
  const [address, setAddress] = useState("beijing")
  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  // State to manage markers and map center
  const [markers, setMarkers] = useState([]);
  const [mapCenter, setMapCenter] = useState(null); // Initially null to avoid centering before geocoding is done

  // Function to fetch coordinates from the address using Geocoding API
  const geocodeAddress = async (address) => {
    const geocoder = new window.google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          resolve({ lat: lat(), lng: lng() });
        } else {
          reject('Geocode was not successful: ' + status);
        }
      });
    });
  };

  // Effect to geocode the address passed as a prop
  useEffect(() => {
    if (address) {
      geocodeAddress(address)
        .then((location) => {
          setMapCenter(location);  // Set the map center to the geocoded location
          setMarkers([{ ...location, id: 1 }]); // Add a marker at the geocoded location
        })
        .catch((error) => {
          console.error('Error geocoding address:', error);
        });
    }
  }, [address]);

  return (
    <div>
      <LoadScript
        googleMapsApiKey="" // Replace with your own API key
        loadingElement={<div>Loading...</div>} // Optional loading element
      >
        {mapCenter && (  // Only render the map when mapCenter is available
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={12}
          >
            {/* Render all markers */}
            {markers.map(marker => (
              <Marker key={marker.id} position={{ lat: marker.lat, lng: marker.lng }} />
            ))}
          </GoogleMap>
        )}
      </LoadScript>
    </div>
  );
};

export default GoogleMapComponent;
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css'; 
import { useState, useEffect } from 'react';

// Dynamically import the MapContainer, TileLayer, and other Leaflet components
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const MapComponent = ({ address }) => {

  // default position is Toronto
  const [position, setPosition] = useState([43.6532, -79.3832]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!address) return;
      
      if (!address.toLowerCase().includes('toronto')) {
        address += ', Toronto';
      }

      const { OpenStreetMapProvider } = await import('leaflet-geosearch');
      const provider = new OpenStreetMapProvider();
      const results = await provider.search({ query: address });

      if (results && results.length > 0) {
        console.log(address);
        const { x: lon, y: lat } = results[0]; // Get the longitude (x) and latitude (y)
        setPosition([lat, lon]); // Set the map position to the geocoded coordinates
      } 
      else {
        console.log('No results found');
        const randomOffset = () => (Math.random() - 0.5) * 0.1;
        const randomLat = 43.6532 + randomOffset();
        const randomLon = -79.3832 + randomOffset();
        setPosition([randomLat, randomLon]);
      }
    };

    fetchCoordinates();
  }, [address]); 

  return (
    <MapContainer center={position} zoom={10} style={{ height: '92vh', width: '60vh', position: 'fixed' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          {`${address}`}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
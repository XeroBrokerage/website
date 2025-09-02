// "use client";

// import { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// // Fix for default markers in react-leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// const PropertyMap = ({ address }) => {
//   const [position, setPosition] = useState([28.6139, 77.2090]); // Default to New Delhi
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const geocodeAddress = async () => {
//       if (!address) {
//         setLoading(false);
//         return;
//       }

//       try {
//         // Use OpenStreetMap's Nominatim API for geocoding
//         const response = await fetch(
//           `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
//         );
//         const data = await response.json();

//         if (data && data.length > 0) {
//           setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
//         }
//       } catch (error) {
//         console.error('Geocoding error:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     geocodeAddress();
//   }, [address]);

//   if (loading) {
//     return (
//       <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
//         <span className="text-gray-500">Loading map...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="aspect-video rounded-lg overflow-hidden">
//       <MapContainer
//         center={position}
//         zoom={15}
//         style={{ height: '100%', width: '100%' }}
//         scrollWheelZoom={false}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={position}>
//           <Popup>
//             {address || 'Property location'}
//           </Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// };

// export default PropertyMap;

"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const PropertyMap = ({ address }) => {
  const [position, setPosition] = useState([28.6139, 77.2090]); // Default to New Delhi
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const geocodeAddress = async () => {
      if (!address) {
        setLoading(false);
        return;
      }

      try {
        // Use OpenStreetMap's Nominatim API for geocoding
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        );
        const data = await response.json();

        if (data && data.length > 0) {
          setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        }
      } catch (error) {
        console.error('Geocoding error:', error);
      } finally {
        setLoading(false);
      }
    };

    geocodeAddress();
  }, [address, isClient]);

  if (!isClient || loading) {
    return (
      <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
        <span className="text-gray-500">Loading map...</span>
      </div>
    );
  }

  return (
    <div className="aspect-video rounded-lg overflow-hidden">
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            {address || 'Property location'}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default PropertyMap;

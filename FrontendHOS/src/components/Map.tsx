/*import React from 'react'
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import LeafletGeoCoder from './LeafletGeoCoder';
import LeafletRoutingMachine from './LeafletRoutingMachine';
const Map = () => {
  return (
        <MapContainer center={[36.8065, 10.1815]} zoom={13} scrollWheelZoom={false} className="h-[600px] w-full rounded-2xl">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LeafletGeoCoder/>
          
        </MapContainer>
  )
}

export default Map*/

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Positions } from "../App";

type MapProps = {
  positions: Positions;
};

const Map: React.FC<MapProps> = ({ positions }) => {
  // Prepare marker coordinates
  const allCoords: Array<[number, number]> = (
    ["currentLocation", "pickupLocation", "dropoffLocation"] as Array<keyof Positions>
  )
    .filter(field => positions[field].lat !== null && positions[field].lng !== null)
    .map(field => [
      positions[field].lat as number,
      positions[field].lng as number
    ]);

  const center: [number, number] =
    allCoords.length > 0
      ? allCoords[allCoords.length - 1]
      : [36.79706957721685,10.212883699170273]; // Default Paris

  return (
    <MapContainer center={center} zoom={10} style={{ height: "600px", width: "100%", borderRadius: "16px" }}>
      <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
      {allCoords.map((coord, i) =>
        <Marker key={i} position={coord}>
          <Popup>
            {["Current", "Pickup", "Dropoff"][i]}: {coord[0]}, {coord[1]}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;

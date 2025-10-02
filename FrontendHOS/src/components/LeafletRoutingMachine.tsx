import React from 'react'
import L from "leaflet";
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import "leaflet-routing-machine";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

function LeafletRoutingMachine() {
    const map = useMap();

    useEffect(() =>{
        const control = (L as any).Routing.control({
        waypoints: [
            L.latLng(57.74, 11.94),
            L.latLng(57.6792, 11.949)
        ]
        }).addTo(map);
    }, []);
  return null
}

export default LeafletRoutingMachine
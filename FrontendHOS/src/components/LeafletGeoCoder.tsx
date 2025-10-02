import { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";

const LeafletGeoCoder = () => {
  const map = useMap();

  useEffect(() => {
    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: false,
    })
      .on("markgeocode", (e: any) => {
        
        console.log(e);
        const lat_lng = e.geocode.center;
        const place = e.name ;
        console.log(place);
        console.log(lat_lng);
        new L.Marker(lat_lng).addTo(map).bindPopup(e.geocode.name).openPopup();
        map.fitBounds(e.geocode.bbox)
      })
      .addTo(map);

    // ✅ cleanup so you don’t get duplicates
    return () => {
      map.removeControl(geocoder);
    };
  }, [map]);

  return null;
};

export default LeafletGeoCoder;


/*const geocoder = L.Control.Geocoder.nominatim();
        const control = L.Control.geocoder({
            querySize: 10,
            geocoder,
            placeholder: "Search here...",
            defaultMarkGeocode: false,
            collapsed: false,
        }).addTo(map);
        control.on("markgeocode", (e)=>{
            const latlng = e.geocode.center;
            map.setView(latlng, 10);
        });
        return ()=>{
            map.removeControl(control);
        }*/
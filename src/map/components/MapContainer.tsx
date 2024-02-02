import { createContext, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export const MapContext = createContext<mapboxgl.Map | null>(null);

interface MapContainerProps {
  height: string | number;
  children?: React.ReactNode;
}

const MapContainer: React.FC<MapContainerProps> = ({ height, children }) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2hhZmFuYXVyYSIsImEiOiJjbDBjOG0xMW0xMGpzM2pycWdmMjI0NnF2In0.R5_vlGTN1R93lBpcUkNlFg";

    const mapInstance = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/light-v10",
      center: [118, -6.5],
      zoom: 3.15,
      attributionControl: false,
    });

    mapInstance.addControl(
      new mapboxgl.NavigationControl({ showCompass: false })
    );

    setMap(mapInstance);
    return () => {
      setMap(null);
      mapInstance.remove();
    };
  }, []);

  useEffect(() => {
    if (map) map.resize();
  }, [height]);

  return (
    <MapContext.Provider value={map}>
      <div className="relative">
        <div id="map-container" style={{ height, width: "100%" }} />
        {children}
      </div>
    </MapContext.Provider>
  );
};

export default MapContainer;

import React, { useContext, useEffect, useState } from "react";
import { MapContext } from "./MapContainer";
import mapboxgl from "mapbox-gl";
import { GeoJSONContext } from "./Geojson";
import { generateId } from "../../utils/generate-id";
import { GeoJsonProperties } from "geojson";

type ExcludeValue<T, V> = T extends V ? never : T;

interface LayerProps {
  type: ExcludeValue<mapboxgl.AnyLayer["type"], "custom">;
  paint: Record<string, string | unknown>;
  // popupTemplate?(properties?: GeoJsonProperties): string;
}

const Layer: React.FC<LayerProps> = ({ 
  type, 
  paint, 
  // popupTemplate 
}) => {
  const [styleLoaded, setStyleLoaded] = useState(false);
  const map = useContext(MapContext);
  const source = useContext(GeoJSONContext);
  const id = generateId();


  useEffect(() => {
    map?.once("load", () => {
      setStyleLoaded(true);
    });
  }, [map]);

  useEffect(() => {
    if (!styleLoaded || !source) return;
    map?.addSource(id, {
      type: "geojson",
      data: source,
    });
    map?.addLayer({
      id,
      type,
      source: id,
      paint,
    });
    // if (popupTemplate) {
    //   const popup = new mapboxgl.Popup();
    //   map?.on("mouseenter", id, (e) => {
    //     const properties = e.features?.[0].properties;
    //     popup.setLngLat(e.lngLat).setHTML(popupTemplate(properties)).addTo(map);
    //   });
    //   map?.on("mouseleave", id, (e) => {
    //     popup.remove();
    //   });
    // }
    return () => {
      if (!styleLoaded) return;
      try {
        map?.removeLayer(id);
        map?.removeSource(id);
      } catch (err) {
        console.error(err);
      }
    };
  }, [source, styleLoaded]);

  return null;
};

export default Layer;

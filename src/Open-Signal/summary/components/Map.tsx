import React, { useRef, useMemo } from "react";
import regions from "../assets/regions.json";
import Legend from "./map/Legend";
import { useFetchData } from "../hooks/useFetchData";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import MapContainer from "./map/MapContainer";
// import Geojson from "./map/Geojson";
// import Layer from "./map/Layer";
import { dataParser } from "../utils/data-parser";
import { MapContainer, Layer, Geojson, LayerProps } from "@pt-neural-technologies-indonesia/react-mapbox";
import AchievementChart from "./map/AchievementChart";
import useComponentSize from "@rehooks/component-size";
import Telkomsel from "../assets/Telkomsel.svg";
import XL from "../assets/XL.svg";
import Indosat from "../assets/Indosat.svg";
import Smartfren from "../assets/Smartfren.svg";
import { IMap } from "../interfaces/Map";
import { IOKRTrend } from "../interfaces/OKRTrend";

interface MapProps {
    dataMap : IMap[] | undefined;
    dataTrend : IOKRTrend | undefined;
}

const Map: React.FC<MapProps> = ({
    dataMap,
    dataTrend
}) => {
  const domRef = useRef<HTMLDivElement>(null);
  const componentSize = useComponentSize(domRef);

  const getIconProvider = (provider: string) => {
    switch (provider) {
      case "Telkomsel":
        return `<img src=${Telkomsel} class="w-6 h-6" />`;
      case "XL":
        return `<img src=${XL} class="w-6 h-6" />`;
      case "Indosat Ooredoo + 3":
        return `<img src=${Indosat} class="w-6 h-6" />`;
      case "Smartfren":
        return `<img src=${Smartfren} class="w-6 h-6" />`;
      default:
        return null;
    }
  };

  const MapOptions = useMemo<mapboxgl.MapboxOptions>(()=>{
    return{
      container : "map-container",
      style : "mapbox://styles/mapbox/light-v10",
      center : [118, -6.5],
      zoom : 3.15,
      attributionControl : false,
    }
  },[])

  const control = useMemo(()=> 
  new mapboxgl.NavigationControl({
    showCompass : false
  }),[])

  const layers = useMemo<LayerProps["layers"]>(() => {
    return [
      {
        id: "region-fill",
        type: "fill",
        paint: {
          "fill-color":[
            "match",
            ["get", "service_win"],
            0, "#b91c1c",
            1, "#b91c1c",
            2, "#fb923c",
            3, "#fb923c",
            4, "#fddf47",
            5, "#fddf47",
            6, "#15803C",
            7, "#15803C",
            8, "#15803C",
            "#ffffff",
          ],
          "fill-opacity": 0.8,
        },
        // popupTemplate
      },
      {
        id: "region-line",
        type: "line",
        paint: {
          "line-color": "#000",
          "line-width": 0.3,
        },
      },
    ]
  },[])

  console.log (
    dataParser(
      regions as any,
      "location_id",
      dataMap as any,
      "location"
    )as any
  )

  return (
    <div
      className="md:w-full h-full bg-white/50 dark:bg-[#040C17]/90 backdrop-blur relative"
      ref={domRef}
    >
      <MapContainer height={580}
      mapOption={MapOptions}
      control={control}
      accessToken="pk.eyJ1Ijoic2hhZmFuYXVyYSIsImEiOiJjbDBjOG0xMW0xMGpzM2pycWdmMjI0NnF2In0.R5_vlGTN1R93lBpcUkNlFg"
      >
        <Geojson
        id="region"
        source={
          dataParser(
            regions as any,
            "location_id",
            dataMap as any,
            "location"
          )as any
        }
        >
          <Layer 
          layers = {layers}
          />
            
        </Geojson>
        <div className="absolute left-0 top-1 px-1 flex 2xl:justify-center justify-start w-full">
          <Legend 
          // data={dataMap} 
          />
        </div>
        <div className="flex flex-col gap-1 items-center absolute bottom-1 left-0 w-full px-1 z-10">
          <AchievementChart data={dataTrend} />
        </div>
      </MapContainer>
    </div>
  );
};

export default Map;

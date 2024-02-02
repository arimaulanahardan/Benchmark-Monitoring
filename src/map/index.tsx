import React, { useRef, useMemo } from "react";
import kabupaten from "./assets/kabupaten.json";
import Legend from "./components/Legend";
import { useFetchData } from "./hooks/useFetchData";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import MapContainer from "./components/MapContainer";
// import Geojson from "./components/Geojson";
// import Layer from "./components/Layer";
import { MapContainer, Layer, Geojson, LayerProps } from "@pt-neural-technologies-indonesia/react-mapbox"
import { dataParser } from "./utils/data-parser";
import AchievementChart from "./components/AchievementChart";
import useComponentSize from "@rehooks/component-size";
import Telkomsel from "./assets/Telkomsel.svg";
import XL from "./assets/XL.svg";
import Indosat from "./assets/Indosat.svg";
import Smartfren from "./assets/Smartfren.svg";

interface MapProps {}

const Map: React.FC<MapProps> = () => {
  const { map, okr } = useFetchData();
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

  const MapOptions = useMemo<mapboxgl.MapboxOptions>(() => {
    return {
      container: "map-container",
      style: "mapbox://styles/mapbox/light-v10",
      center: [138, -5.5],
      zoom: 3.15,
      attributionControl: false,
    }
  }, [])

  const control = useMemo(
    () => new mapboxgl.NavigationControl({ showCompass: false }),
    []
  );

  const layers = useMemo<LayerProps["layers"]>(() => {
    return [
      {
        id: "kabupaten-fill",
        type: "fill",
        paint: {
          "fill-color": [
            "match",
            ["get", "final_score"],
            0,
            "#b91c1c",
            1,
            "#fb923c",
            2,
            "#fddf47",
            3,
            "#15803C",
            "#ffffff",
          ],
          "fill-opacity": 0.8,
        },
        popupTemplate: (property) => {
          if (!property) return "<h1>No Data</h1>";
          return `
              <p style="font-weight: 600;">${property["KABUPATEN"]}</p> 
              <br />
              <div class="flex flex-col gap-2 w-[180px]">
                <div class="flex justify-between">Status City GQ: <div class="rounded px-2 py-1 w-14 text-center inline-block text-white font-bold 
                ${property["status_city_gq"] === "win"
              ? "bg-green-400"
              : "bg-red-400"
            }"> 
                  ${(property["status_city_gq"] as string).toUpperCase()}
                  </div>
                    <div>${getIconProvider(property["olo_gq"] as string)}
                    </div>
                  </div>

              <div class="flex justify-between"> Status City GP: 
                <div class="rounded px-2 py-1 w-14 text-center inline-block text-white font-bold 
                ${property["status_city_gp"] === "win"
              ? "bg-green-400"
              : "bg-red-400"
            }"> 
                ${(property["status_city_gp"] as string).toUpperCase()} 
                </div>
                  <div>
                  ${getIconProvider(property["olo_gp"] as string)}
                  </div>
                </div>

                <div class="flex justify-between">Status City VN: 
                  <div class="rounded px-2 py-1 w-14 text-center inline-block text-white font-bold
                  ${property["status_city_vn"] === "win"
              ? "bg-green-400"
              : "bg-red-400"
            }">
                  ${(property["status_city_vn"] as string).toUpperCase()}
                  </div>
                    <div>
                    ${getIconProvider(property["olo_vn"] as string)}
                    </div>
                  </div>
                </div>
              `;
        }
      },
      {
        type: "line",
        id: "kabupaten-line",
        paint: {
          "line-color": "#000",
          "line-width": 0.3,
        },
      }
    ]
  }, [])

  return (
    <div
      className="md:w-full h-full bg-white/50 dark:bg-[#040C17]/90 backdrop-blur relative"
      ref={domRef}
    >
      <MapContainer
        height={620}
        mapOption={MapOptions}
        control={control}
        accessToken="pk.eyJ1Ijoic2hhZmFuYXVyYSIsImEiOiJjbDBjOG0xMW0xMGpzM2pycWdmMjI0NnF2In0.R5_vlGTN1R93lBpcUkNlFg"
      >
        <Geojson
          id="kabupaten"
          source={
            dataParser(
              kabupaten as any,
              "KABUPATEN",
              map as any,
              "kabupaten"
            ) as any
          }
        >
          <Layer
            layers={layers}
          />
        </Geojson>
        <div className="absolute left-0 top-1 px-1 flex 2xl:justify-center justify-start w-full">
          <Legend data={map} />
        </div>
        <div className="flex flex-col gap-1 items-center absolute bottom-1 left-0 w-full px-1 z-10">
          <AchievementChart data={okr} />
        </div>
      </MapContainer>
    </div>
  );
};

export default Map;

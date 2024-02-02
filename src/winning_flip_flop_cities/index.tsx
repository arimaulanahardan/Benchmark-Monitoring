import React, { useState, useCallback } from "react";
import WinningCitiesTableSummary from "./components/WinningCitiesTableSum";
import { useFetchData } from "./hooks/useFetchData";
import WinningCitiesTable from "./components/WinningCitiesTable";
import WinningCitiesSummary from "./components/WinningCitiesSummary";
import { useSelectFilter } from "../filter/hooks/useSelectFilter";
import { Skeleton } from "antd";
import Trend from "./components/Trend";
import { Slider } from "antd";
import { useSelector } from "react-redux";
import { State } from "../store";

interface WinningCitiesProps { }
const summaryList = [
  "Total Target Clearing Bad Sample",
  "Total Site To Clear",
  "Achivement Score [KPI] WOW",
];

const WinningCities: React.FC<WinningCitiesProps> = () => {
  const {
    chart,
    tableSummary,
    table,
    summary,
    loadingChart,
    loadingSummary,
    loadingTable,
    loadingTableSummary,
  } = useFetchData();
  const { kpi, cityflipflop } = useSelectFilter();
  const [chartTrend, setChartTrend] = useState<any>();
  const [chartScrollZoom, setChartScrollZoom] = useState<[number, number]>([
    0, 100,
  ]);
  const isDarkMode = useSelector<State, Boolean>(
    (state) => state.theme.isDarkMode
  );

  if (chartTrend)
    chartTrend.on("dataZoom", (params: any) => {
      setChartScrollZoom(params.batch[0].startValue);
    });

  const setChartTrendRef = useCallback((ref: any) => {
    setChartTrend(ref);
  }, []);

  if (!chart || !tableSummary || !table)
    return (
      <div className="p-12 bg-white dark:bg-[#343541] rounded-lg">
        <div className="pt-16 pb-16">
          <Skeleton active />
        </div>
        <div className="pt-16 pb-16">
          <Skeleton active />
        </div>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      <div className="md:col-span-2">
        <Trend
          data={chart}
          kpi={kpi}
          cityflipflop={cityflipflop}
          loading={loadingChart}
          setChartRef={setChartTrendRef}
          zoom={chartScrollZoom}
        >
          <div className="bg-white dark:bg-[#343541] rounded-full items-center mt-1">
            <div className="items-center flex">
              <h1 className="text-center md:text-sm text-xs font-semibold w-32 dark:text-white">Slider Chart :</h1>
              <div className="w-full px-4">
                <Slider
                  tooltip={{ formatter: null }}
                  railStyle={isDarkMode ? { backgroundColor: "white" } : { backgroundColor: "#343541" }}
                  range={{ draggableTrack: false }}
                  value={chartScrollZoom}
                  step={10}
                  onChange={(v: any) => {
                    setChartScrollZoom(v);
                  }}
                />
              </div>
            </div>
          </div>
        </Trend>
      </div>
      <div className="md:mt-0">
        <WinningCitiesTableSummary
          loading={loadingTableSummary}
          data={tableSummary}
          kpi={kpi}
        />
        <div className="mt-1">
          <WinningCitiesTable
            loading={loadingTable}
            data={table}
            status_win={tableSummary?.[0]?.status_win}
          />
        </div>
        <div className="mt-1 grid grid-cols-3 gap-1">
          {Object.entries(summary || {}).map(([key, value], index, arr) => (
            <WinningCitiesSummary
              key={key}
              loading={loadingSummary}
              name={summaryList[index]}
              value={value}
              showArrow={index === arr.length - 1}
              percentage={index === arr.length - 1}
              status_win={tableSummary?.[0]?.status_win}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WinningCities;

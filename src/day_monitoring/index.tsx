import React from "react";
import { useFetchData } from "./hooks/useFetchData";
import getLocation from "./utils/getLocations";
import { Skeleton } from "antd";
import MonitoringChart from "../common/components/MonitoringChart";

interface DayMonitoringProps { }

const DayMonitoring: React.FC<DayMonitoringProps> = () => {
  const { chart, loading } = useFetchData();
  const locationName = getLocation();

  if (!chart) {
    return (
      <div className="p-12 bg-white dark:bg-[#343541] rounded-lg">
        <div className="pt-16 pb-16">
          <Skeleton active />
        </div>
        <div className="pt-16 pb-16">
          <Skeleton active />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
          {chart?.kpi.map((kpi) => (
            <MonitoringChart
              key={kpi}
              id={kpi}
              kpi={kpi}
              series={chart.series[kpi]}
              category={chart.category}
              loading={loading}
              nameLocation={locationName}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DayMonitoring;

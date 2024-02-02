import React from "react";
import { IWinningCitiesTrend } from "../interfaces/WinningCitiesTrend";
import WinningCitiesChart from "./WinningCitiesChart";

interface TrendProps {
  data?: IWinningCitiesTrend;
  loading: boolean;
  kpi: string;
  cityflipflop: string;
  setChartRef?: (ref: any) => void;
  children?: React.ReactNode;
  zoom?: [number, number];
}

const Trend: React.FC<TrendProps> = ({
  data,
  kpi,
  cityflipflop,
  loading,
  setChartRef,
  children,
  zoom,
}) => {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-2 md:gap-1">
        {data?.operators.map((k, index) => (
          <WinningCitiesChart
            id={index.toString()}
            key={index}
            category={data.category}
            series={k.series}
            loading={loading}
            kpi={kpi}
            cityflipflop={cityflipflop}
            operator={k.name}
            setChartRef={setChartRef}
            zoom={zoom}
          />
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Trend;

import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../store";
import Chart from "../../common/components/Chart";
import { formatNumber } from "../utils/formatNumber";
import { getMinYAxis } from "../utils/getMinYAxis";
import { Skeleton } from "antd";
import { ISeries } from "../interfaces/MonitoringTrend";

interface MonitoringChartProps {
  id: string;
  kpi: string;
  series : ISeries[]; 
  category : string[];
  loading : boolean;
  nameLocation : string;
}

const MonitoringChart: React.FC<MonitoringChartProps> = ({
  id,
  kpi,
  series,
  category,
  loading,
  nameLocation,
}) => {
  const isDarkMode = useSelector<State, Boolean>(
    (state) => state.theme.isDarkMode
  );
  
  if (loading) {
    return (
      <div className="p-2 pt-4 pb-24 bg-white dark:bg-[#343541] rounded-lg relative top-1">
        <Skeleton active />
        <div className="pt-12 pb-12">
          <Skeleton active />
        </div>
      </div>
    );
  }

  return (
    <div className="pb-4 pt-2 px-2 bg-white dark:bg-[#343541] rounded-lg relative mt-2">
      <h1 className="h-[38px] bg-gradient-to-tl from-blue-50 to-blue-100 dark:from-[#292f38] dark:to-[#414C5E] dark:text-white rounded-lg flex items-center px-2 font-bold text-sm">
        {kpi.replace(/_/g, " ").toUpperCase()} - {nameLocation}
      </h1>
      <Chart
        id={id}
        height={"400px"}
        config={{
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          legend: {
            bottom: 0,
            textStyle: {
              color: isDarkMode ? "white" : "black",
            },
          },
          grid: {
            left: "8%",
            right: "3%",
            bottom: "20%",
            top: "5%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            name: "Week",
            nameLocation: "middle",
            nameGap: 70,
            axisLabel: {
              rotate: 45,
              color: isDarkMode ? "white" : "black",
            },
            nameTextStyle: {
              color: isDarkMode ? "white" : "black",
            },
            data: category,
          },
          yAxis: {
            type: "value",
            nameLocation: "middle",
            axisLabel: {
              color: isDarkMode ? "white" : "black",
              formatter: (value: number) => {
                return formatNumber(value);
              },
            },
            nameTextStyle: {
              color: isDarkMode ? "white" : "black",
              padding: 20,
            },
            name: "value",
            min: Math.floor(getMinYAxis(series)),
          },
          
          series: series.map((series) => ({
            ...series,
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
          })),
        }}
        
        dimensions={[]}
        source={[]}
      
      />
    </div>
  );
};

export default MonitoringChart;

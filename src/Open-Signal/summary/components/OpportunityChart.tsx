import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../../store";
import Chart from "../../../common/components/Chart";
import { transformChartSource } from "../../../common/utils/transformChartSource";
import { splitArrayWithRange } from "../../../common/utils/split-array-with-range";
import { IOpportunitySeries, IOpportunityTrend } from "../../../common/interfaces/OpportunityTrend";
import { Skeleton } from "antd";
import { getMinYAxis } from "../utils/getMinYAxis";

const id = "opportunity";

interface OpportunityChartProps {
    data : IOpportunityTrend[];
    loading: boolean;
}
const OpportunityChart: React.FC<OpportunityChartProps> = ({
    data,
    loading,
}) => {
  const isDarkMode = useSelector<State, boolean>(
    (state) => state.theme.isDarkMode
  );

  function getColorsSeriesName(seriesName: string) {
    switch (seriesName) {
      case "service win":
        return "#FFC107";
      case "service lose":
        return "#FF9800";
      default:
        return "#FF5722";
    }
  }
  
  if(loading)
  return (
    <div className="p-4 bg-white dark:bg-[#040C17] rounded-lg h-[620px] min-w-[427px]">
      <Skeleton 
      active
      paragraph={{ rows: 10 }}
      />
    </div>
  )
  return (
    <div
      className="
      p-2 
    bg-white
    dark:bg-[#040C17] 
      rounded-lg 
      h-full 
      min-w-[427px]"
    >
      <h1
        className="
        h-[38px] 
        bg-gradient-to-tl  
      from-blue-50 
      to-blue-100 
      dark:from-[#292f38] 
      dark:to-[#414C5E] 
      dark:text-white 
        rounded-lg flex items-center px-2 font-bold text-sm"
      >
        Opportunity For Improvement
      </h1>
      <Chart
        id={id}
        height={"90%"}
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
            top: "5%",
            left: "5px",
            right: "10%",
            bottom: "10%",
            containLabel: true,
          },
          xAxis: {
            type: "value",
            axisLabel: {
              color: isDarkMode ? "white" : "black",
            },
          },
          yAxis: {
            type: "category",
            data: data[0].category,
            axisLabel: {
              color: isDarkMode ? "white" : "black",
            },
            nameTextStyle: {
              color: isDarkMode ? "white" : "black",
            },
          },
          series: data?.[0]?.series?.map((series) => ({
            ...series,
            type: "bar",
            name: series.name,
            data: series.data,
            stack: "total",
            label: {
              show: true,
              // formatter: function (data) {
              //   const value = (data.value as any)[data.seriesName ?? ""];
              //   return value > 0 ? value : "";
              // },
            },
            color: getColorsSeriesName(series.name)
          })) 
        }} 
        dimensions={[]}
        source={[]}
      />
    </div>
  );
};

export default OpportunityChart;
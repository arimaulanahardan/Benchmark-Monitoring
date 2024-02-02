import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../store";
import Chart from "../../common/components/Chart";
import { useFetchData } from "../hooks/useFetchData";
import { formatNumber } from "../utils/formatNumber";
import { getMinYAxis } from "../utils/getMinYAxis";
import { Skeleton } from "antd";
import getLocation from "../utils/getLocations";
import { ISeriesFailContributorTrend } from "../interfaces/FailContributorTrend";

interface FailContributorChartSampleProps {
  id: string;
  kpi: string;
  operator: string[];
  typeData: string;
  period: string;
}

const FailContributorChartSample: React.FC<FailContributorChartSampleProps> = ({
  id,
  kpi,
  operator,
  typeData,
  period,
}) => {
  const isDarkMode = useSelector<State, Boolean>(
    (state) => state.theme.isDarkMode
  );

  const { chart, loading } = useFetchData(kpi, operator, typeData, period);
  const location = getLocation();


  if (loading || !chart) {
    return (
      <div className="h-[380px] mb-1 mt-2 bg-white dark:bg-[#343541] rounded-lg relative top-1">
        <div className="p-8">
          <Skeleton active
            paragraph={{ rows: 5 }} />
        </div>
      </div>
    );
  }
  const { category, series } = chart;

  return (
    <div className="pb-4 pt-2 px-2 bg-white dark:bg-[#343541] rounded-lg relative mt-2">
      <h1 className="h-[38px] bg-gradient-to-tl from-blue-50 to-blue-100 dark:from-[#292f38] dark:to-[#414C5E] dark:text-white rounded-lg flex items-center px-2 font-bold text-sm">
        {kpi.replace(/_/g, " ").toUpperCase()} - {location} - {operator.toString().toUpperCase()}
      </h1>
      <div className="p-2">
        <Chart
          id={id}
          height={"300px"}
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
              left: "10%",
              right: "9%",
              bottom: "20%",
              top: "5%",
              containLabel: true,
            },
            xAxis: {
              type: "category",
              name: "Week",
              nameLocation: "middle",
              nameGap: 50,
              axisLabel: {
                rotate: 45,
                color: isDarkMode ? "white" : "black",
              },
              nameTextStyle: {
                color: isDarkMode ? "white" : "black",
              },
              data: category,
            },
            yAxis: [
              {
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
                name: series[0]?.name ?? "samplematch",
                min: Math.floor(getMinYAxis(series)),
              },
            ],
            series:
              series.map((series) => ({
                name: series.name,
                type: "line",
                data: series.data,
                symbol: "circle",
                symbolSize: 10,
                smooth: true,
                color: series.color,
              })),
          }}
          dimensions={[]}
          source={[]}
        />
      </div>
    </div>
  );
};

export default FailContributorChartSample;

import React from "react";
import { Skeleton } from "antd";
import Chart from "../../common/components/Chart";
import { useFetchData } from "../hooks/useFetchData";
import { formatNumber } from "../utils/formatNumber";
import { useSelector } from "react-redux";
import { State } from "../../store";
import { getMinYAxis } from "../utils/getMinYAxis";

interface ContributorBadSampleChartProps {
  id: string;
  kpi: string;
}

const ContributorBadSampleChart: React.FC<ContributorBadSampleChartProps> = ({
  id,
  kpi,
}) => {
  const isDarkMode = useSelector<State, Boolean>(
    (state) => state.theme.isDarkMode
  );

  const { chart, loading } = useFetchData(kpi);

  if (loading) {
    return (
      <div className="p-2 pt-4 pb-24 bg-white dark:bg-[#343541] rounded-t-lg relative top-1">
        <Skeleton active />
        <div className="pt-12 pb-12">
          <Skeleton active />
        </div>
      </div>
    );
  }

  if (!chart) {
    return null;
  }

  const { category, series } = chart;

  return (
    <div className="p-2 pb-4 bg-white dark:bg-[#343541] rounded-lg relative top-1">
      <h1 className="h-[38px] bg-gradient-to-tl from-blue-50 to-blue-100 dark:from-[#292f38] dark:to-[#414C5E] dark:text-white rounded-lg flex items-center px-2 font-bold text-sm">
        {kpi.replace(/_/g, " ").toUpperCase()}
      </h1>
      <Chart
        id={id}
        height={"300px"}
        config={{
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
            formatter: (params: any) => {
              const qualityMatchList = ["good_quality_site"];
              let result = params[0].name + "<br>";
              params.forEach((param: any) => {
                const dataIndex = param.dataIndex;
                const selectedSeries = series.find(
                  (series) => series.name === param.seriesName
                );
                const percentage = selectedSeries?.percentage?.[dataIndex];
                result += `${param.marker} ${param.seriesName}: 
                <strong> 
                ${param.value}
                </strong>
                ${
                  !qualityMatchList.includes(param.seriesName) && percentage
                    ? ` (${percentage.toFixed(2)} %)`
                    : ``
                }<br>`;
              });

              return result;
            },
          },
          legend: {
            bottom: -5,
            textStyle: {
              color: isDarkMode ? "white" : "black",
            },
          },
          grid: {
            left: "6%",
            right: "7%",
            bottom: "20%",
            top: "5%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            name: "Week",
            nameLocation: "middle",
            nameGap: 44,
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
              name: "sample_quality_match_list",
              min: Math.floor(getMinYAxis(series)),
            },
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
                padding: 30,
              },
              name: series[series.length - 1]?.name ?? "samplematch",
              min: Math.floor(getMinYAxis(series)),
            },
          ],
          series: series.map((series) => ({
            ...series,
            type: series.name === "sample_quality_match_site" ? "bar" : "line",
            smooth: true,
            symbol: series.name === "good_quality_site" ? "circle" : "square",
            symbolSize: 8,
            yAxisIndex: series.name === "good_quality_site" ? 1 : 0,
          })),
        }}
        dimensions={[]}
        source={[]}
      />
    </div>
  );
};

export default ContributorBadSampleChart;

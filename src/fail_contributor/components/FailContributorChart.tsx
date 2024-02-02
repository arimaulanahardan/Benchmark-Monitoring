import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../store";
import { Chart, transformChartSource } from "@pt-neural-technologies-indonesia/react-echarts";
import { useFetchData } from "../hooks/useFetchData";
import { formatNumber } from "../utils/formatNumber";
import { getMinYAxis } from "../utils/getMinYAxis";
import { ConfigProvider, Select, Skeleton } from "antd";
import getLocation from "../utils/getLocations";
import { EChartsType, SeriesModel, EChartsOption } from "echarts";
import { ISeriesFailContributorTrend } from "../interfaces/FailContributorTrend";
import { getMinYAxisFromPercentage } from "../utils/getMinYAxisPercentage";

interface FailContributorChartProps {
  id: string;
  kpi: string;
  operator: string[];
  typeData: string;
  period: string;
  categoryData: string;
}


const FailContributorChart: React.FC<FailContributorChartProps> = ({
  id,
  kpi,
  operator,
  typeData,
  period,
  categoryData,
}) => {

  const isDarkMode = useSelector<State, Boolean>(
    (state) => state.theme.isDarkMode
  );
  const location = getLocation();
  const chartRef = useRef<EChartsType | null>(null);

  const { chart, loading } = useFetchData(kpi, operator, typeData, period);

  const [selectedItemsFirst, setSelectedItemsFirst] = useState<string[]>([]);
  const [selectedItemsSecond, setSelectedItemsSecond] = useState<string[]>([]);

  useMemo(() => {
    if (chart) {
      setSelectedItemsFirst(chart?.series[0]?.alias ? [chart?.series[0]?.alias] : []);
      setSelectedItemsSecond(chart?.series[1]?.alias ? [chart?.series[1]?.alias] : []);
    }
  }, [chart]);

  const filteredDataSelect = useMemo<ISeriesFailContributorTrend[]>(() => {
    chartRef.current?.clear();
    const filteredDataSeries = chart?.series.filter(item => selectedItemsFirst.includes(item.alias) || selectedItemsSecond.includes(item.alias)) ?? [];
    return filteredDataSeries;
  }, [selectedItemsFirst, selectedItemsSecond, chart]);

  const config = useMemo<EChartsOption>(() => {
    return ({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        formatter: (params: any) => {
          let result = params[0].name + "<br>";
          params.forEach((param: any) => {
            const dataIndex = param.dataIndex;
            const selectedSeries = filteredDataSelect.find((s) => s.name === param.seriesName);
            const percentage = selectedSeries?.percentage?.[dataIndex];
            const dataValue = selectedSeries?.data?.[dataIndex];
            if (categoryData === "Number") {
              result += `${param.marker} ${param.seriesName}: 
              <strong>
              ${param.value}
              </strong>
              ${percentage ? `(${percentage.toFixed(2)}%)` : "-"}
              <br>`;
            } else {
              result += `${param.marker} ${param.seriesName}: 
              <strong>
              ${percentage ? `${percentage.toFixed(2)}%` : ""}
              </strong>
              (${dataValue ? `${dataValue}` : "-"})
              <br>`;
            }
          });
          return result;
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
        bottom: "25%",
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
        data: chart?.category ?? [],
      },
      yAxis: [
        {
          type: "value",
          nameLocation: "middle",
          axisLabel: {
            color: isDarkMode ? "white" : "black",
            formatter: categoryData === "Percentage" ? (value: number) => {
              return `${value}%`
            } : (value: number) => {
              return formatNumber(value);
            },
          },
          nameTextStyle: {
            color: isDarkMode ? "white" : "black",
            padding: 30,
          },
          name: selectedItemsFirst.join(", "),
          min: categoryData === "Percentage" ? Math.floor(getMinYAxisFromPercentage(filteredDataSelect)) : Math.floor(getMinYAxis(filteredDataSelect)),
        },
        {
          type: "value",
          nameLocation: "middle",
          axisLabel: {
            color: isDarkMode ? "white" : "black",
            formatter: categoryData === "Percentage" ? (value: number) => {
              return `${value}%`
            } : (value: number) => {
              return formatNumber(value);
            },
          },
          nameTextStyle: {
            color: isDarkMode ? "white" : "black",
            padding: 30,
          },
          name: selectedItemsSecond.join(", "),
          min: categoryData === "Percentage" ? Math.floor(getMinYAxisFromPercentage(filteredDataSelect)) : Math.floor(getMinYAxis(filteredDataSelect)),
        },
      ],
      series: filteredDataSelect.map((series) => {
        return {
          ...series,
          data: categoryData === "Percentage" ? series.percentage : series.data,
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 10,
          yAxisIndex: selectedItemsSecond.includes(series.alias) ? 1 : 0,
        };
      }),
    })
  }, [isDarkMode, filteredDataSelect, categoryData]);

  if (loading || !chart) {
    return (
      <div className="h-[400px] mt-2 bg-white dark:bg-[#343541] rounded-lg relative top-1">
        <div className="p-8">
          <Skeleton active
            paragraph={{ rows: 5 }} />
        </div>
      </div>
    );
  }

  return (
    <div className="pb-4 pt-2 px-2 bg-white dark:bg-[#343541] rounded-lg relative mt-2">
      <h1 className="h-[38px] bg-gradient-to-tl from-blue-50 to-blue-100 dark:from-[#292f38] dark:to-[#414C5E] dark:text-white rounded-lg flex items-center px-2 font-bold text-sm">
        {kpi.replace(/_/g, " ").toUpperCase()} - {location} - {operator.toString().toUpperCase()}
      </h1>
      <div className="mt-2 flex justify-between items-center">

        <Select
          mode="multiple"
          maxTagCount="responsive"
          showSearch={false}
          style={{ width: 150 }}
          value={selectedItemsFirst}
          options={chart.series
            .filter(item => !selectedItemsSecond.includes(item.alias))
            .map(item => {
              return {
                label: item.name,
                value: item.alias,
              };
            })}
          onChange={(value) => setSelectedItemsFirst(value)}
        />

        <Select
          mode="multiple"
          maxTagCount="responsive"
          showSearch={false}
          style={{ width: 150 }}
          value={selectedItemsSecond}
          options={chart.series
            .filter(item => !selectedItemsFirst.includes(item.alias))
            .map(item => {
              return {
                label: item.name,
                value: item.alias,
              };
            })}
          onChange={(value) => setSelectedItemsSecond(value)}
        />
      </div>
      <div className="p-2">
        <Chart
          id={id}
          height={"350px"}
          config={config}
          dimensions={[]}
          source={[]}
          getInstance={(Chart) => {
            chartRef.current = Chart;
          }}
        />
      </div>
    </div >
  );
};

export default FailContributorChart;

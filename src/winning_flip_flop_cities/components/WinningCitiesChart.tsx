import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../store";
import { Skeleton } from "antd";
// import Chart from "../../common/components/Chart";
import { formatNumber } from "../utils/FormatNumber";
import { getMinYAxis } from "../utils/getMinYAxis";
import { ISeriesTrend } from "../interfaces/WinningCitiesTrend";
import ReactECharts, { EChartsOption } from "echarts-for-react";
import Telkomsel from "../../map/assets/Telkomsel.svg";
import XL from "../../map/assets/XL.svg";
import Indosat from "../../map/assets/Indosat.svg";
import Smartfren from "../../map/assets/Smartfren.svg";

interface WinningCitiesChartProps {
  id: string;
  category: string[];
  series: ISeriesTrend[];
  loading: boolean;
  kpi: string;
  cityflipflop: string;
  operator: string;
  setChartRef?: (ref: any) => void;
  zoom?: [number, number];
}

const WinningCitiesChart: React.FC<WinningCitiesChartProps> = ({
  id,
  category,
  series,
  loading,
  kpi,
  cityflipflop,
  operator,
  setChartRef,
  zoom,
}) => {
  const isDarkMode = useSelector<State, Boolean>(
    (state) => state.theme.isDarkMode
  );

  const getIconProvider = (provider: string) => {
    switch (provider) {
      case "Tsel":
        return <img src={Telkomsel} className="w-8 h-8" alt="Tsel" />;
      case "XL":
        return <img src={XL} className="w-8 h-8" alt="XL" />;
      case "IoH":
        return <img src={Indosat} className="w-20" alt="IoH" />;
      case "Smartfren":
        return <img src={Smartfren} className="w-8 h-8" alt="Smartfren" />;
      default:
        return null;
    }
  };
  
  const getColorForSeries = (seriesName: string): string => {
    if (seriesName.includes("Upper")) {
      return "#5FC223";
    } else if (seriesName.includes("Lower")) {
      return "#FF5252";
    } else if (seriesName.includes("Moving Avg")) {
      return "#FFC531";
    } else if (seriesName.includes("Data")) {
      return "#23A1C2";
    }
    return "";
  };

  const getSymbolType = (seriesName: string): string => {
    if (seriesName.startsWith("Moving Avg")) {
      return "square";
    }
    return "circle";
  };

  const getSymbolSize = (seriesName: string): number => {
    if (seriesName.startsWith("Upper") || seriesName.startsWith("Lower")) {
      return 0;
    }
    return 5;
  };

  const getLineStyleType = (seriesName: string): string => {
    if (seriesName.startsWith("Upper") || seriesName.startsWith("Lower")) {
      return "dashed";
    }
    return "solid";
  };

  const [chart, setChart] = useState<EChartsOption>({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      bottom: 0,
    },
    grid: {
      left: "6%",
      right: "7%",
      bottom: "25%",
      top: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "Week",
      nameLocation: "middle",
      nameGap: 50,
    },
    yAxis: {
      type: "value",
      nameLocation: "middle",
    },
    dataZoom: [
      {
        show: false,
        type: "inside",
        ...(zoom
          ? {
            start: zoom[0],
            end: zoom[1],
          }
          : null),
      },
      {
        show: false,
      },
    ],
    series: [],
  });

  useEffect(() => {
    setChart({
      ...chart,
      xAxis: {
        ...(chart.xAxis as any),
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
            padding: 13,
          },
          name: series[series.length - 2]?.name ?? "Moving Avg %",
          min: Math.floor(getMinYAxis(series)),
        },
      ],
      legend: {
        ...chart.legend,
        textStyle: {
          color: isDarkMode ? "white" : "black",
        },
      },
      dataZoom: [
        {
          type: "inside",
          ...(zoom
            ? {
              start: zoom[0],
              end: zoom[1],
            }
            : null),
        },
      ],
      series: series.map((seriesItem) => ({
        ...seriesItem,
        type: "line",
        smooth: true,
        itemStyle: {
          color: getColorForSeries(seriesItem.name),
        },
        symbol: getSymbolType(seriesItem.name),
        symbolSize: getSymbolSize(seriesItem.name),
        lineStyle: {
          type: [
            "Upper IoH",
            "Upper Tsel",
            "Upper XL",
            "Upper Smartfren",
            "Lower IoH",
            "Lower Tsel",
            "Lower XL",
            "Lower Smartfren",
          ].includes(seriesItem.name)
            ? "dashed"
            : "solid",
        },
      })),
    });
  }, [series, zoom, isDarkMode, category]);

  if (loading) {
    return (
      <div className="p-2 bg-white dark:bg-[#343541] rounded-lg">
        <div className="p-4">
          <Skeleton active />
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 bg-white dark:bg-[#343541] rounded-lg">
      <div className="bg-red-600 bg-gradient-to-tl from-blue-50 to-blue-100 dark:from-[#292f38] dark:to-[#414C5E] rounded-lg overflow-hidden flex items-center">
        <h2 className="font-bold dark:text-white text-xs p-1 w-full">
          {operator.replace(/_/g, " ").toUpperCase()} -{" "}
          {kpi.replace(/_/g, " ").toUpperCase()} - {cityflipflop}
        </h2>
        <div className="p-1 flex">{getIconProvider(operator)}</div>
      </div>
      <ReactECharts
        option={chart}
        style={{ height: "300px" }}
        notMerge={true}
        lazyUpdate={true}
        onChartReady={(instance) => {
          setChartRef && setChartRef(instance);
        }}
      />
    </div>
  );
};

export default WinningCitiesChart;

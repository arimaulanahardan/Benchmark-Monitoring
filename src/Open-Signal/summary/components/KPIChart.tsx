import React from "react";
import { ITrend } from "../../../common/interfaces/Trend";
import { useSelector } from "react-redux";
import { State } from "../../../store";
import { getMinYAxis } from "../utils/getMinYAxis";
import Chart from "../../../common/components/Chart";
import { transformChartSource } from "../../../common/utils/transformChartSource";
import { useFetchDataKPI } from "../hooks/useFetchDataKPI";
import { getKPIColorInsight } from "../utils/kpi-color";
import { Skeleton } from "antd";
import { getSeriesAttributes } from "../utils/getAtributesSeriesName";
// import { Button } from "antd";
// import { DownloadOutlined } from "@ant-design/icons";
// import { useFetchDownloadCsv } from "../hooks/useFetchDownloadCsv";

interface KPIChartProps {
  id: string;
  kpi: string;
}

const KPIChart: React.FC<KPIChartProps> = ({ 
  id,
  kpi 
}) => {
  // const { downloadCsv } = useFetchDownloadCsv(kpi);
  const { chart, loading } = useFetchDataKPI(kpi);
  const isDarkMode = useSelector<State, boolean>(
    (state) => state.theme.isDarkMode
  );

  if(!chart) return null;
  const { category, series, summary } = chart;

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
    <div className="p-3x pb-6 bg-white dark:bg-[#343541] rounded-lg relative top-1">
      <div className="h-[38px] flex items-center bg-gradient-to-tl from-blue-50 to-blue-100 dark:from-[#292f38] dark:to-[#414C5E] rounded-lg">
        <h1 className="w-full dark:text-white px-2 font-bold text-sm">
        <p className="text-sm">
            {`${summary.kpi} (${summary.unit}), Ach: `}
            <span
              className={`font-bold ${getKPIColorInsight(
                summary.kpi,
                summary.deviation
              )}`}
            >{`${summary.ach.toFixed(2)} (${
              summary.deviation > 0 ? "+" : ""
            }${summary.deviation.toFixed(2)})`}</span>
          </p>
        </h1>
        {/* <div className="p-2">
          <Button
            aria-label="download-csv"
            icon={<DownloadOutlined />}
            onClick={downloadCsv}
          />
        </div> */}
      </div>
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
            top: "5%",
            left: "5%",
            right: "5%",
            bottom: "20%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            name: "Week",
            nameLocation: "middle",
            nameGap: 52,
            axisLabel: {
              rotate: 90,
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
            },
            nameTextStyle: {
              color: isDarkMode ? "white" : "black",
            },
            name: summary.unit,
            min: Math.floor(getMinYAxis(series) - 1),
            nameGap:
              (series?.[0].data?.[0]?.toString()?.length ?? 0) * 10 + 5,
          },
          series: series.map((s) => ({
            ...s,
            type: "line",
            smooth: true,
            symbolSize: 10,
            data :s.data,
            color: getSeriesAttributes(s.name).color,
            symbol: getSeriesAttributes(s.name).symbol,
          }))
        }}

        dimensions={[
          // "yearweek",
          // "Telkomsel",
          // "XL",
          // "Indosat Ooredoo + 3",
          // "Smartfren",
        ]}
        source={[]}
        // source={transformChartSource(data, "yearweek")}
      />
    </div>
  );
};

export default KPIChart;


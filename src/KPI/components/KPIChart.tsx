import React from "react";
import { ITrend } from "../../common/interfaces/Trend";
import { useSelector } from "react-redux";
import { State } from "../../store";
import { getMinYAxis } from "../utils/getMinYAxis";
import Chart from "../../common/components/Chart";
import { transformChartSource } from "../../common/utils/transformChartSource";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useFetchDownloadCsv } from "../hooks/useFetchDownloadCsv";

interface KPIChartProps {
  id: string;
  kpi: string;
  data: ITrend;
  title: string | React.ReactNode;
  unit: string;
}

const KPIChart: React.FC<KPIChartProps> = ({ id, data, title, unit, kpi }) => {
  const { downloadCsv } = useFetchDownloadCsv(kpi);
  const isDarkMode = useSelector<State, boolean>(
    (state) => state.theme.isDarkMode
  );

  return (
    <div className="p-3x` pb-6 bg-white dark:bg-[#343541] rounded-t-lg relative top-1">
      <div className="h-[38px] flex items-center bg-gradient-to-tl from-blue-50 to-blue-100 dark:from-[#292f38] dark:to-[#414C5E] rounded-lg">
        <h1 className="w-full dark:text-white px-2 font-bold text-sm">
          {title}
        </h1>
        <div className="p-2">
          <Button
            aria-label="download-csv"
            icon={<DownloadOutlined />}
            onClick={downloadCsv}
          />
        </div>
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
            name: unit,
            min: Math.floor(getMinYAxis(data.series) - 1),
            nameGap:
              (data.series?.[0].data?.[0]?.toString()?.length ?? 0) * 10 + 5,
          },
          series: [
            {
              name: "Telkomsel",
              type: "line",
              smooth: true,
              color: "#e21542",
              symbol: "triangle",
              symbolSize: 10,
            },
            {
              name: "XL",
              type: "line",
              smooth: true,
              color: "#44adff",
              symbol: "square",
              symbolSize: 10,
            },
            {
              name: "Indosat Ooredoo + 3",
              type: "line",
              smooth: true,
              color: "#f0cb01",
              symbol: "circle",
              symbolSize: 10,
            },
            {
              name: "Smartfren",
              type: "line",
              smooth: true,
              color: "#FD56D8",
              symbol: "diamond",
              symbolSize: 10,
            },
          ],
        }}
        dimensions={[
          "yearweek",
          "Telkomsel",
          "XL",
          "Indosat Ooredoo + 3",
          "Smartfren",
        ]}
        source={transformChartSource(data, "yearweek")}
      />
    </div>
  );
};

export default KPIChart;

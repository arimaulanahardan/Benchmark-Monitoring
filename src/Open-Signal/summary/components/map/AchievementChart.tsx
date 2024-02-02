import React from "react";
import Chart from "../../../../common/components/Chart";
import { useSelector } from "react-redux";
import { State } from "../../../../store";
import { IOKRTrend } from "../../interfaces/OKRTrend";
import { transformChartSource } from "../../../../common/utils/transformChartSource";
import { getMinYAxis } from "../../utils/get-min-yAxis";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
// import { useFetchDownloadOkr } from "../hooks/useFetchDownloadOkr";

interface AchievementChartProps {
  data: IOKRTrend | undefined;
}

const AchievementChart: React.FC<AchievementChartProps> = ({ data }) => {
  const isDarkMode = useSelector<State, boolean>(
    (state) => state.theme.isDarkMode
  );
  // const { downloadCsvOkr } = useFetchDownloadOkr();

  return (
    <div className="w-full dark:bg-[#323647] dark:text-white bg-white/30 text-black backdrop-blur-xl shadow-card rounded-lg">
      <Chart
        id="map-achievement-chart"
        config={{
          title: {
            text: `Trend Achievement OKR (Latest OKR: ${Math.round(
              parseFloat(data?.summary.latest_okr ?? "0")
            )})`,
            textStyle: {
              fontSize: 16,
              color: isDarkMode ? "white" : "black",
            },
          },
          tooltip: {
            trigger: "axis",
          },
          grid: {
            top: "25%",
            left: "3%",
            right: "3%",
            bottom: "10%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              color: isDarkMode ? "white" : "black",
              rotate: 45,
            },
          },
          yAxis: {
            axisLabel: {
              color: isDarkMode ? "white" : "black",
            },
            min: getMinYAxis(data?.series),
          },
          series: [
            {
              type: "line",
              smooth: true,
              color: "#e21542",
              showSymbol: false,
            },
            {
              type: "line",
              smooth: true,
            },
          ],
        }}
        height={150}
        dimensions={["yearweek", "target", "rate_win"]}
        source={data ? transformChartSource(data, "yearweek") : []}
      />
      {/* <Button
        aria-label="download-csv"
        className="p-0"
        icon={<DownloadOutlined />}
        style={{
          position: "absolute",
          top: 5,
          right: 10,
          width: "25px",
          height: "25px",
        }}
        onClick={downloadCsvOkr}
      /> */}
    </div>
  );
};

export default AchievementChart;

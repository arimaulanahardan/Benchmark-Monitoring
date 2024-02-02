import useComponentSize from "@rehooks/component-size";
import { EChartsType, init, EChartsOption } from "echarts";
import React, { useEffect, useRef } from "react";

interface ChartProps {
  id: string;
  height: string | number;
  config: EChartsOption;
  dimensions: string[];
  source: any[];
}

const Chart: React.FC<ChartProps> = ({
  id,
  height,
  config,
  dimensions,
  source,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const chartInstance = useRef<EChartsType | null>(null);
  const componentSize = useComponentSize(chartRef);

  useEffect(() => {
    const domElement = document.getElementById(id);
    if (!domElement || !isFirstRender.current) return;

    const chart = init(domElement);
    chartInstance.current = chart;

    return () => {
      isFirstRender.current = false;
    };
  }, []);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.resize();
    }
  }, [componentSize]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.setOption({
        ...config,
        dataset: {
          dimensions,
          source,
        },
      });
    }
  }, [config, dimensions, source]);

  return <div id={id} style={{ width: "100%", height}} ref={chartRef}></div>;
};

export default Chart;

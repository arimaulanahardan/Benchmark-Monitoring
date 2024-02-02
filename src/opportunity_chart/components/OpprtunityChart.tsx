import { useState, useMemo, useRef } from "react";
import { Radio, Button } from "antd";
import { IOpportunitySeries, IOpportunityTrend } from "../interfaces/useTrendOpportunity";
import { Chart, transformChartSource } from "@pt-neural-technologies-indonesia/react-echarts";
import { useSelector } from "react-redux";
import { State } from "../../store";
import { EChartsOption, EChartsType } from "echarts";
import { splitArrayWithRange } from "../../common/utils/split-array-with-range";
import { DownloadOutlined } from "@ant-design/icons";
import { useFetchData } from "../hooks/useFetchData";
import { useSelectFilter } from "../../filter/hooks/useSelectFilter";

interface OpportunityChartProps {
    data: IOpportunityTrend;
}

const nameFilter = {
    'Lose One KPI': ['Lose Game Score', 'Lose Video Score', 'Lose Good Quality'],
    'Lose Two KPI': ['Lose Good Quality and Game Score', 'Lose Game Score and Video Score', 'Lose Good Quality and Video Score'],
    'Lose All': ['Lose All']
};

const colors: { [key: string]: string } = {
    'Lose Game Score': '#13315C',
    'Lose Video Score': '#F0CB01',
    'Lose Good Quality': '#757575',
    'Lose Good Quality and Game Score': '#2E5B9D',
    'Lose Game Score and Video Score': '#F4DE66',
    'Lose Good Quality and Video Score': '#969494',
    'Lose All': '#FF5252',
};

const OpportunityChart1: React.FC<OpportunityChartProps> = ({ data }) => {

    const { yearweek } = useSelectFilter();
    const { downloadOpportunityCsv } = useFetchData();
    const handleDownloadClick = () => {
        downloadOpportunityCsv(yearweek.toString(), data.category, data.series);
    };

    const [option, setOption] = useState<'Lose One KPI' | 'Lose Two KPI' | 'Lose All'>('Lose One KPI');

    const chartRef = useRef<EChartsType | null>(null);

    const filteredData = useMemo<IOpportunitySeries[]>(() => {
        chartRef.current?.clear();
        const filteredDataSeries = data.series.filter(item => nameFilter[option].includes(item.name));
        return filteredDataSeries;
    }, [option, data]);

    const isDarkMode = useSelector<State, boolean>(
        (state) => state.theme.isDarkMode);

    const config = useMemo<EChartsOption>(() => {
        return ({
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow",
                },
                formatter: (e: any) => {
                    const title = e?.[0].axisValue;
                    return `
                    <div style="min-width: 150px">
                      <h1 class="font-bold">${title}</h1>
                      <div class="mt-2 flex flex-col gap-2 w-full">
                      ${e.map((series: any, index: number) => {
                        const color = series.color;
                        const seriesName = series.seriesName;
                        const seriesValue = series.data;
                        const cities: any[] = (filteredData?.find((itemSeries) => itemSeries.name === e[index].seriesName)?.cities[e[0].dataIndex] ?? []) as any[];
                        return `
                          <div class="w-full flex items-center gap-2" style="flex-wrap: wrap">
                            <div class="w-3 h-3 rounded-full" style="background-color: ${color}"></div>
                            <span>${seriesName} :</span>
                            <span class="font-bold">${seriesValue}</span>
                            <div class="flex gap-2 justify-between" style="flex-basis: 100%; flex-wrap: nowrap;">
                            ${splitArrayWithRange(cities, 5).map((col) => {
                            return `
                                <div>
                                  <ul class="bullet-point" style="display: inline">
                                  ${col.map((row: string) => `
                                  <li>${row}</li>`).join("")}
                                  <ul>
                                </div>`;
                        }).join("")}
                            </div>
                          </div>`;
                    }).join("")}
                      </div>
                    </div>
                  `;
                },
            },
            legend: {
                bottom: 0,
                textStyle: {
                    color: isDarkMode ? "white" : "black",
                },
            },
            grid: {
                top: "2%",
                left: "5px",
                right: "5%",
                bottom: "15%",
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
                data: data.category,
                axisLabel: {
                    color: isDarkMode ? "white" : "black",
                },
                nameTextStyle: {
                    color: isDarkMode ? "white" : "black",
                },
            },
            series: filteredData?.map((item) => {
                return {
                    name: item.name,
                    type: "bar",
                    stack: "total",
                    data: item.data,
                    label: {
                        show: true,
                        formatter: function (data) {
                            const value = (data.value ?? 0) as number;
                            return value > 0 ? value.toString() : "";
                        },
                    },
                    itemStyle: {
                        color: colors[item.name as keyof typeof colors],
                    },
                };
            }),
        });
    }, [isDarkMode, filteredData, data]);

    return (
        <div className="p-2 md:w-[450px] w-full h-full bg-white dark:bg-[#040C17] rounded-lg relative">
            <div className="h-[38px] bg-gradient-to-tl from-blue-50 to-blue-100 dark:from-[#292f38] dark:to-[#414C5E] rounded-lg flex items-center">
                <h1 className="w-full dark:text-white px-2 font-bold text-sm">Opportunity For Improvement</h1>
                <div className="p-1">
                    <Button
                        aria-label="download-csv"
                        icon={<DownloadOutlined />}
                        style={{ width: "40px" }}
                        onClick={handleDownloadClick}
                    />
                </div>
            </div>
            <div>
                <Radio.Group
                    onChange={(e) => setOption(e.target.value)}
                    value={option}
                    buttonStyle="solid"
                    style={{
                        marginTop: "10px",
                    }}
                    className="flex flex-row justify-end"
                >
                    <Radio.Button value="Lose One KPI">Lose One KPI</Radio.Button>
                    <Radio.Button value="Lose Two KPI">Lose Two KPI</Radio.Button>
                    <Radio.Button value="Lose All">Lose All</Radio.Button>
                </Radio.Group>
            </div>
            <div className="w-full h-[500px] md:w-[90%] xl:w-[90%] mx-auto mt-2">
                <Chart
                    id="opportunity1"
                    height={"90%"}
                    config={config}
                    dimensions={[]}
                    source={
                        transformChartSource(
                            data as any,
                            "region",
                            "cities"
                        ) as any
                    }
                    getInstance={(Chart) => {
                        chartRef.current = Chart;
                    }}
                />
            </div>
        </div>
    );
};

export default OpportunityChart1;

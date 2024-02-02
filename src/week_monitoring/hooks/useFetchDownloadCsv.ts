import { useCallback } from "react";
import { ISeries } from "../../common/interfaces/MonitoringTrend";
import { WeekMonitoringService } from "../services/WeekMonitoringService";
import { useSelectFilter } from "../../filter/hooks/useSelectFilter";
import { useSelector } from "react-redux";
import { State } from "../../store";
import { saveAs } from 'file-saver';
import { useFetchData } from "../../filter/hooks/useFetchData";

const service = new WeekMonitoringService();

export function useFetchDownloadCsv() {
    const {citiesWeekMonitorings} = useFetchData();
    const { startWeekMonitoring, endWeekMonitoring, levelWeekMonitoring, regionWeekMonitoring, citiesWeekMonitoring } = useSelectFilter();

    const locationNameLable = citiesWeekMonitorings.flatMap((location) => location.options).find((ID)=>ID.value === citiesWeekMonitoring[0])?.label;

    const isDarkMode = useSelector<State, boolean>((state) => state.theme.isDarkMode);

    const downloadCsv = useCallback(async () => {
        try {
            const res = await service.getChart({
                startWeek: startWeekMonitoring,
                endWeek: endWeekMonitoring,
                level: levelWeekMonitoring,
                regions: levelWeekMonitoring === "region" ? regionWeekMonitoring : undefined,
                cities: levelWeekMonitoring === "kabupaten" ? citiesWeekMonitoring : undefined,
                typecolor: isDarkMode ? "dark" : "light",
            });

            const convertArraytoCsv = (obj: { [key: string]: ISeries[] }, category: string[]) => {
                const keys = Object.keys(obj);
                const headerRow = ["Date", "Level", "Locations", "OperatorName", "nameKPI", "Value"].join(",");
                const dataRows: string[] = [];

                keys.forEach((key) => {
                    const operatorNames = obj[key].map((series) => series.name);
                    const datas = obj[key].map((series) => series.data);

                    operatorNames.forEach((operatorName, index) => {
                        const dataPerOperator = datas[index];
                        for (let i = 0; i < dataPerOperator.length; i++) {
                            let nameLevelMonitoring;
                            if (levelWeekMonitoring === "region") {
                                nameLevelMonitoring = regionWeekMonitoring;
                            } else if (levelWeekMonitoring === "kabupaten") {
                                nameLevelMonitoring = locationNameLable;
                            } else {
                                nameLevelMonitoring = "nations";
                            }
                            const rowData = [
                                category[i],
                                levelWeekMonitoring,
                                nameLevelMonitoring,
                                operatorName,
                                key,
                                dataPerOperator[i],
                            ];
                            dataRows.push(rowData.join(","));
                        }
                    });
                });

                const csvString = [headerRow, ...dataRows].join("\n");
                return csvString;
            };

            function getFileName() {
                let fileName = `Week-Monitoring_(${startWeekMonitoring}-${endWeekMonitoring})`;
                if (levelWeekMonitoring === "nationwide") {
                    fileName = `${fileName}_nationwide.csv`;
                } else if (levelWeekMonitoring === "region") {
                    fileName = `${fileName}_Locations_${regionWeekMonitoring}.csv`;
                } else if (levelWeekMonitoring === "kabupaten") {
                    fileName = `${fileName}_Locations_${locationNameLable}.csv`;
                } else {
                    fileName = fileName + ".csv";
                }
                return fileName;
            }

            const chartData = res.data.data;
            const data = convertArraytoCsv(chartData.series, chartData.category);
            const blob = new Blob([data], { type: "text/csv;charset=utf-8" });
            saveAs(blob, getFileName(), { autoBom: true });

        } catch (err) {
            console.error(err);
        }
    }, [startWeekMonitoring, endWeekMonitoring, levelWeekMonitoring, regionWeekMonitoring, citiesWeekMonitoring, isDarkMode]);

    return {
        downloadCsv,
    };
}
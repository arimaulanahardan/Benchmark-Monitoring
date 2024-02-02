import { useCallback } from "react";
import { ISeries } from "../../common/interfaces/MonitoringTrend";
import { DayMonitoringService } from "../services/DayMonitoringService";
import { useSelectFilter } from "../../filter/hooks/useSelectFilter";
import { useSelector } from "react-redux";
import { State } from "../../store";
import dayjs from "dayjs";
import { saveAs } from "file-saver";

const service = new DayMonitoringService();

export function useFetchDownloadCsv() {
  const { dateString, dateStringStart, levelDayMonitoring, regionDayMonitoring, citiesDayMonitoring } = useSelectFilter();

  const isDarkMode = useSelector<State, boolean>((state) => state.theme.isDarkMode);

  const downloadCsv = useCallback(async () => {
    try {
      const res = await service.getChart({
        startDate: dayjs(dateStringStart).format("YYYY-MM-DD"),
        endDate: dayjs(dateString).format("YYYY-MM-DD"),
        level: levelDayMonitoring,
        regions: levelDayMonitoring === "region" ? regionDayMonitoring : undefined,
        cities : levelDayMonitoring === "kabupaten" ? citiesDayMonitoring : undefined,
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
              for(let i = 0; i < dataPerOperator.length; i++) {
                const rowData = [
                  category[i],
                  levelDayMonitoring,
                  levelDayMonitoring === "region" ? regionDayMonitoring : "nations",
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

      function getFileName (){
        let fileName = `Day-Monitoring_${dateString}`;
        if (levelDayMonitoring === "nationwide") {
          fileName = `${fileName}_nationwide.csv`;
        } else if (levelDayMonitoring === "region") {
          fileName = `${fileName}_Locations_${regionDayMonitoring}.csv`;
        } else {
          fileName = fileName + ".csv";
        }
        return fileName;
      }

      const data = convertArraytoCsv(res.data.data.series, res.data.data.category);
      const blob = new Blob([data], { type: "text/csv;charset=utf-8" });
      saveAs(blob, getFileName() , { autoBom: true });

    } catch (err) {
      console.error(err);
    }
  }, [dateString, dateStringStart, regionDayMonitoring, levelDayMonitoring, citiesDayMonitoring,  isDarkMode]);

  return {
    downloadCsv,
  };
}

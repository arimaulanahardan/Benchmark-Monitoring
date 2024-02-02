import { useCallback, useEffect, useState } from "react";
import { KPIService } from "../services/KPIService";
import { IKpiTrend } from "../interfaces/KpiTrend";
import { useSelectFilter } from "../../filter/hooks/useSelectFilter";
import { saveAs } from 'file-saver';

const service = new KPIService();

export function useFetchDownloadCsv(kpi: string) {
  const { yearweek } = useSelectFilter();

  const downloadCsv = useCallback(async () => {
    try {
      const res = await service.getChart({
        kpi,
        yearweek
      });

      const convertArraytoCsv = (trend: IKpiTrend) => {
        
        const headerRow = ["YearWeek", "Operator", "NameKPI", "Data"].join(",");
        const dataRows: string[] = [];

        trend.series.forEach((series) => {
          const datas = series.data
          for (let i = 0; i < datas.length; i++) {
            const rowData = [
              trend.category[i],
              series.name,
              trend.summary.kpi,
              datas[i].toString(),
            ];
            dataRows.push(rowData.join(","));
          }
        });

        const csvString = [headerRow, ...dataRows].join("\n");
        return csvString;
      };

      const data = convertArraytoCsv(res.data.data);
      const blob = new Blob([data], { type: "text/csv;charset=utf-8" });
      saveAs(blob, `KpiTrendChart_${kpi}_${yearweek}`, { autoBom: true });

    } catch (err) {
      console.error(err);
    }
  }, [yearweek]);

  return {
    downloadCsv,
  };
}

import { useCallback, useState } from 'react';
import { IOKRTrend } from '../interfaces/OKRTrend';
import { MapService } from '../services/MapService';
import { saveAs } from 'file-saver'; 
import { useSelectFilter } from '../../filter/hooks/useSelectFilter';

const service = new MapService();

export function useFetchDownloadOkr() {
    const { yearweek } = useSelectFilter();
    const downloadCsvOkr = useCallback(async () => {
        try {
            const res = await service.getOKRNation();           
            const convertArraytoCsv = (trend: IOKRTrend) => {
                const headerRow = ["YearWeek", "Name Series", "Data"].join(",");
                const dataRows: string[] = [];

                trend.series.forEach((series) => {
                    const datas = series.data
                    for (let i = 0; i < datas.length; i++) {
                        const rowData = [
                            trend.category[i],
                            series.name,
                            datas[i].toString(),
                        ];
                        dataRows.push(rowData.join(","));
                    }
                })
                const csvString = [headerRow, ...dataRows].join("\n");
                return csvString;

            };
            const data = convertArraytoCsv(res.data.data);
            const blob = new Blob([data], { type: "text/csv;charset=utf-8" });
            saveAs(blob, `Trend Achievement_${yearweek}`, { autoBom: true });

        } catch (error) {
            console.error(error);
        }
    }, [yearweek]);
    
    return { downloadCsvOkr };
}

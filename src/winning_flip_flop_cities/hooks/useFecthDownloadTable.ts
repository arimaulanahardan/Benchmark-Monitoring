import { useCallback } from 'react';
import { useSelectFilter } from '../../filter/hooks/useSelectFilter';
import { WinningCitiesService } from '../service/WinningCitiesService';
import { saveAs } from 'file-saver';

const service = new WinningCitiesService();

export function useFetchDownloadFlipFlopTable() {
    const { kpi, yearweek, cityflipflop } = useSelectFilter();
    const downloadFlipFlopTable = useCallback(async () => {
        try {
            const res = await service.getTable({
                kpi: kpi,
                yearweek: yearweek,
                city: cityflipflop
            });
            const csvHeader = Object.keys(res.data.data[0]).join(',');
            const csvRows = res.data.data.map(row => {
                const modifiedFunnelingIssue = row.funneling_issue.replace(/,/g, '|');
                const newRow = { ...row, funneling_issue: modifiedFunnelingIssue };
                return Object.values(newRow).join(',');
            });
            const csvData = [csvHeader, ...csvRows].join('\n');
            const blob = new Blob([csvData], { type: 'text/csv' });
            saveAs(blob, `${kpi}_${yearweek}_${cityflipflop}_WinningFlipFlop.csv`);
        } catch (err) {
            console.error(err);
        }
    }, [yearweek, cityflipflop, kpi]);

    return {
        downloadFlipFlopTable,
    };
}
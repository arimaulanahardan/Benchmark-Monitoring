import { useCallback, useEffect, useState } from "react";
import { useSelectFilter } from "../../../filter/hooks/useSelectFilter";
import { SummaryService } from "../services/SummaryService";
import { IKpiTrend } from "../interfaces/KpiTrend";
// import { IKpiInsight } from "../interfaces/KpiInsight";
// import { IKpiTable } from "../interfaces/KpiTable";

const service = new SummaryService();

export function useFetchDataKPI(
    kpi: string
) {
    const [chart, setChart] = useState<IKpiTrend>();
    // const [insight, setInsight] = useState<IKpiInsight>();
    // const [table, setTable] = useState<IKpiTable[]>();
    const { yearweekOpenSignal } = useSelectFilter();
    const [loading, setLoading] = useState(false);

    const fetchKPIChart = useCallback(async () => {
        try {
            setLoading(true);
            const res = await service.getChart({ kpi, yearweek : yearweekOpenSignal });
            setChart(res.data.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    }, [yearweekOpenSignal]);

    //   const fetchKPIInsight = useCallback(async () => {
    //     try {
    //       const res = await service.getInsight({ kpi, yearweek });
    //       setInsight({
    //         ...res.data.data,
    //         total_city_win: Math.round(res.data.data.total_city_win),
    //       });
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   }, [yearweek]);

    //   const fetchKPITable = useCallback(async () => {
    //     try {
    //       const res = await service.getTable({ kpi, yearweek });
    //       setTable(res.data.data);
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   }, [yearweek]);

    useEffect(() => {
        fetchKPIChart();
    }, [fetchKPIChart]);

    // useEffect(() => {
    //     fetchKPIInsight();
    // }, [fetchKPIInsight]);

    //   useEffect(() => {
    //     fetchKPITable();
    //   }, [fetchKPITable]);

    return {
        chart,
        loading
        // insight,
        // table,
    };
}
import { useCallback, useEffect, useState } from "react";
import { KPIService } from "../services/KPIService";
import { IKpiTrend } from "../interfaces/KpiTrend";
import { IKpiInsight } from "../interfaces/KpiInsight";
import { IKpiTable } from "../interfaces/KpiTable";
import { useSelectFilter } from "../../filter/hooks/useSelectFilter";

const service = new KPIService();

export function useFetchData(kpi: string) {
  const [chart, setChart] = useState<IKpiTrend>();
  const [insight, setInsight] = useState<IKpiInsight>();
  const [table, setTable] = useState<IKpiTable[]>();
  const { yearweek } = useSelectFilter();

  const fetchKPIChart = useCallback(async () => {
    try {
      const res = await service.getChart({ kpi, yearweek });
      setChart(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [yearweek]);

  const fetchKPIInsight = useCallback(async () => {
    try {
      const res = await service.getInsight({ kpi, yearweek });
      setInsight({
        ...res.data.data,
        total_city_win: Math.round(res.data.data.total_city_win),
      });
    } catch (err) {
      console.error(err);
    }
  }, [yearweek]);

  const fetchKPITable = useCallback(async () => {
    try {
      const res = await service.getTable({ kpi, yearweek });
      setTable(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [yearweek]);

  useEffect(() => {
    fetchKPIChart();
  }, [fetchKPIChart]);

  useEffect(() => {
    fetchKPIInsight();
  }, [fetchKPIInsight]);

  useEffect(() => {
    fetchKPITable();
  }, [fetchKPITable]);

  return {
    chart,
    insight,
    table,
  };
}

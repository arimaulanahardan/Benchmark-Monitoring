import { useSelectFilter } from "../../filter/hooks/useSelectFilter";
import { IBadSampleTrend } from "../interfaces/BadSampleTrend";
import { BadSampleService } from "../services/BadSampleService";
import {State} from "../../store";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { IBadSampleTable } from "../interfaces/BadSampleTable";

const service = new BadSampleService();

export function useFetchData(kpi: string) {
  const [chart, setChart] = useState<IBadSampleTrend>();
  const [table, setTable] = useState<IBadSampleTable[]>();

  const [loading, setLoading] = useState(false);
  const { yearweek } = useSelectFilter();

  const fetchBadSampleChart = useCallback(async () => {
    try {
      setLoading(true);
      const res = await service.getChart({
        kpi,
        yearweek
      });
      setLoading(false);
      setChart(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [yearweek]);

  const fetchBadSampleTable = useCallback(async () => {
    try {
      const res = await service.getTable({ 
        kpi, 
        yearweek
      });
      setTable(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [yearweek]);
  

  useEffect(() => {
    fetchBadSampleChart();
  }, [fetchBadSampleChart]);

  useEffect(() => {
    fetchBadSampleTable();
  }, [fetchBadSampleTable]);

  return {
    chart,
    loading,
    table,
  };
}
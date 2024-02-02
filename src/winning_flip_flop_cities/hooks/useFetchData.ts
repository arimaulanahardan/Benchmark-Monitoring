import { useState, useCallback, useEffect } from "react";
import { IWinningCitiesTrend } from "../interfaces/WinningCitiesTrend";
import { WinningCitiesService } from "../service/WinningCitiesService";
import { useSelectFilter } from "../../filter/hooks/useSelectFilter";
import { useSelector } from "react-redux";
import { State } from "../../store";
import { IWinningCitiesTableSummary } from "../interfaces/WinningCitiesTableSummary";
import { IWinningCitiesTable } from "../interfaces/WinningCitiesTable";
import { IWinningCitiesSummary } from "../interfaces/WinningCitiesSumary";

const service = new WinningCitiesService();

export function useFetchData() {
  const [chart, setChart] = useState<IWinningCitiesTrend>();
  const [tableSummary, setTableSummary] = useState<IWinningCitiesTableSummary[]>();
  const [table, setTable] = useState<IWinningCitiesTable[]>();
  const [summary, setSummary] = useState<IWinningCitiesSummary>();

  const [loadingChart, setLoadingChart] = useState(false);
  const [loadingTableSummary, setLoadingTableSummary] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);

  const { kpi, yearweek, cityflipflop } = useSelectFilter();

  const isDarkMode = useSelector<State, boolean>(
    (state) => state.theme.isDarkMode
  );

  const fetchWinningFlipFlopChart = useCallback(async () => {
    try {
      setLoadingChart(true);
      const res = await service.getChart({
        kpi: kpi,
        yearweek: yearweek,
        city: cityflipflop,
      });
      setLoadingChart(false);
      setChart(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [yearweek, cityflipflop, kpi, isDarkMode]);

  const fetchWinningFlipFlopTableSummary = useCallback(async () => {
    try {
      setLoadingTableSummary(true);
      const res = await service.getTableSummary({
        kpi: kpi,
        yearweek: yearweek,
        city: cityflipflop
      });
      setLoadingTableSummary(false);
      setTableSummary(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [yearweek, cityflipflop, kpi, isDarkMode]);

  const fetchWinningFlipFlopTable = useCallback(async () => {
    try {
      setLoadingTable(true);
      const res = await service.getTable({
        kpi: kpi,
        yearweek: yearweek,
        city: cityflipflop
      });
      setLoadingTable(false);
      setTable(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [yearweek, cityflipflop, kpi, isDarkMode]);

  const fetchWinningFlipFlopSummary = useCallback(async () => {
    try {
      setLoadingSummary(true);
      const res = await service.getSummary({
        kpi: kpi,
        yearweek: yearweek,
        city: cityflipflop
      });
      setLoadingSummary(false);
      setSummary(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [yearweek, cityflipflop, kpi, isDarkMode]);

  useEffect(() => {
    fetchWinningFlipFlopChart();
  }, [fetchWinningFlipFlopChart]);

  useEffect(() => {
    fetchWinningFlipFlopTableSummary();
  }, [fetchWinningFlipFlopTableSummary]);

  useEffect(() => {
    fetchWinningFlipFlopTable();
  }, [fetchWinningFlipFlopTable]);

  useEffect(() => {
    fetchWinningFlipFlopSummary();
  }, [fetchWinningFlipFlopSummary]);


  return {
    chart,
    loadingChart,
    loadingTableSummary,
    loadingTable,
    loadingSummary,
    tableSummary,
    table,
    summary,
  };
}

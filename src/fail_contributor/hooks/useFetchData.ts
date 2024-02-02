import { useState, useCallback, useEffect } from "react";
import { IFailContributorTrend } from "../interfaces/FailContributorTrend";
import { FailContributorService } from "../services/FailContributorService";
import { useSelectFilter } from "../../filter/hooks/useSelectFilter";
import { useSelector } from "react-redux";
import { State } from "../../store";

const service = new FailContributorService();

export function useFetchData(
  kpi: string, 
  operator: string[], 
  typeData: string, 
  period: string
  ) {
  const [chart, setChart] = useState<IFailContributorTrend>();

  const [loading, setLoading] = useState(false);

  const { startweek, endweek, city, level, region, kecamatan } = useSelectFilter();

  const isDarkMode = useSelector<State, boolean>(
    (state) => state.theme.isDarkMode
  );

  const fetchFailContributorChart = useCallback(async () => {
    try {
      setLoading(true);
      const res = await service.getChart({
        kpi,
        startWeek: startweek,
        endWeek: endweek,
        cities: level === "Kabupaten" ? city : undefined,
        districts: level === "Kecamatan" ? kecamatan : undefined,
        regions: level === "Region" ? region : undefined,
        operators: operator,
        level: level,
        typecolor: isDarkMode ? "dark" : "light",
        typeData,
        period,
      });
      setLoading(false);
      setChart(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [startweek, endweek, kpi, operator, typeData, period, city, level, region, kecamatan, isDarkMode]);

  useEffect(() => {
    fetchFailContributorChart();
  }, [fetchFailContributorChart]);

  return {
    chart,
    loading,
  };
}

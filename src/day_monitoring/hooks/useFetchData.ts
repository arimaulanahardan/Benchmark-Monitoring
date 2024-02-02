import { useState, useCallback, useEffect } from "react";
import { IMonitoringTrend} from "../../common/interfaces/MonitoringTrend";
import { DayMonitoringService } from "../services/DayMonitoringService";
import { useSelectFilter } from "../../filter/hooks/useSelectFilter";
import { useSelector } from "react-redux";
import { State } from "../../store";
import dayjs from "dayjs";

const service = new DayMonitoringService();

export function useFetchData() {
  const [chart, setChart] = useState<IMonitoringTrend>();
  const [loading, setLoading] = useState(false);
  const { dateStringStart, dateString, levelDayMonitoring, regionDayMonitoring, citiesDayMonitoring } = useSelectFilter();

  const isDarkMode = useSelector<State, boolean>(
    (state) => state.theme.isDarkMode
  );

  const fetchDayMonitoringChart = useCallback(async () => {
    try {
      setLoading(true);

      const res = await service.getChart({
        startDate: dayjs(dateStringStart).format("YYYY-MM-DD"),
        endDate: dayjs(dateString).format("YYYY-MM-DD"),
        level: levelDayMonitoring,
        regions: levelDayMonitoring === "region" ? regionDayMonitoring : undefined,
        cities: levelDayMonitoring === "kabupaten" ? citiesDayMonitoring : undefined,
        typecolor: isDarkMode ? "dark" : "light",
      });
      
      setLoading(false);
      setChart(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [dateString, dateStringStart, regionDayMonitoring, levelDayMonitoring, citiesDayMonitoring, isDarkMode]);

  useEffect(() => {
    fetchDayMonitoringChart();
  }, [fetchDayMonitoringChart]);

  return {
    chart,
    loading,
  };
}

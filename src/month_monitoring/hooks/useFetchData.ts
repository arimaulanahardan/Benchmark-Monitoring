import { useCallback, useEffect, useState } from "react";
import { IMonitoringTrend } from "../../common/interfaces/MonitoringTrend";
import { MonthMonitoringService } from "../services/MonthMonitoringService";
import { useSelectFilter } from "../../filter/hooks/useSelectFilter";
import { useSelector } from "react-redux";
import { State } from "../../store";

const service = new MonthMonitoringService();

export function useFetchData() {
    const [chart, setChart] = useState<IMonitoringTrend>();
    const [loading, setLoading] = useState(false);
    const { startWeekMonitoring, endWeekMonitoring, levelWeekMonitoring, regionWeekMonitoring, citiesWeekMonitoring } = useSelectFilter();

    const isDarkMode = useSelector<State, boolean>((state) => state.theme.isDarkMode);

    const fetchWeekMonitoringChart = useCallback(async () => {
        try {
            setLoading(true);

            const res = await service.getChart({
                startWeek: startWeekMonitoring,
                endWeek: endWeekMonitoring,
                level: levelWeekMonitoring,
                regions: levelWeekMonitoring === "region" ? regionWeekMonitoring : undefined,
                cities: levelWeekMonitoring === "kabupaten" ? citiesWeekMonitoring : undefined,
                typecolor: isDarkMode ? "dark" : "light",
            });
            setLoading(false);
            setChart(res.data.data);
        } catch (err) {
            console.error(err);
        }
    }, [startWeekMonitoring, endWeekMonitoring, levelWeekMonitoring, regionWeekMonitoring, citiesWeekMonitoring, isDarkMode]);

    useEffect(() => {
        fetchWeekMonitoringChart();
    }, [fetchWeekMonitoringChart]);

    return {
        chart,
        loading,
    };
}

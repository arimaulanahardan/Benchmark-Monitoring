import { useMemo } from "react";
import { useFetchData } from "../hooks/useFetchData";
import { useSelectFilter } from "../hooks/useSelectFilter";
import { selectOptionTransform } from "../../common/utils/selectOptionTransform";

const getFilterEndWeekMonitoring = () => {
    const state = useSelectFilter();
    const { yearweekWeekMonitorings } = useFetchData();
    const filterEndWeekMonitoring = useMemo(() => {
        if (!state.startWeekMonitoring) {
            return selectOptionTransform((yearweekWeekMonitorings ?? []).map((w) => w.toString()));
        } else {
            return selectOptionTransform((yearweekWeekMonitorings ?? []).filter((w) => w >= state.startWeekMonitoring).map((w) => w.toString()));
        }
    }, [state.startWeekMonitoring, yearweekWeekMonitorings]);
    return filterEndWeekMonitoring;
};
export default getFilterEndWeekMonitoring;
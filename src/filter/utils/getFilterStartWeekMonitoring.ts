import { useMemo } from "react";
import { useFetchData } from "../hooks/useFetchData";
import { useSelectFilter } from "../hooks/useSelectFilter";
import { selectOptionTransform } from "../../common/utils/selectOptionTransform";

const getFilterStartWeekMonitoring = () => {
    const state = useSelectFilter();
    const { yearweekWeekMonitorings } = useFetchData();
    const filterStartWeekMonitoring = useMemo( ()=> {
        if (!state.endWeekMonitoring) {
            return selectOptionTransform((yearweekWeekMonitorings ?? []).map((w) => w.toString()));
        } else {
            return selectOptionTransform((yearweekWeekMonitorings ?? []).filter((w) => w <= state.endWeekMonitoring).map((w) => w.toString()));
        }
    }, [state.endWeekMonitoring, yearweekWeekMonitorings]);
    return filterStartWeekMonitoring;
}

export default getFilterStartWeekMonitoring;
import { useMemo } from "react";
import { useSelectFilter } from "../../filter/hooks/useSelectFilter";
import { useFetchData } from "../../filter/hooks/useFetchData";

const getLocationsName = () => {
    const {levelWeekMonitoring, regionWeekMonitoring, citiesWeekMonitoring} = useSelectFilter();
    const {citiesWeekMonitorings} = useFetchData();
    const locationNameLable = citiesWeekMonitorings.flatMap((location) => location.options).find((ID)=>ID.value === citiesWeekMonitoring[0])?.label;

    const location = useMemo(() => {
        if (levelWeekMonitoring === "region") {
            return regionWeekMonitoring[0];
        } else if (levelWeekMonitoring === "kabupaten") {
            return locationNameLable;
        } else {
            return "NATIONS";
        }
    }, [levelWeekMonitoring, regionWeekMonitoring, citiesWeekMonitoring]);
    return location;
}

export default getLocationsName;
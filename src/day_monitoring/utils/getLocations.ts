import { useMemo } from "react";
import { useSelectFilter } from "../../filter/hooks/useSelectFilter";
import { useFetchData } from "../../filter/hooks/useFetchData";

const getLocation = () => {
    const { levelDayMonitoring, regionDayMonitoring, citiesDayMonitoring } = useSelectFilter();
    const {citiesDayMonitorings } = useFetchData();
    const locationNameLable = citiesDayMonitorings.flatMap((location) => location.options)
    .find((ID)=>ID.value === citiesDayMonitoring[0])?.label;

    const location = useMemo(() => {
        if (levelDayMonitoring === "region") {
            return regionDayMonitoring[0];
        } else if (levelDayMonitoring === "kabupaten") {
            return locationNameLable;
        } else {
            return "NATIONS";
        }
    }, [levelDayMonitoring, regionDayMonitoring, citiesDayMonitoring]);
    return location;
}

export default getLocation;
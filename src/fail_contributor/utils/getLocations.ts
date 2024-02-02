import { useSelectFilter } from "../../filter/hooks/useSelectFilter";
import { useMemo } from "react";

const getLocation = () => {
    const { kecamatan, city, region, level } = useSelectFilter();
    const location = useMemo(() => {
        if (level === "Region") {
            return region[0];
        } else if (level === "Kabupaten") {
            return city[0];
        } else if (level === "Kecamatan") {
            return kecamatan[0];
        } else {
            return "";
        }
    }, [level, region, city, kecamatan]);

    return location;
};

export default getLocation;


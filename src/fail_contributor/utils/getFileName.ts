import { useSelectFilter } from "../../filter/hooks/useSelectFilter";

export function getFileName() {
    const { level, startweek, endweek, city, region, kecamatan } = useSelectFilter();

    let fileName = `Fail-Contributor_${startweek}_${endweek}`;

    if (level.toLowerCase() === "region") {
        fileName = `${fileName}_Region_${region}.csv`;
    } else if (level === "Kabupaten") {
        fileName = `${fileName}_City_${city}.csv`;
    } else if (level === "Kecamatan") {
        fileName = `${fileName}_District_${kecamatan}.csv`;
    } else {
        fileName = fileName + ".csv";
    }

    return fileName;
}

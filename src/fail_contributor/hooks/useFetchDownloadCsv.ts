import { useCallback, useState } from "react";
import { FilterService } from "../../filter/services/FilterService";
import { useSelectFilter } from "../../filter/hooks/useSelectFilter";
import { saveAs } from "file-saver";
import { getFileName } from "../utils/getFileName";


const service = new FilterService();
export function useDownloadCsv() {
    const { operators, endweek, startweek, level, region, kecamatan, city, period } = useSelectFilter();
    const fileName = getFileName();

    const downloadCsv = useCallback
        (async () => {
            try {
                const res = await service.GetDownload({
                    startWeek: startweek,
                    endWeek: endweek,
                    level: level,
                    cities: level === "Kabupaten" ? city : undefined,
                    districts: level === "Kecamatan" ? kecamatan : undefined,
                    regions: level === "Region" ? region : undefined,
                    operators,
                    period: period,
                });                
                const blob = new Blob([res.data], { type: "text/csv" });
                saveAs(blob, fileName),
                    { autoBom: true }
            } catch (err) {
                console.error(err);
            }
        }, [
            startweek, endweek, operators, city, level, region, kecamatan, period
        ]);
    return { downloadCsv };
}
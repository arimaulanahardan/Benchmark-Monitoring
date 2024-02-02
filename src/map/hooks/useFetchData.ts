import { useCallback, useEffect, useState } from "react";
import { MapService } from "../services/MapService";
import { useSelectFilter } from "../../filter/hooks/useSelectFilter";
import { IMap } from "../interfaces/Map";
import { IOKRTrend } from "../interfaces/OKRTrend";

const service = new MapService();

export function useFetchData() {
  const [map, setMap] = useState<IMap[]>([]);
  const [okr, setOKR] = useState<IOKRTrend | null>(null);
  const { yearweek } = useSelectFilter();
  const fetchMap = useCallback(async () => {
    try {
      const res = await service.getMap({ yearweek });
      setMap(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }, [yearweek]);

  const fetchOKR = useCallback(async () => {
    try {
      const res = await service.getOKRNation();
      const okr = res.data.data;
      setOKR({
        ...okr,
        series: okr.series.map((s) => ({
          ...s,
          data: s.data.map((d) => Math.round(d)),
        })),
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchMap();
    fetchOKR();
  }, [fetchMap, fetchOKR]);
  return {
    map,
    okr,
  };
}

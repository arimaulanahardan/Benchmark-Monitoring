import { useCallback, useEffect, useState } from "react";
import { useSelectFilter } from "../../../filter/hooks/useSelectFilter";
import { IOpportunityTrend, IOpportunitySeries } from "../../../common/interfaces/OpportunityTrend";
import FileSaver from "file-saver";
import { SummaryService } from "../services/SummaryService";
import { IAchievementTable } from "../interfaces/AchievementTable";
import { IMap } from "../interfaces/Map";
import { IOKRTrend } from "../interfaces/OKRTrend";

const service = new SummaryService();

export function useFetchData(
) {
  const [opportunity, setOpportunity] = useState<IOpportunityTrend[]>();
  const [achievement, setAchievement] = useState<IAchievementTable[]>();
  const [map, setMap] = useState<IMap[]>([]);
  const [okr, setOKR] = useState<IOKRTrend>();
  const { yearweekOpenSignal } = useSelectFilter();
  const [loading, setLoading] = useState(false);

  const fetchOpportunity = useCallback(async () => {
    try {
      setLoading(true);
      const res = await service.getOpportunity({ yearweek: yearweekOpenSignal });
      const opportunity = res.data.data;
      setOpportunity(opportunity );
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [yearweekOpenSignal]);

  const fetchAchievement = useCallback(async () => {
    try {
      setLoading(true);
      const res = await service.getAchievement({ 
        yearweek: yearweekOpenSignal, 
      });
      const achievement = res.data.data;
      console.log(achievement,"aa");
      setAchievement(achievement);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  },[yearweekOpenSignal]);

  const fetchMap = useCallback(async () => {
    try {
      const res = await service.getMap({ yearweek : yearweekOpenSignal});
      setMap(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }, [yearweekOpenSignal]);

  const fetchOKR = useCallback(async () => {
    try {
      const res = await service.getOKRNation({
        yearweek: yearweekOpenSignal,
      });
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

  useEffect(() => {
    fetchOpportunity();
  }, [fetchOpportunity]);

  useEffect(() => {
    fetchAchievement();
  }
    , [fetchAchievement]);

  // const downloadOpportunityCsv = (
  //   yearweek: string,
  //   category: string[],
  //   series: IOpportunitySeries[]
  // ) => {
  //   const csvData: string[][] = [];

  //   const header: string[] = ['category'];
  //   for (let j = 0; j < series.length; j++) {
  //     header.push(series[j].name);
  //     header.push(`Cities ${series[j].name}`);
  //   }
  //   csvData.push(header);

  //   for (let i = 0; i < category.length; i++) {
  //     const row: string[] = [category[i]];
  //     for (let j = 0; j < series.length; j++) {
  //       const citiesArray = series[j].cities[i] || [];
  //       const combinedCities = citiesArray
  //         .map(city => (Array.isArray(city) ? city.join('|') : city))
  //         .join('|');
  //       row.push(series[j].data[i].toString());
  //       row.push(combinedCities);
  //     }
  //     csvData.push(row);
  //   }

  //   const csv = csvData.map(row => row.join(',')).join('\n');
  //   const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  //   FileSaver.saveAs(blob, `opportunity_${yearweek}.csv`);
  // };


  return {
    opportunity,
    loading,
    achievement,
    map,
    okr,
    // downloadOpportunityCsv,
  };
}
import { useCallback, useEffect, useState } from "react";
import { OpportunityService } from "../services/OpportunityService";
import { useSelectFilter } from "../../filter/hooks/useSelectFilter";
import { IOpportunityTrend, IOpportunitySeries } from "../interfaces/useTrendOpportunity";
import FileSaver from "file-saver";

const service = new OpportunityService();

export function useFetchData() {
  const [opportunity, setOpportunity] = useState<IOpportunityTrend>();
  const { yearweek } = useSelectFilter();
  const [loading, setLoading] = useState(false);

  const fetchOpportunity = useCallback(async () => {
    try {
      setLoading(true);
      const res = await service.getOpportunity({ yearweek });
      setOpportunity(res.data.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [yearweek]);

  useEffect(() => {
    fetchOpportunity();
  }, [fetchOpportunity]);

  const downloadOpportunityCsv = (
    yearweek: string,
    category: string[],
    series: IOpportunitySeries[]
  ) => {
    const csvData: string[][] = [];

    const header: string[] = ['category'];
    for (let j = 0; j < series.length; j++) {
      header.push(series[j].name);
      header.push(`Cities ${series[j].name}`);
    }
    csvData.push(header);

    for (let i = 0; i < category.length; i++) {
      const row: string[] = [category[i]];
      for (let j = 0; j < series.length; j++) {
        const citiesArray = series[j].cities[i] || [];
        const combinedCities = citiesArray
          .map(city => (Array.isArray(city) ? city.join('|') : city))
          .join('|');
        row.push(series[j].data[i].toString());
        row.push(combinedCities);
      }
      csvData.push(row);
    }

    const csv = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    FileSaver.saveAs(blob, `opportunity_${yearweek}.csv`);
  };


  return {
    opportunity,
    loading,
    downloadOpportunityCsv,
  };
}
export interface IFailContributorTrend {
  category: string[];
  series: ISeriesFailContributorTrend[];
}

export interface ISeriesFailContributorTrend {
  name: string;
  alias: string;
  color: string;
  data: number[];
  percentage: number[];
}

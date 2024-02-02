export interface ITrend {
  category: string[];
  series: {
    yearweek: number;
    region: string;
    operator: string;
    name: string;
    data: number[];
  }[];
}

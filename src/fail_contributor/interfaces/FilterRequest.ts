export interface IFilterRequest {
  endWeek: number;
  startWeek: number;
  cities?: string[];
  regions?: string[];
  districts?: string[];
  operators: string[];
  level: string;
  typecolor: string;
  typeData: string; //"data", "sample"
  period: string; //"weekly", "monthly"
}

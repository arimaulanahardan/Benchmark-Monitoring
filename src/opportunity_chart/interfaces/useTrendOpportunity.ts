export interface IOpportunityTrend {
    category: string[];
    series: IOpportunitySeries[];
  }
  
export interface IOpportunitySeries {
    name: string;
    data: number[];
    cities: (string[] | never[])[];
}
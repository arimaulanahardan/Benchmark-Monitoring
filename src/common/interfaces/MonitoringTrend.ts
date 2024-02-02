export interface IMonitoringTrend {
    category: string[];
    kpi: string[];
    series: {
     [key: string]: ISeries[]
    };
  }

  export interface ISeries {
    name: string;
    color: string;
    data: number[];
  };
  
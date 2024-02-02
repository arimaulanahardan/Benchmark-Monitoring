export interface IFilterRequest {
    startWeek: number;
    endWeek: number;
    regions?: string[];
    cities?: string[];
    level: string;
    typecolor: string;
  }
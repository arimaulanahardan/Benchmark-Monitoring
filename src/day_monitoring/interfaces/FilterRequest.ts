export interface IFilterRequest {
    startDate: string;
    endDate: string;
    regions?: string[];
    cities?: string[];
    level: string;
    typecolor: string;
  }
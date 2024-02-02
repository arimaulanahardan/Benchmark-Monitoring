import { IFilterRequest } from "../../../common/interfaces/FilterRequest";

export interface IFilterRequestKPI extends IFilterRequest{
  kpi: string;
}

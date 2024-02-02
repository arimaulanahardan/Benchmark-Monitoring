import { ITrend } from "../../../common/interfaces/Trend";

export interface IKpiTrend extends ITrend {
  summary: {
    kpi: string;
    unit: string;
    target: number;
    ach: number;
    deviation: number;
  };
}

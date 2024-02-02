import { ITrend } from "../../common/interfaces/Trend";

export interface IOKRTrend extends ITrend {
  summary: {
    target: string;
    latest_okr: string;
  };
}

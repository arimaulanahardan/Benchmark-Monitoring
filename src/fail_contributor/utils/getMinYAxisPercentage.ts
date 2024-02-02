import { IFailContributorTrend } from "../interfaces/FailContributorTrend";

export function getMinYAxisFromPercentage(series?: IFailContributorTrend["series"]) {
    let min = Infinity;
  
    if (series) {
      for (const s of series) {
        for (const percentage of s.percentage) {
          if (percentage === null) continue;
          min = Math.min(min, percentage);
        }
      }
    }
      
    min = min * 0.9;
    return isFinite(min) ? min : 0;
  }
  
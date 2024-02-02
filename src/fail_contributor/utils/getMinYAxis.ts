import { IFailContributorTrend } from "../interfaces/FailContributorTrend";

export function getMinYAxis(series?: IFailContributorTrend["series"]) {
  let min = Infinity;

  if (series) {
    for (const s of series) {
      for (const d of s.data) {
        if (d === null) continue;
        min = Math.min(min, d);
      }
    }
  }
  min = min * 0.9;
  return min === Infinity ? 0 : min;
}

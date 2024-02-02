import { ITrend } from "../../../common/interfaces/Trend";

export function getMinYAxis(series?: ITrend["series"]) {
  let min = Infinity;

  if (series) {
    for (const s of series) {
      for (const d of s.data) {
        if (d === null) continue;
        min = Math.min(min, d);
      }
    }
  }
  if (min < 1) return 1;
  return min === Infinity ? 0 : min;
}

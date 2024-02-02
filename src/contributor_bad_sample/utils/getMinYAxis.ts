import { IBadSampleTrend } from "../interfaces/BadSampleTrend";

export function getMinYAxis(series?: IBadSampleTrend["series"]) {
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

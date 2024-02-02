import { ISeriesTrend } from "../interfaces/WinningCitiesTrend";


export function getMinYAxis(series?: ISeriesTrend[]) {
    let min = Infinity;
    if (series) {
      for (const s of series) {
        for (const d of s.data) {
          if (d === null) continue;
          min = Math.min(min, d);
        }
      }
    }
    min = min * 0.99;
    return min === Infinity ? 0 : min;
  }
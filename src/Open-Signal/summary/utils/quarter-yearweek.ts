export function getQuarterFromYearWeek(yearweek: number): number {
  const week = yearweek % 100;
  return Math.ceil(week / 13);
}

export function getLastTwoYearweek(yearweek: number) {
  if (yearweek.toString().length < 6) return "";
  return yearweek.toString().slice(-2);
}

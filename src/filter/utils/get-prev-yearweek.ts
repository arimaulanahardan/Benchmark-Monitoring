export function getPreviousYearweek(
  yearweeks: number[],
  currentYearweek: number
) {
  const currentIndex =
    yearweeks.map((y) => y.toString())?.indexOf(currentYearweek.toString()) ??
    -1;
  const isYearweekNotFound = currentIndex === -1;
  const isLastYearweek = currentIndex === yearweeks.length - 1;

  if (isYearweekNotFound || isLastYearweek) {
    return currentYearweek;
  }

  const previousYearweek = yearweeks[currentIndex + 1];
  return previousYearweek || currentYearweek;
}

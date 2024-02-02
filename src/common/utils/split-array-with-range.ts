export function splitArrayWithRange(arr: any[], range: number) {
  const result = [];
  let currentIndex = 0;

  while (currentIndex < arr.length) {
    const subArray = arr.slice(currentIndex, currentIndex + range);
    result.push(subArray);
    currentIndex += range;
  }

  return result;
}

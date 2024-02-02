export function getTextColorByTarget(
  value: number,
  target: number,
  isDarkmode: boolean
) {
  if (value === target) {
    return isDarkmode ? "text-white" : "text-black";
  } else if (value > target) {
    return "dark:text-green-400 text-green-600";
  } else {
    return "dark:text-[#e45656] text-red-600";
  }
}

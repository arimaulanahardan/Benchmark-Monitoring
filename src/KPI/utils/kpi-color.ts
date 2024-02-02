export function getKPIColorInsight(kpi: string, value: string | number) {
  if (typeof value === "string") {
    try {
      value = parseFloat(value);
    } catch (err) {
      return "";
    }
  }
  if (value === 0) return "dark:text-white text-black";
  if (["packet loss", "latency"].includes(kpi.toLowerCase())) {
    return value < 0 ? "text-green-400" : "text-[#e45656]";
  } else {
    return value > 0 ? "text-green-400" : "text-[#e45656]";
  }
}

export function getKPIColorTable(kpi: string, value: string | number) {
  if (typeof value === "string") {
    try {
      value = parseFloat(value);
    } catch (err) {
      return "";
    }
  }
  if (value === 0) return "dark:text-white text-black";
  if (["packet loss", "latency"].includes(kpi.toLowerCase())) {
    return value < 0
      ? "dark:text-green-400 text-green-600"
      : "dark:text-[#e45656] text-red-600";
  } else {
    return value > 0
      ? "dark:text-green-400 text-green-600"
      : "dark:text-[#e45656] text-red-600";
  }
}

export function getRotateColor(kpi: string, value: string | number) {
  if (typeof value === "string") {
    try {
      value = parseFloat(value);
    } catch (err) {
      return "";
    }
  }
  if (value === 0) return "invisible";

  if (["packet loss", "latency"].includes(kpi.toLowerCase())) {
    return value < 0 ? "" : "rotate-180";
  } else {
    return value > 0 ? "" : "rotate-180";
  }
}

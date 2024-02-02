export function selectOptionTransform<T>(
  data: T[],
  valueKey?: keyof T,
  labelKey?: keyof T
): { label: string; value: string }[] {
  const _labelKey = labelKey ?? "name";
  const options = data.map((d) => {
    let value = "",
      label = "";
    if (typeof d === "string") {
      value = d;
      label = d.charAt(0).toUpperCase() + d.slice(1);
    } else {
      value = valueKey ? (d[valueKey] as string) : "";
      label = (d[_labelKey as keyof T] ?? "") as string;
    }

    return { value, label };
  });

  return options;
}

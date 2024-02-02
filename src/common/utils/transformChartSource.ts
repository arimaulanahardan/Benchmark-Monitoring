interface Series {
  [key: string]: any;
  name: string;
  data: number[];
}

interface OldSchemaSource {
  category: string[];
  series: Series[];
}

export function transformChartSource(
  oldSchema: OldSchemaSource | undefined,
  categoryKey: string,
  extendProps?: string
) {
  if (!oldSchema) return [];

  let source: Record<string, number | string>[] = [];

  // Iterate over each category in the oldSchema
  for (let i = 0; i < oldSchema.category.length; i++) {
    const category = oldSchema.category[i];

    // Map each series in oldSchema to an object with series name as the key and corresponding data value at index i
    const seriesObjects = oldSchema.series.map((series) => {
      return {
        [series.name]: series.data[i],
        ...(extendProps
          ? { [`${series.name} ${extendProps}`]: series[extendProps]?.[i] }
          : {}),
      };
    });

    // Create a new object by merging the category key-value pair and series objects using Object.assign
    const transformedObject = Object.assign(
      { [categoryKey]: category },
      ...seriesObjects
    );

    source.push(transformedObject);
  }

  return source;
}

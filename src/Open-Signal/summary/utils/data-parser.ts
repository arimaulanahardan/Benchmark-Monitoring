export function dataParser(
  collection: GeoJSON.FeatureCollection,
  collectionKey: string,
  properties: Record<string, unknown>[],
  propertyKey: string
): GeoJSON.FeatureCollection {
  return {
    ...collection,
    features: collection.features.map((feature) => {
      const featureProperty = feature.properties?.[collectionKey]
      const property = properties.find(
        (property) => property[propertyKey] === featureProperty
      );
      return {
        ...feature,
        properties: {
          ...feature.properties,
          ...property,
        },
      };
    }),
  };
}

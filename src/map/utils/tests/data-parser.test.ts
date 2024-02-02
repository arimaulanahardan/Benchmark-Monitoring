import { dataParser } from "../data-parser";

describe("dataParser", () => {
  const collection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          collectionKey: "A",
        },
      },
      {
        type: "Feature",
        properties: {
          collectionKey: "B",
        },
      },
    ],
  };

  const properties = [
    { propertyKey: "A", name: "John" },
    { propertyKey: "B", name: "Jane" },
  ];

  it("should parse the collection based on properties", () => {
    const result = dataParser(
      collection as any,
      "collectionKey",
      properties,
      "propertyKey"
    ) as any;

    expect(result.type).toBe("FeatureCollection");
    expect(result.features.length).toBe(2);
    expect(result.features[0].properties.collectionKey).toBe("A");
    expect(result.features[0].properties.name).toBe("John");
    expect(result.features[1].properties.collectionKey).toBe("B");
    expect(result.features[1].properties.name).toBe("Jane");
  });

  it("should not modify the original collection", () => {
    const result = dataParser(
      collection as any,
      "collectionKey",
      properties,
      "propertyKey"
    );

    expect(result).not.toBe(collection);
    expect(result.features).not.toBe(collection.features);
    expect(result.features[0].properties).not.toBe(
      collection.features[0].properties
    );
    expect(result.features[1].properties).not.toBe(
      collection.features[1].properties
    );
  });

  it("should handle missing properties in features", () => {
    const collectionWithMissingProperties = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
        },
        {
          type: "Feature",
          properties: {
            collectionKey: "B",
          },
        },
      ],
    };

    const result = dataParser(
      collectionWithMissingProperties as any,
      "collectionKey",
      properties,
      "propertyKey"
    ) as any;

    expect(result.features.length).toBe(2);
    expect(result.features[0].properties.collectionKey).toBeUndefined();
    expect(result.features[0].properties.name).toBeUndefined();
    expect(result.features[1].properties.collectionKey).toBe("B");
    expect(result.features[1].properties.name).toBe("Jane");
  });

  it("should return the same collection if properties are not found", () => {
    const emptyProperties = [
      { propertyKey: "C", name: "Alice" },
      { propertyKey: "D", name: "Bob" },
    ];

    const result = dataParser(
      collection as any,
      "collectionKey",
      emptyProperties,
      "propertyKey"
    );

    expect(result).toEqual(collection);
  });
});

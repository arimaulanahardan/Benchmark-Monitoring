import { selectOptionTransform } from "../selectOptionTransform";

describe("selectOptionTransform", () => {
  it("should transform an array of strings", () => {
    const data = ["apple", "banana", "cherry"];
    const result = selectOptionTransform(data);
    expect(result).toEqual([
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
      { label: "Cherry", value: "cherry" },
    ]);
  });
  it("should transform an array of objects with default labelKey", () => {
    const data = [
      { id: 1, name: "Apple" },
      { id: 2, name: "Banana" },
      { id: 3, name: "Cherry" },
    ];
    const result = selectOptionTransform(data, "id");
    expect(result).toEqual([
      { label: "Apple", value: 1 },
      { label: "Banana", value: 2 },
      { label: "Cherry", value: 3 },
    ]);
  });
  it("should transform an array of objects with custom labelKey and valueKey", () => {
    const data = [
      { code: "A1", fruitName: "Apple" },
      { code: "B2", fruitName: "Banana" },
      { code: "C3", fruitName: "Cherry" },
    ];
    const result = selectOptionTransform(data, "code", "fruitName");
    expect(result).toEqual([
      { label: "Apple", value: "A1" },
      { label: "Banana", value: "B2" },
      { label: "Cherry", value: "C3" },
    ]);
  });
});

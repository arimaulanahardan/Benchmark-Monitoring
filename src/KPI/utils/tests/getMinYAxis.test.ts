import { getMinYAxis } from "../getMinYAxis";

describe("getMinYAxis", () => {
  it("should return 0 when no series is provided", () => {
    const result = getMinYAxis();
    expect(result).toBe(0);
  });

  it("should return the minimum value", () => {
    const response = {
      category: ["A", "B", "C"],
      series: [
        {
          yearweek: 202101,
          region : "Region 1",
          city: "City 1",
          operator: "Operator 1",
          name: "Series 1",
          data: [1, 2, 3],
        },
        {
          yearweek: 202102,
          region : "Region 2",
          city: "City 2",
          operator: "Operator 2",
          name: "Series 2",
          data: [4, 5, 6],
        },
      ],
    };
    const result = getMinYAxis(response.series);
    expect(result).toBe(1);
  });
});

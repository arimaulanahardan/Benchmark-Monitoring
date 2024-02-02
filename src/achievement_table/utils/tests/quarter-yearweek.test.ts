import { getQuarterFromYearWeek } from "../quarter-yearweek";

describe("getQuarterFromYearWeek", () => {
  test("should return correct quarter for yearweek 202315", () => {
    expect(getQuarterFromYearWeek(202315)).toBe(2);
  });

  test("should return correct quarter for yearweek 202352", () => {
    expect(getQuarterFromYearWeek(202352)).toBe(4);
  });

  test("should return correct quarter for yearweek 202405", () => {
    expect(getQuarterFromYearWeek(202405)).toBe(1);
  });
});

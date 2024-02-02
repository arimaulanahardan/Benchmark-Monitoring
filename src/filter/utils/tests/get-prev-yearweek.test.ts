import { getPreviousYearweek } from "../get-prev-yearweek";

describe("getPreviousYearweek", () => {
  it("should return the previous yearweek", () => {
    const yearweeks = [20230520, 20230519, 20230518];
    const yearweek = 20230519;
    const expected = 20230518;
    const actual = getPreviousYearweek(yearweeks, yearweek);
    expect(actual).toBe(expected);
  });

  it("should return the current yearweek if the yearweek is not found", () => {
    const yearweeks = [20230520, 20230519, 20230520, 20230518];
    const yearweek = 20230521;
    const expected = 20230521;
    const actual = getPreviousYearweek(yearweeks, yearweek);
    expect(actual).toBe(expected);
  });
});

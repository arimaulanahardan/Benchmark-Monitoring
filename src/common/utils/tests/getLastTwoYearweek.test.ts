import { getLastTwoYearweek } from "../getLastTwoYearweek";

describe("getLastTwoYearweek", () => {
  test("should return the last two digits of the input string as a string", () => {
    expect(getLastTwoYearweek(202201)).toEqual("01");
    expect(getLastTwoYearweek(202252)).toEqual("52");
    expect(getLastTwoYearweek(201953)).toEqual("53");
  });

  test("should return an empty string if the input string has less than six characters", () => {
    expect(getLastTwoYearweek(1)).toEqual("");
  });
});

import { formatNumber } from '../formatNumber';

describe('formatNumber', () => {
  test('should format positive numbers correctly', () => {
    expect(formatNumber(100)).toBe('100');
    expect(formatNumber(1000)).toBe('1k');
    expect(formatNumber(1000000)).toBe('1M');
    expect(formatNumber(1000000000)).toBe('1B');
    expect(formatNumber(1000000000000)).toBe('1T');
  });

  test('should format negative numbers correctly', () => {
    expect(formatNumber(-100)).toBe('-100');
    expect(formatNumber(-1000)).toBe('-1k');
    expect(formatNumber(-1000000)).toBe('-1M');
    expect(formatNumber(-1000000000)).toBe('-1B');
    expect(formatNumber(-1000000000000)).toBe('-1T');
  });
});

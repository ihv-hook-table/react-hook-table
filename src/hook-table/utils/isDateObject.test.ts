import { describe, expect, it } from 'vite-plus/test';

import { isDateObject } from './isDateObject';

describe('utils - isDateObject', () => {
  it('returns true for Date instances', () => {
    expect(isDateObject(new Date('2024-01-01'))).toBe(true);
    expect(isDateObject(new Date('invalid'))).toBe(true);
  });

  it('returns false for non-Date values', () => {
    expect(isDateObject('2024-01-01')).toBe(false);
    expect(isDateObject(1704067200000)).toBe(false);
    expect(isDateObject({ getTime: () => 1704067200000 })).toBe(false);
    expect(isDateObject(null)).toBe(false);
    expect(isDateObject(undefined)).toBe(false);
  });
});

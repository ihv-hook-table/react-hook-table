import { describe, expect, it } from 'vite-plus/test';

import { isNullOrUndefined } from './isNullOrUndefined';

describe('utils - isNullOrUndefined', () => {
  it('returns true for null and undefined', () => {
    expect(isNullOrUndefined(null)).toBe(true);
    expect(isNullOrUndefined(undefined)).toBe(true);
  });

  it('returns false for all other values', () => {
    expect(isNullOrUndefined(false)).toBe(false);
    expect(isNullOrUndefined(0)).toBe(false);
    expect(isNullOrUndefined('')).toBe(false);
    expect(isNullOrUndefined([])).toBe(false);
    expect(isNullOrUndefined({})).toBe(false);
  });
});

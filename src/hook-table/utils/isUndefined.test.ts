import { describe, expect, it } from 'vite-plus/test';

import { isUndefined } from './isUndefined';

describe('utils - isUndefined', () => {
  it('returns true for undefined', () => {
    expect(isUndefined(undefined)).toBe(true);
  });

  it('returns false for defined values', () => {
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined(false)).toBe(false);
    expect(isUndefined(0)).toBe(false);
    expect(isUndefined('')).toBe(false);
    expect(isUndefined([])).toBe(false);
    expect(isUndefined({})).toBe(false);
  });
});

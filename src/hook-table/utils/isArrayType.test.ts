import { describe, expect, it } from 'vite-plus/test';

import { isArrayType } from './isArrayType';

describe('utils - isArrayType', () => {
  it('returns true for arrays', () => {
    expect(isArrayType([])).toBe(true);
    expect(isArrayType([1, 2, 3])).toBe(true);
    expect(isArrayType([{ id: 1 }])).toBe(true);
  });

  it('returns false for non-array values', () => {
    expect(isArrayType('Ada')).toBe(false);
    expect(isArrayType(42)).toBe(false);
    expect(isArrayType({ id: 1 })).toBe(false);
    expect(isArrayType(null)).toBe(false);
    expect(isArrayType(undefined)).toBe(false);
  });
});

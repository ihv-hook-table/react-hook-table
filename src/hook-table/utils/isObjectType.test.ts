import { describe, expect, it } from 'vite-plus/test';

import { isObjectType } from './isObjectType';

describe('utils - isObjectType', () => {
  it('returns true for values whose runtime type is object', () => {
    expect(isObjectType({})).toBe(true);
    expect(isObjectType([])).toBe(true);
    expect(isObjectType(new Date('2024-01-01'))).toBe(true);
    expect(isObjectType(null)).toBe(true);
  });

  it('returns false for non-object runtime types', () => {
    expect(isObjectType(undefined)).toBe(false);
    expect(isObjectType('Ada')).toBe(false);
    expect(isObjectType(42)).toBe(false);
    expect(isObjectType(false)).toBe(false);
    expect(isObjectType(() => 'value')).toBe(false);
  });
});

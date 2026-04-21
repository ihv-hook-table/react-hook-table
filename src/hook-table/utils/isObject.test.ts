import { describe, expect, it } from 'vite-plus/test';

import { isObject } from './isObject';

describe('utils - isObject', () => {
  it('returns true for plain objects', () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ id: 1, name: 'Ada' })).toBe(true);
    expect(isObject(Object.create(null))).toBe(true);
  });

  it('returns false for excluded or non-object values', () => {
    expect(isObject([])).toBe(false);
    expect(isObject(new Date('2024-01-01'))).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject('Ada')).toBe(false);
    expect(isObject(42)).toBe(false);
    expect(isObject(false)).toBe(false);
  });
});

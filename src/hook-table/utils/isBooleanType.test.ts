import { describe, expect, it } from 'vite-plus/test';

import { isBooleanType } from './isBooleanType';

describe('utils - isBooleanType', () => {
  it('returns true for boolean values', () => {
    expect(isBooleanType(true)).toBe(true);
    expect(isBooleanType(false)).toBe(true);
  });

  it('returns false for non-boolean values', () => {
    expect(isBooleanType('true')).toBe(false);
    expect(isBooleanType(1)).toBe(false);
    expect(isBooleanType(null)).toBe(false);
    expect(isBooleanType(undefined)).toBe(false);
    expect(isBooleanType({ value: true })).toBe(false);
  });
});

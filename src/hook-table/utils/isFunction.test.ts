import { describe, expect, it } from 'vite-plus/test';

import { isFunction } from './isFunction';

describe('utils - isFunction', () => {
  it('returns true for callable values', () => {
    expect(isFunction(() => 'value')).toBe(true);
    expect(
      isFunction(function namedFunction() {
        return 'value';
      }),
    ).toBe(true);
    expect(isFunction(class Example {})).toBe(true);
  });

  it('returns false for non-function values', () => {
    expect(isFunction('fn')).toBe(false);
    expect(isFunction(1)).toBe(false);
    expect(isFunction({ call: () => 'value' })).toBe(false);
    expect(isFunction(null)).toBe(false);
    expect(isFunction(undefined)).toBe(false);
  });
});

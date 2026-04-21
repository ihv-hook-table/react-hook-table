import { describe, expect, it } from 'vite-plus/test';

import { getFirst } from './getFirst';

describe('utils - getFirst', () => {
  it('returns the first item from an array', () => {
    expect(getFirst(['Ada', 'Grace', 'Linus'])).toBe('Ada');
  });

  it('returns undefined for an empty array', () => {
    expect(getFirst([] as number[])).toBeUndefined();
  });

  it('returns the value unchanged when it is not an array', () => {
    expect(getFirst('Ada')).toBe('Ada');
    expect(getFirst(42)).toBe(42);
    expect(getFirst({ id: 1 })).toEqual({ id: 1 });
  });

  it('returns undefined when no value is provided', () => {
    expect(getFirst()).toBeUndefined();
  });
});

import { describe, expect, it } from 'vite-plus/test';

import { toArray } from './toArray';

describe('utils - toArray', () => {
  it('returns array inputs unchanged', () => {
    const value = [1, 2, 3];

    expect(toArray(value)).toBe(value);
    expect(toArray(['Ada', 'Grace'])).toEqual(['Ada', 'Grace']);
  });

  it('wraps non-array values in an array', () => {
    expect(toArray('Ada')).toEqual(['Ada']);
    expect(toArray(0)).toEqual([0]);
    expect(toArray({ id: 1 })).toEqual([{ id: 1 }]);
    expect(toArray(undefined)).toEqual([undefined]);
  });
});

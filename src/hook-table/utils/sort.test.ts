import { describe, expect, it } from 'vite-plus/test';

import { getSortedData } from './sort';

describe('utils - getSortedData', () => {
  it('returns an empty array when data is not an array', () => {
    expect(getSortedData('asc', 'name' as never, undefined)).toEqual([]);
    expect(getSortedData('asc', 'name' as never, null as never)).toEqual([]);
  });

  it('returns the original data when no sort key is provided', () => {
    const data = [{ name: 'Grace' }, { name: 'Ada' }];

    expect(getSortedData('asc', undefined, data)).toBe(data);
  });

  it('sorts data in ascending order using numeric collation', () => {
    const data = [{ name: 'Item 10' }, { name: 'item 2' }, { name: 'Item 1' }];

    expect(getSortedData('asc', 'name', data)).toEqual([
      { name: 'Item 1' },
      { name: 'item 2' },
      { name: 'Item 10' },
    ]);

    expect(data).toEqual([
      { name: 'Item 10' },
      { name: 'item 2' },
      { name: 'Item 1' },
    ]);
  });

  it('sorts data in descending order using nested accessors', () => {
    const data = [
      { stats: { score: 2 } },
      { stats: { score: 10 } },
      { stats: { score: 1 } },
    ];

    expect(getSortedData('desc', 'stats.score', data)).toEqual([
      { stats: { score: 10 } },
      { stats: { score: 2 } },
      { stats: { score: 1 } },
    ]);
  });
});

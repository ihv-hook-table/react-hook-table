import { describe, expect, it } from 'vite-plus/test';

import { compact } from './compact';

describe('utils - compact', () => {
  it('keeps truthy values in order', () => {
    const objectValue = { id: 1 };
    const arrayValue = ['nested'];

    expect(compact([1, 'hello', true, objectValue, arrayValue])).toEqual([
      1,
      'hello',
      true,
      objectValue,
      arrayValue,
    ]);
  });

  it('removes all falsy values', () => {
    expect(
      compact([1, 0, '', 'text', false, true, null, undefined, NaN]),
    ).toEqual([1, 'text', true]);
  });

  it('returns an empty array for an empty array input', () => {
    expect(compact([])).toEqual([]);
  });

  it('returns an empty array for non-array values at runtime', () => {
    expect(compact('not-an-array' as never)).toEqual([]);
    expect(compact(null as never)).toEqual([]);
    expect(compact({ value: 1 } as never)).toEqual([]);
  });
});

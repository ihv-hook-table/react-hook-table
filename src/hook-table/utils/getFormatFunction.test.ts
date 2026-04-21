import { describe, expect, it } from 'vite-plus/test';

import { getFormatFunction } from './getFormatFunction';

describe('utils - getFormatFunction', () => {
  it('returns the formatter for a single format key', () => {
    const uppercase = (value: unknown) => String(value).toUpperCase();

    expect(
      getFormatFunction(0, 'uppercase', {
        uppercase,
      }),
    ).toBe(uppercase);
  });

  it('returns the formatter matching the value index for format arrays', () => {
    const currency = (value: unknown) => `$${String(value)}`;
    const date = (value: unknown) => `date:${String(value)}`;

    expect(
      getFormatFunction(1, ['currency', 'date'], {
        currency,
        date,
      }),
    ).toBe(date);
  });

  it('returns undefined when no format key resolves', () => {
    expect(getFormatFunction(0)).toBeUndefined();
    expect(
      getFormatFunction(3, ['currency'], { currency: String }),
    ).toBeUndefined();
  });

  it('throws when the selected format key is missing from the format functions', () => {
    expect(() =>
      getFormatFunction(0, 'currency', {
        date: String,
      } as never),
    ).toThrow(
      "[getFormatOptions]: format function for 'currency' is not defined",
    );

    expect(() => getFormatFunction(1, ['currency', 'date'])).toThrow(
      "[getFormatOptions]: format function for 'date' is not defined",
    );
  });
});

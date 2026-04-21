import { describe, expect, it, vi } from 'vite-plus/test';

import { getCellValue } from './getCellValue';

describe('utils - getCellValue', () => {
  it('returns primitive and boolean values as-is', () => {
    expect(getCellValue('Ada')).toBe('Ada');
    expect(getCellValue(0)).toBe(0);
    expect(getCellValue(false)).toBe(false);
    expect(getCellValue(true)).toBe(true);
  });

  it('returns a placeholder for unsupported falsy values', () => {
    expect(getCellValue('')).toBe('-');
    expect(getCellValue(null)).toBe('-');
    expect(getCellValue(undefined)).toBe('-');
    expect(getCellValue(NaN)).toBe('-');
  });

  it('throws when given an object without a format function', () => {
    expect(() => getCellValue({ name: 'Ada' })).toThrow(
      '[getCellValue]: object value is only supported with custom format functions',
    );
  });

  it('applies a custom format function when provided', () => {
    const formatFunction = vi.fn<(value: unknown) => string>(
      (value: unknown) => `value:${String(value)}`,
    );

    expect(getCellValue('Ada', formatFunction)).toBe('value:Ada');
    expect(formatFunction).toHaveBeenCalledWith('Ada');
  });

  it('supports objects when a custom format function is provided', () => {
    const value = { name: 'Ada' };
    const formatFunction = (input: typeof value) => input.name.toUpperCase();

    expect(getCellValue(value, formatFunction)).toBe('ADA');
  });

  it('throws when the format function argument is not callable', () => {
    expect(() => getCellValue('Ada', 'invalid' as never)).toThrow(
      '[getCellValue]: format function must be a function',
    );
  });
});

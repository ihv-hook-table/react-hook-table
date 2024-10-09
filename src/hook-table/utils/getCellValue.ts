import { ReactNode } from 'react';
import { isBooleanType } from './isBooleanType';
import { isObject } from './isObject';
import { TableRecord } from '../types';
import { isFunction } from './isFunction';

export const getCellValue = <F extends TableRecord = TableRecord>(
  value: unknown,
  FormatOptions?: F[keyof F],
) => {
  if (!FormatOptions && isObject(value)) {
    throw new Error(
      '[getCellValue]: object value is only supported with custom format functions',
    );
  }

  if (FormatOptions) {
    if (!isFunction(FormatOptions)) {
      throw new Error(`[getCellValue]: format function must be a function`);
    }

    return FormatOptions(value);
  }

  return !!value || value === 0 || isBooleanType(value)
    ? (value as ReactNode)
    : '-';
};

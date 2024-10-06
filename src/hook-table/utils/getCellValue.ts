import { ReactNode } from 'react';
import { isBooleanType } from './isBooleanType';
import { isObject } from './isObject';
import { TableRowType } from '../types';
import { isFunction } from './isFunction';

export const getCellValue = <F extends TableRowType = TableRowType>(
  value: unknown,
  formatFunction?: F[keyof F],
) => {
  if (!formatFunction && isObject(value)) {
    throw new Error(
      '[getCellValue]: object value is only supported with custom format functions',
    );
  }

  if (formatFunction) {
    if (!isFunction(formatFunction)) {
      throw new Error(`[getCellValue]: format function must be a function`);
    }

    return formatFunction(value);
  }

  return !!value || value === 0 || isBooleanType(value)
    ? (value as ReactNode)
    : '-';
};

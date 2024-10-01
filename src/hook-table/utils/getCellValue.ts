import { ReactNode } from 'react';
import { isBooleanType } from './isBooleanType';
import { isObject } from './isObject';
import { TableRowType } from '../types';
import { isFunction } from './isFunction';

export const getCellValue = <F extends TableRowType = TableRowType>(
  value: unknown,
  format?: keyof F,
  ctx?: F,
) => {
  if (!format && isObject(value)) {
    throw new Error(
      '[getCellValue]: object value is only supported with custom format functions',
    );
  }

  if (format) {
    if (!ctx?.[format]) {
      throw new Error(
        `[getCellValue]: format "${String(format)}" is not defined in formatProps`,
      );
    }

    const formatFunction = ctx?.[format];

    if (!isFunction(formatFunction)) {
      throw new Error(
        `[getCellValue]: format "${String(format)}" must be a function`,
      );
    }

    return formatFunction(value);
  }

  return !!value || value === 0 || isBooleanType(value)
    ? (value as ReactNode)
    : '-';
};

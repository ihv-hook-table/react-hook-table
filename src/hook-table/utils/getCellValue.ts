import { ReactNode } from 'react';
import { isBooleanType } from './isBooleanType';
import { isObject } from './isObject';
import { TableRecord } from '../types';
import { isFunction } from './isFunction';

const FORMAT_MUST_BE_FUNCTION_ERROR =
  '[getCellValue]: format function must be a function';
const OBJECT_VALUE_ERROR =
  '[getCellValue]: object value is only supported with custom format functions';

export const getCellValue = <F extends TableRecord = TableRecord>(
  value: unknown,
  formatFunction?: F[keyof F],
) => {
  if (!formatFunction && isObject(value)) {
    throw new Error(OBJECT_VALUE_ERROR);
  }

  if (formatFunction) {
    if (!isFunction(formatFunction)) {
      throw new Error(FORMAT_MUST_BE_FUNCTION_ERROR);
    }

    return formatFunction(value);
  }

  return !!value || value === 0 || isBooleanType(value)
    ? (value as ReactNode)
    : '-';
};

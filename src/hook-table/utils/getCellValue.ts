import { ReactNode } from 'react';
import { formatMoney } from './formatMoney';
import { isBooleanType } from './isBooleanType';
import { isObject } from './isObject';

export const getCellValue = (value: unknown, format?: 'money' | 'date') => {
  if (format !== 'money' && isObject(value)) {
    throw new Error(
      '[getCellValue]: object value is only supported with format prop set to "money"',
    );
  }

  if (format === 'money' && !isObject(value)) {
    throw new Error(
      "[getCellValue]: money format can't be used with non-object value  - expected value is {currency: string, amount: number}",
    );
  }

  if (format === 'money' && isObject(value)) {
    return formatMoney(value);
  }

  return !!value || value === 0 || isBooleanType(value)
    ? (value as ReactNode)
    : '-';
};

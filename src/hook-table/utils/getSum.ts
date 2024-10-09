import { TableRecord } from '../types';
import { addNumbers } from './addNumbers';
import { deepGet } from './deepGet';
import { isNumberType } from './isNumberType';
import { isObjectType } from './isObjectType';

export const getSum = <T extends TableRecord = TableRecord>(
  data: T[],
  accessor: string,
) => {
  return data.reduce((prev, currentValue) => {
    const value = deepGet(currentValue, accessor) || 0;

    if (isObjectType(value)) {
      throw new Error(
        'The sum function can only be used with number values, not objects. Use footer accessor provide nested value',
      );
    }

    if (!isNumberType(value)) {
      throw new Error('The sum function can only be used with number values');
    }

    return addNumbers(prev, value, 2);
  }, 0);
};

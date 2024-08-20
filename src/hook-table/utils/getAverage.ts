import { TableRowType } from '../types';
import { deepGet } from './deepGet';
import { isNumberType } from './isNumberType';
import { isObjectType } from './isObjectType';

export const getAverage = <T extends TableRowType = TableRowType>(
  data: T[],
  accessor: string,
) => {
  return (
    data.reduce((sum, currentValue) => {
      const value = deepGet(currentValue, accessor) || 0;

      if (isObjectType(value)) {
        throw new Error(
          'The average function can only be used with number values, not objects. Use footer accessor to provide nested value',
        );
      }

      if (!isNumberType(value)) {
        throw new Error('The sum function can only be used with number values');
      }

      return sum + value;
    }, 0) / data.length
  );
};

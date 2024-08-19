import { ColumnProps, TableRowType } from '../types';
import { deepGet } from './deepGet';
import { isNumberType } from './isNumberType';
import { isObjectType } from './isObjectType';
import { isStringType } from './isStringType';
import { sum } from './sum';

type GetFooterValueProps<T extends TableRowType = TableRowType> = {
  column: ColumnProps<T>;
  data?: T[];
};

export const getFooterValue = <T extends TableRowType = TableRowType>({
  column,
  data,
}: GetFooterValueProps<T>) => {
  const { accessor, footer } = column;

  const footerAccessor = isStringType(footer) ? footer : footer?.accessor;
  const colAccessor = isStringType(accessor) ? accessor : undefined;
  const correctAccessor = footerAccessor || colAccessor;

  if (correctAccessor && data && typeof footer !== 'string') {
    switch (footer?.fn) {
      case 'sum':
        return data.reduce((prev, currentValue) => {
          const value = deepGet(currentValue, correctAccessor) || 0;

          if (isObjectType(value)) {
            throw new Error(
              'The sum function can only be used with number values, not objects. Use footer accessor provide nested value',
            );
          }

          if (!isNumberType(value)) {
            throw new Error(
              'The sum function can only be used with number values',
            );
          }

          return sum(prev, value, 2);
        }, 0);
      case 'average':
        return (
          data.reduce((sum, currentValue) => {
            const value = deepGet(currentValue, correctAccessor) || 0;

            if (isObjectType(value)) {
              throw new Error(
                'The average function can only be used with number values, not objects. Use footer accessor to provide nested value',
              );
            }

            if (!isNumberType(value)) {
              throw new Error(
                'The sum function can only be used with number values',
              );
            }

            return sum + value;
          }, 0) / data.length
        );
      default:
        return footer?.value ?? '';
    }
  }

  return isStringType(footer) ? footer : footer?.value;
};

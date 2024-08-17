import { ColumnProps, TableRowType } from '../types';

type GetFooterValueProps<T extends TableRowType = TableRowType> = {
  column: ColumnProps<T>;
  data?: T[];
};

export const getFooterValue = <T extends TableRowType = TableRowType>({
  column,
  data,
}: GetFooterValueProps<T>) => {
  const { accessor, footer } = column;

  if (!data || !accessor) return undefined;

  const colAccessor = Array.isArray(accessor) ? accessor[0] : accessor;

  if (accessor && data && typeof footer !== 'string') {
    switch (footer?.fn) {
      case 'sum':
        return data.reduce((sum, currentValue) => {
          if (typeof currentValue[colAccessor] !== 'number') {
            throw new Error(
              'The sum function can only be used with number values',
            );
          }

          return sum + currentValue[colAccessor];
        }, 0);
      case 'average':
        return (
          data.reduce((sum, currentValue) => {
            if (typeof currentValue[colAccessor] !== 'number') {
              throw new Error(
                'The average function can only be used with number values',
              );
            }

            return sum + currentValue[colAccessor];
          }, 0) / data.length
        );
      default:
        return footer?.value ?? '';
    }
  }

  return footer;
};

import { ReactNode } from 'react';
import clsx from 'clsx';
import { ColumnProps, TableRowType } from '../../types';

import classes from './Body.module.css';
import { Value } from '../Value/Value';

type Props<T extends TableRowType = TableRowType> = {
  columns: ColumnProps<T>[];
  data?: T[];
  isLoading?: boolean;
};

export const Body = <T extends TableRowType = TableRowType>({
  columns,
  data,
  isLoading = false,
}: Props<T>) => {
  const isNoResults = !data || !data.length || !columns || isLoading;

  if (isNoResults) {
    return <NoResults isLoading={isLoading} columnCount={columns.length} />;
  }

  const hasMultipleValues = columns.some(
    ({ accessor }) => Array.isArray(accessor) && accessor.length > 1,
  );

  return (
    <tbody>
      {data.map((rowData, index) => (
        <tr key={index} className={clsx(classes.row)}>
          {columns.map(({ accessor, alignment = 'left', children }) => {
            let value: ReactNode;

            const childElements =
              children && typeof children === 'function' && children(rowData);

            if (childElements) {
              value = childElements;
            }

            if (!children && !!accessor) {
              if (typeof accessor === 'string') {
                value = <Value value={rowData[accessor]} />;
              }

              if (Array.isArray(accessor) && accessor.length === 1) {
                value = <Value value={rowData[accessor[0]]} />;
              }

              if (Array.isArray(accessor) && accessor.length > 1) {
                value = accessor.map((acc, idx) => {
                  const isSecondaryValue = idx !== 0;
                  return (
                    <Value
                      value={rowData[acc]}
                      isSecondaryValue={isSecondaryValue}
                      key={idx}
                    />
                  );
                });
              }
            }

            return (
              <td
                key={String(accessor)}
                className={clsx(
                  alignment && classes[`align-${alignment}`],
                  hasMultipleValues && classes.top,
                )}
              >
                {value}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

const NoResults = ({
  isLoading,
  columnCount,
}: {
  isLoading: boolean;
  columnCount: number;
}) => (
  <tbody>
    <tr className={classes.row}>
      <td className={classes['align-center']} colSpan={columnCount}>
        {isLoading ? 'Loading' : 'No results'}
      </td>
    </tr>
  </tbody>
);

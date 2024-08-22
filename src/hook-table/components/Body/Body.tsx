import { ReactNode } from 'react';
import { ColumnProps, TableRowType } from '../../types';
import { Value } from '../Value/Value';
import {
  clsx,
  deepGet,
  isArrayType,
  isFunction,
  isStringType,
} from '../../utils';

import classes from './Body.module.css';

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
    ({ accessor }) => isArrayType(accessor) && accessor.length > 1,
  );

  return (
    <tbody>
      {data.map((rowData, dataIndex) => (
        <tr key={dataIndex} className={clsx(classes.row)}>
          {columns.map(
            ({ accessor, alignment = 'left', children }, colIndex) => {
              let value: ReactNode;

              const childElements = isFunction(children) && children(rowData);

              if (childElements) {
                value = childElements;
              }

              if (!children && !!accessor) {
                if (isStringType(accessor)) {
                  value = <Value value={deepGet(rowData, accessor)} />;
                }

                if (isArrayType(accessor)) {
                  value = accessor.map((acc, valueIndex) => {
                    const isSecondaryValue = valueIndex !== 0;

                    return (
                      <Value
                        value={deepGet(rowData, acc)}
                        isSecondaryValue={isSecondaryValue}
                        key={valueIndex}
                      />
                    );
                  });
                }
              }

              return (
                <td
                  key={colIndex}
                  className={clsx(
                    alignment && classes[`align-${alignment}`],
                    hasMultipleValues && classes.top,
                  )}
                >
                  {value}
                </td>
              );
            },
          )}
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

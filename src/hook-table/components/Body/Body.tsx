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

import { NoResults } from '../NoResults/NoResults';
import { getCellValue } from '../../utils/getCellValue';

type Props<
  T extends TableRowType = TableRowType,
  F extends TableRowType = TableRowType,
> = {
  columns: ColumnProps<T, F>[];
  data?: T[];
  formatProps?: F;
  isLoading?: boolean;
};

export const Body = <
  T extends TableRowType = TableRowType,
  F extends TableRowType = TableRowType,
>({
  columns,
  data,
  formatProps,
  isLoading = false,
}: Props<T>) => {
  const isNoResults = !data || !data.length || !columns || isLoading;

  if (isNoResults) {
    return <NoResults isLoading={isLoading} columnCount={columns.length} />;
  }

  const isMulti = columns.some(
    ({ accessor }) => isArrayType(accessor) && accessor.length > 1,
  );

  // TODO: simplify this

  return (
    <tbody className="hvms-body">
      {data.map((rowData, dataIndex) => (
        <tr key={dataIndex}>
          {columns.map(
            ({ accessor, alignment = 'left', children, format }, colIndex) => {
              let value: ReactNode;

              // If children prop is a function, render custom cell
              const childElements = isFunction(children) && children(rowData);

              if (childElements) {
                value = childElements;
              }

              // Column accessor is used to get the value from the data
              if (!children && !!accessor) {
                // Accessor is string
                if (isStringType(accessor)) {
                  const cellValue = deepGet(rowData, accessor);
                  const actualValue = getCellValue<F>(
                    cellValue,
                    format,
                    formatProps as F | undefined,
                  );

                  value = <Value value={actualValue} />;
                }

                // Accessor is array of strings
                if (isArrayType(accessor)) {
                  value = accessor.map((acc, valueIndex) => {
                    const isSecondaryValue = valueIndex !== 0;

                    const cellValue = deepGet(rowData, acc);
                    const actualValue = getCellValue<F>(
                      cellValue,
                      format,
                      formatProps as F | undefined,
                    );

                    return (
                      <Value
                        value={actualValue}
                        isSecondaryValue={isSecondaryValue}
                        key={valueIndex}
                      />
                    );
                  });
                }
              }

              // Render the cell
              return (
                <td
                  key={colIndex}
                  className={clsx(
                    alignment && `align-${alignment}`,
                    isMulti && 'multi-line',
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

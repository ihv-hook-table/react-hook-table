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
    <tbody className="hvms-body">
      {data.map((rowData, dataIndex) => (
        <tr key={dataIndex}>
          {columns.map(
            ({ accessor, alignment = 'left', children, format }, colIndex) => {
              let value: ReactNode;

              // If children prop is a function, custom Cell component is used
              const childElements = isFunction(children) && children(rowData);

              if (childElements) {
                value = childElements;
              }

              // Column accessor is used to get the value from the data
              if (!children && !!accessor) {
                // Accessor is string
                if (isStringType(accessor)) {
                  value = (
                    <Value value={deepGet(rowData, accessor)} format={format} />
                  );
                }

                // Accessor is array of strings
                if (isArrayType(accessor)) {
                  value = accessor.map((acc, valueIndex) => {
                    const isSecondaryValue = valueIndex !== 0;

                    return (
                      <Value
                        format={format}
                        value={deepGet(rowData, acc)}
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
                    hasMultipleValues && 'multi-line',
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

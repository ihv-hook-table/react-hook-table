import { ColumnProps, TableRowType } from '../../types';
import { clsx, isArrayType } from '../../utils';
import { NoResults } from '../NoResults/NoResults';
import { ColData } from './ColData';

type Props<
  T extends TableRowType = TableRowType,
  F extends TableRowType = TableRowType,
> = {
  columns: ColumnProps<T, F>[];
  data?: T[];
  formatFunctions?: F;
  isLoading?: boolean;
};

export const Body = <T extends TableRowType = TableRowType>({
  columns,
  data,
  formatFunctions,
  isLoading = false,
}: Props<T>) => {
  const isNoResults = !data || !data.length || !columns || isLoading;

  if (isNoResults) {
    return <NoResults isLoading={isLoading} columnCount={columns.length} />;
  }

  const isMulti = columns.some(
    ({ accessor }) => isArrayType(accessor) && accessor.length > 1,
  );

  return (
    <tbody className="hvms-body">
      {data.map((rowData, dataIndex) => (
        <tr key={dataIndex}>
          {columns.map((columnProps, colIndex) => {
            const { alignment = 'left' } = columnProps;

            return (
              <td
                key={colIndex}
                className={clsx(
                  alignment && `align-${alignment}`,
                  isMulti && 'multi-line',
                )}
              >
                <ColData
                  {...columnProps}
                  formatFunctions={formatFunctions}
                  rowData={rowData}
                />
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

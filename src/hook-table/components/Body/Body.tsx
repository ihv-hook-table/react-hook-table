import { ColumnProps, FormatOptions, TableRecord } from '../../types';
import { clsx, isArrayType } from '../../utils';
import { NoResults } from '../NoResults/NoResults';
import { ColumnData } from './ColumnData';

type Props<
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
> = {
  columns: ColumnProps<T, F>[];
  data?: T[];
  isLoading?: boolean;
};

export const Body = <T extends TableRecord = TableRecord>({
  columns,
  data,
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
                <ColumnData {...columnProps} rowData={rowData} />
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

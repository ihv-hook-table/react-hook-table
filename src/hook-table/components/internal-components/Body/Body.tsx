import { ColumnProps, FormatOptions, TableRecord } from '../../../types';
import { TableBody, NoResults } from '../../default-components';
import { BodyRow } from '../BodyRow/BodyRow';
import { useTableData } from '../../../context/table-data-context';

type Props<
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
> = {
  columns: ColumnProps<T, F>[];
  isLoading?: boolean;
};

export const Body = <T extends TableRecord = TableRecord>({
  columns,
  isLoading = false,
}: Props<T>) => {
  const data = useTableData<T>();

  const isNoResults = !data || !data.length || !columns || isLoading;

  if (isNoResults) {
    return <NoResults isLoading={isLoading} columnCount={columns.length} />;
  }

  return (
    <TableBody>
      {data.map((rowData, dataIndex) => (
        <BodyRow
          key={`${dataIndex}-${new Date().getTime()}`}
          columns={columns}
          rowData={rowData}
        />
      ))}
    </TableBody>
  );
};

import { ColumnProps, FormatOptions, TableRecord } from '../../types';
import { log } from '../../utils';
import { NoResults } from '../NoResults/NoResults';
import { TableRow } from '../TableRow/TableRow';

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

  if (import.meta.env.DEV) {
    log('Body - data', data);
  }

  return (
    <tbody className="hvms-body">
      {data.map((rowData, dataIndex) => (
        <TableRow key={dataIndex} columns={columns} rowData={rowData} />
      ))}
    </tbody>
  );
};

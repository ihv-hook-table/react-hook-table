import { ColumnProps, FormatOptions, TableRecord } from '../../types';
import { TableBody } from '../default-components';
import { NoResults } from '../NoResults/NoResults';
import { BodyRow } from '../BodyRow/BodyRow';

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

  return (
    <TableBody>
      {data.map((rowData, dataIndex) => (
        <BodyRow key={dataIndex} columns={columns} rowData={rowData} />
      ))}
    </TableBody>
  );
};

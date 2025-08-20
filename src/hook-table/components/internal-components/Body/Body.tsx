import { use, useId } from 'react';
import { TableBody, NoResults } from '../../default-components';
import { BodyRow } from '../BodyRow/BodyRow';
import { useTableData } from '../../../context/table-data-context';
import { PaginationContext } from '../../../context/pagination-context/pagination-context';
import type { ColumnProps, FormatOptions, TableRecord } from '../../../types';

type Props<
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
> = {
  columns: ColumnProps<T, F>[];
};

export const Body = <T extends TableRecord = TableRecord>({
  columns,
}: Props<T>) => {
  const id = useId();
  const data = useTableData<T>();
  const { state } = use(PaginationContext) || {};

  const isNoResults = !data || !data.length || !columns;

  if (!state?.isLoading && isNoResults) {
    return <NoResults columnCount={columns.length} />;
  }

  return (
    <TableBody>
      {data?.map((rowData, dataIndex) => (
        <BodyRow
          key={`${dataIndex}-${id}`}
          columns={columns}
          rowData={rowData}
        />
      ))}
    </TableBody>
  );
};

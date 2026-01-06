import { useId } from 'react';
import { TableBody, NoResults } from '../../default-components';
import { BodyRow } from '../BodyRow/BodyRow';
import { useTableData } from '@/hook-table/context/data-context/data-context';
import { useColumnContext } from '@/hook-table/context/column-context/column-context';
import { useLoadingContext } from '@/hook-table/context/loading-context/loading-context';

export const Body = () => {
  const id = useId();
  const data = useTableData();
  const columns = useColumnContext() || [];
  const { isLoading } = useLoadingContext();

  const isNoResults = !data || !data.length || !columns;

  if (!isLoading && isNoResults) {
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

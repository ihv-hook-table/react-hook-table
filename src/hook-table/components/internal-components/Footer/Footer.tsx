import { useTableData } from '@/hook-table/context/data-context/data-context';
import type { ColumnProps, TableRecord } from '../../../types';
import { getFooterProps } from '../../../utils';
import { TableFooter, TableHead, TableRow } from '../../default-components';
import { useColumnContext } from '@/hook-table/context/column-context/column-context';

export const Footer = () => {
  const data = useTableData();
  const columns = useColumnContext() || [];

  const hasFooter = columns.some(col => col.footer);

  if (!data || !columns.length || !hasFooter) {
    return null;
  }

  return (
    <TableFooter>
      <TableRow>
        {columns.map((col, idx) => (
          <Cell column={col} key={idx} />
        ))}
      </TableRow>
    </TableFooter>
  );
};

type CellProps<T extends TableRecord = TableRecord> = {
  column: ColumnProps<T>;
};

const Cell = <T extends TableRecord = TableRecord>({
  column,
}: CellProps<T>) => {
  const { alignment: columnAlignment = 'left', footer } = column || {};

  if (!footer) {
    return null;
  }

  const { value, colSpan, footerAlignment } = getFooterProps({ column }) || {};

  const alignment = footerAlignment ?? columnAlignment;

  return (
    <TableHead alignment={alignment} colSpan={colSpan}>
      {String(value)}
    </TableHead>
  );
};

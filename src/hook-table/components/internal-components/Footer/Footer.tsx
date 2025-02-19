import { useTableData } from '../../../context/table-data-context';
import { ColumnProps, TableRecord } from '../../../types';
import { getFooterProps } from '../../../utils';
import { TableFooter, TableHead, TableRow } from '../../default-components';

type Props<T extends TableRecord = TableRecord> = {
  columns: ColumnProps<T>[];
  isLoading?: boolean;
};

export const Footer = <T extends TableRecord = TableRecord>({
  columns,
  isLoading,
}: Props<T>) => {
  const hasFooter = columns.some(col => col.footer);
  const data = useTableData<T>();

  if (!data || !columns || !hasFooter || isLoading) {
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
    <TableHead isMultiValue={false} alignment={alignment} colSpan={colSpan}>
      {String(value)}
    </TableHead>
  );
};

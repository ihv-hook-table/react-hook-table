import { ColumnProps, TableRecord } from '../../types';
import { getFooterProps } from '../../utils';

type Props<T extends TableRecord = TableRecord> = {
  columns: ColumnProps<T>[];
  data?: T[];
  isLoading?: boolean;
};

export const Footer = <T extends TableRecord = TableRecord>({
  columns,
  data,
  isLoading,
}: Props<T>) => {
  if (!data || !columns || isLoading) {
    return null;
  }

  return (
    <tfoot className="hvms-footer">
      <tr>
        {columns.map((col, idx) => (
          <Cell column={col} key={idx} />
        ))}
      </tr>
    </tfoot>
  );
};

type CellProps<T extends TableRecord = TableRecord> = {
  column: ColumnProps<T>;
};

const Cell = <T extends TableRecord = TableRecord>({
  column,
}: CellProps<T>) => {
  const { alignment: colAlignment = 'left', footer } = column || {};

  if (!footer) {
    return null;
  }

  const { value, colSpan, footerAlignment } = getFooterProps({ column }) || {};

  const alignment = footerAlignment ?? colAlignment;

  return (
    <th className={`align-${alignment}`} colSpan={colSpan}>
      {String(value)}
    </th>
  );
};

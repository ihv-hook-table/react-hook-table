import { ColumnProps, TableRowType } from '../../types';
import { getFooterValue, isStringType } from '../../utils';

type Props<T extends TableRowType = TableRowType> = {
  columns: ColumnProps<T>[];
  data?: T[];
  isLoading?: boolean;
};

export const Footer = <T extends TableRowType = TableRowType>({
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
          <Cell column={col} key={idx} data={data} />
        ))}
      </tr>
    </tfoot>
  );
};

type CellProps<T extends TableRowType = TableRowType> = {
  column: ColumnProps<T>;
  data?: T[];
};

const Cell = <T extends TableRowType = TableRowType>({
  column,
  data,
}: CellProps<T>) => {
  const { alignment = 'left', footer } = column || {};

  if (!footer) {
    return null;
  }

  const footerAlignment =
    !isStringType(footer) && footer?.alignment ? footer.alignment : alignment;

  const colSpan = !isStringType(footer) && footer?.colSpan ? footer.colSpan : 1;

  return (
    <th className={`align-${footerAlignment}`} colSpan={colSpan}>
      {String(getFooterValue({ column, data }))}
    </th>
  );
};

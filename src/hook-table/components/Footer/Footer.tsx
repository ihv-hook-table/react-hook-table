import clsx from 'clsx';
import { ColumnProps, TableRowType } from '../../types';
import { getFooterValue } from '../../helpers/calculations';

import classes from './Footer.module.css';

type Props<T extends TableRowType = TableRowType> = {
  columns: ColumnProps<T>[];
  data?: T[];
  isLoading?: boolean;
};

export const Footer = ({ columns, data, isLoading }: Props) => {
  if (!data || !columns || isLoading) {
    return null;
  }

  return (
    <tfoot>
      <tr className={classes.root}>
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
    typeof footer !== 'string' && footer?.alignment
      ? footer.alignment
      : alignment;

  const colSpan =
    typeof footer !== 'string' && footer?.colSpan ? footer.colSpan : 1;

  return (
    <th className={clsx(classes[`align-${footerAlignment}`])} colSpan={colSpan}>
      {String(getFooterValue<T>({ column, data }))}
    </th>
  );
};

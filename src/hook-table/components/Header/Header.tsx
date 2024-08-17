import { ColumnProps, TableRowType } from '../../types';
import { Cell } from './Cell/Cell';

import classes from './Header.module.css';

type Props<T extends TableRowType = TableRowType> = {
  columns: ColumnProps<T>[];
};

export const Header = <T extends TableRowType = TableRowType>({
  columns,
}: Props<T>) => {
  const hasMultiLabels = columns.some(
    ({ label }) => Array.isArray(label) && label.length > 1,
  );

  return (
    <thead>
      <tr className={classes.header}>
        {columns?.map((col, idx) => {
          if (!!col.accessor && !!col.id) {
            throw new Error(
              'You can only use one of `accessor` or `id` in a column',
            );
          }
          return <Cell key={idx} column={col} isMulti={hasMultiLabels} />;
        })}
      </tr>
    </thead>
  );
};

import { ColumnProps, TableRowType } from '../../types';
import { isArrayType } from '../../utils';
import { Cell } from './Cell/Cell';

type Props<T extends TableRowType = TableRowType> = {
  columns: ColumnProps<T>[];
};

export const Header = <T extends TableRowType = TableRowType>({
  columns,
}: Props<T>) => {
  const hasMultiLabels = columns.some(
    ({ header }) => isArrayType(header) && header.length > 1,
  );

  return (
    <thead className="hvms-header">
      <tr>
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

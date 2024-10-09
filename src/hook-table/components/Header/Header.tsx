import { ColumnProps, TableRecord } from '../../types';
import { isArrayType } from '../../utils';
import { Cell } from './Cell/Cell';

type Props<T extends TableRecord = TableRecord> = {
  columns: ColumnProps<T>[];
};

export const Header = <T extends TableRecord = TableRecord>({
  columns,
}: Props<T>) => {
  const hasMultiLabels = columns.some(
    ({ header }) => isArrayType(header) && header.length > 1,
  );

  return (
    <thead className="hvms-header">
      <tr>
        {columns?.map((col, idx) => (
          <Cell key={idx} column={col} isMulti={hasMultiLabels} />
        ))}
      </tr>
    </thead>
  );
};

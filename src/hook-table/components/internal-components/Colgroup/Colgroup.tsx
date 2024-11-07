import { ColumnProps, TableRecord } from '../../../types';

type Props<T extends TableRecord = TableRecord> = {
  columns: ColumnProps<T>[];
};

export const ColGroup = <T extends TableRecord = TableRecord>({
  columns,
}: Props<T>) => {
  return (
    <colgroup>
      {columns.map(({ colWidth }, idx) => (
        <col key={idx} {...(colWidth && { width: `${colWidth}%` })} />
      ))}
    </colgroup>
  );
};

import { ColumnProps, TableRowType } from '../../../types';
import { clsx, toArray } from '../../../utils';

type HeaderCellProps<T extends TableRowType = TableRowType> = {
  column: ColumnProps<T>;
};

export const Cell = <T extends TableRowType = TableRowType>({
  column,
  isMulti,
}: HeaderCellProps<T> & { isMulti: boolean }) => {
  const { alignment = 'left' } = column || {};

  return (
    <th className={clsx(`align-${alignment}`, isMulti && 'multi-line')}>
      <CellValue {...column} />
    </th>
  );
};

const CellValue = <T extends TableRowType = TableRowType>({
  header,
}: ColumnProps<T>) => {
  const normalizedLabels = toArray(header) || '';

  return normalizedLabels.map((label, idx) => {
    const isSecondaryLabel = idx !== 0;

    return (
      <div key={idx} className={clsx(isSecondaryLabel && 'secondary-value')}>
        {label}
      </div>
    );
  });
};

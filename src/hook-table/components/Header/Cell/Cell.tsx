import { ColumnProps, TableRowType } from '../../../types';
import { isStringType, clsx } from '../../../utils';

type HeaderCellProps<T extends TableRowType = TableRowType> = {
  column: ColumnProps<T>;
};

const getLabel = <T extends TableRowType = TableRowType>({
  header,
}: ColumnProps<T>) => {
  if (isStringType(header)) return [header];

  return header;
};

const CellValue = <T extends TableRowType = TableRowType>(
  column: ColumnProps<T>,
) => {
  const normalizedLabels = getLabel(column) || '';

  return normalizedLabels.map((label, idx) => {
    const isSecondaryLabel = idx !== 0;

    return (
      <div key={idx} className={clsx(isSecondaryLabel && 'secondary-value')}>
        {label}
      </div>
    );
  });
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

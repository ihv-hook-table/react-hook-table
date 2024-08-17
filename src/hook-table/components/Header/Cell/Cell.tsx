import clsx from 'clsx';
import { ColumnProps, TableRowType } from '../../../types';

import classes from './Cell.module.css';

type HeaderCellProps<T extends TableRowType = TableRowType> = {
  column: ColumnProps<T>;
};

const getLabel = <T extends TableRowType = TableRowType>({
  label,
}: ColumnProps<T>) => {
  if (typeof label === 'string') return label;
  if (Array.isArray(label) && label.length === 1) return label[0];

  return label;
};

const CellValue = <T extends TableRowType = TableRowType>(
  column: ColumnProps<T>,
) => {
  const adjustedLabel = getLabel(column);

  if (typeof adjustedLabel === 'string') return adjustedLabel;

  return adjustedLabel.map((label, idx) => {
    const isSecondaryLabel = idx !== 0;

    return (
      <div
        key={idx}
        className={clsx(isSecondaryLabel && classes.secondaryLabel)}
      >
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
    <th
      className={clsx(
        classes[`align-${alignment}`],
        isMulti && classes.multiLine,
      )}
    >
      <CellValue {...column} />
    </th>
  );
};

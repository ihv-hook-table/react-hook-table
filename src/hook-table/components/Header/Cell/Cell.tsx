import clsx from 'clsx';
import { ColumnProps, TableRowType } from '../../../types';
import { isStringType } from '../../../utils';

import classes from './Cell.module.css';

type HeaderCellProps<T extends TableRowType = TableRowType> = {
  column: ColumnProps<T>;
};

const getLabel = <T extends TableRowType = TableRowType>({
  label,
}: ColumnProps<T>) => {
  if (isStringType(label)) return [label];

  return label;
};

const CellValue = <T extends TableRowType = TableRowType>(
  column: ColumnProps<T>,
) => {
  const adjustedLabel = getLabel(column) || '';

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
        classes.root,
        classes[`align-${alignment}`],
        isMulti && classes.multiLine,
      )}
    >
      <CellValue {...column} />
    </th>
  );
};

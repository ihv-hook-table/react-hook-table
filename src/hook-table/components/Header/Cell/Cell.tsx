import { useContext } from 'react';
import { ColumnProps, TableRecord } from '../../../types';
import { clsx, isFunction, toArray } from '../../../utils';
import { TableFormatContext } from '../../../context/context';

type HeaderCellProps<T extends TableRecord = TableRecord> = {
  column: ColumnProps<T>;
};

export const Cell = <T extends TableRecord = TableRecord>({
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

const CellValue = <T extends TableRecord = TableRecord>({
  accessor,
  header,
}: ColumnProps<T>) => {
  const { translate } = useContext(TableFormatContext) || {};
  const headerLabel = header ?? accessor;

  const labelsArray = toArray(headerLabel) || '';

  return labelsArray.map((label, idx) => {
    const isSecondaryLabel = idx !== 0;

    const value = isFunction(translate) && label ? translate(label) : label;

    return (
      <div key={idx} className={clsx(isSecondaryLabel && 'secondary-value')}>
        {value}
      </div>
    );
  });
};

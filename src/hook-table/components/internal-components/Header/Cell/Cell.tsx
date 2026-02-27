import { use } from 'react';
import type { ColumnProps, TableRecord } from '../../../../types';
import { isFunction, toArray, getFirst } from '../../../../utils';
import { TableOptionsContext } from '../../../../context/options-context/options-context';
import { Value, TableHead } from '../../../default-components';

type HeaderCellProps<T extends TableRecord = TableRecord> = {
  column: ColumnProps<T>;
};

export const Cell = <T extends TableRecord = TableRecord>({
  column,
}: HeaderCellProps<T>) => {
  const { alignment = 'left', accessor, sortAccessor, select } = column || {};

  // Determine sortAccessor key
  const sortAccessorKey = select
    ? undefined
    : (sortAccessor ?? getFirst(accessor));

  return (
    <TableHead alignment={alignment} sortAccessor={sortAccessorKey}>
      <CellValue {...column} />
    </TableHead>
  );
};

const CellValue = <T extends TableRecord = TableRecord>({
  accessor,
  header,
  action,
  select,
}: ColumnProps<T>) => {
  const { translate } = use(TableOptionsContext) || {};
  const headerLabel = select ? undefined : (header ?? accessor);

  const labelsArray = toArray(headerLabel) || '';

  return labelsArray.map((label, idx) => {
    const isSecondaryLabel = idx !== 0;

    const value = isFunction(translate) && label ? translate(label) : label;

    return (
      <Value key={idx} data-secondary={isSecondaryLabel && !action}>
        {value}
      </Value>
    );
  });
};

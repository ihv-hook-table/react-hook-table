import { use } from 'react';
import { ColumnProps, TableRecord } from '../../../../types';
import { isFunction, toArray } from '../../../../utils';
import { TableOptionsContext } from '../../../../context/table-options-context';
import { Value, TableHead } from '../../../default-components';

type HeaderCellProps<T extends TableRecord = TableRecord> = {
  column: ColumnProps<T>;
};

export const Cell = <T extends TableRecord = TableRecord>({
  column,
  isMultiValue,
}: HeaderCellProps<T> & { isMultiValue: boolean }) => {
  const { alignment = 'left' } = column || {};

  return (
    <TableHead alignment={alignment} isMultiValue={isMultiValue}>
      <CellValue {...column} />
    </TableHead>
  );
};

const CellValue = <T extends TableRecord = TableRecord>({
  accessor,
  header,
}: ColumnProps<T>) => {
  const { translate } = use(TableOptionsContext) || {};
  const headerLabel = header ?? accessor;

  const labelsArray = toArray(headerLabel) || '';

  return labelsArray.map((label, idx) => {
    const isSecondaryLabel = idx !== 0;

    const value = isFunction(translate) && label ? translate(label) : label;

    return (
      <Value key={idx} isSecondaryValue={isSecondaryLabel}>
        {value}
      </Value>
    );
  });
};

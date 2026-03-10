import { use } from 'react';
import type { ColumnProps, TableRecord } from '../../../../types';
import { isFunction, toArray, getFirst } from '../../../../utils';
import { TableOptionsContext } from '../../../../context/options-context/options-context';
import { Value, TableHead } from '../../../default-components';
import { RowSelect } from '@/hook-table/components/default-components/row-select';
import { useSelectContext } from '@/hook-table/context/select-context/select-context';
import { useTableData } from '@/hook-table/context/data-context/data-context';
import { useLoadingContext } from '@/hook-table/context/loading-context/loading-context';

type HeaderCellProps<T extends TableRecord = TableRecord> = {
  column: ColumnProps<T>;
};

export const Cell = <T extends TableRecord = TableRecord>({
  column,
}: HeaderCellProps<T>) => {
  const { alignment = 'left', accessor, sortAccessor, select } = column || {};

  // Determine sortAccessor key
  const sortAccessorKey = sortAccessor ?? getFirst(accessor);

  const { state, selectAll, deselectAll, selectActions } = useSelectContext();
  const data = useTableData();
  const { isLoading } = useLoadingContext();

  const hasSelectActions = Boolean(selectActions?.length);
  const rowCount = data?.length ?? 0;
  const allSelected = rowCount > 0 && state.size === rowCount;
  const indeterminate = state.size > 0 && state.size < rowCount;
  const disableSelectAll = isLoading || rowCount === 0;

  const toggleAll = allSelected ? deselectAll : selectAll;

  const togglePayload = new Map(
    data?.map(item => [sortAccessorKey ? item[sortAccessorKey] : item, item]) ||
      [],
  );

  return (
    <TableHead
      alignment={alignment}
      sortAccessor={!select ? sortAccessorKey : undefined}
    >
      {select && hasSelectActions ? (
        <RowSelect
          accessor={sortAccessorKey}
          toggle={() => {
            if (disableSelectAll) return;
            toggleAll(togglePayload);
          }}
          isSelected={allSelected}
          indeterminate={indeterminate}
          disabled={disableSelectAll}
        />
      ) : (
        <CellValue {...column} />
      )}
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

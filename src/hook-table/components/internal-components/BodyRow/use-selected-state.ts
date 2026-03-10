import { useSelectContext } from '@/hook-table/context/select-context/select-context';
import { TableRecord } from '@/hook-table/types';

export const useSelectedState = <T extends TableRecord = TableRecord>({
  rowData,
}: {
  rowData: T;
}) => {
  const { selectRow, deselectRow, state, selectActions } =
    useSelectContext<T>();

  const toggle = (accessor: keyof T | undefined) => {
    if (!accessor || !rowData || !Object.keys(rowData).length) return;

    return state.get(rowData[accessor])
      ? deselectRow(rowData[accessor])
      : selectRow(rowData[accessor], rowData);
  };

  const isSelected = (accessor: keyof T | undefined) => {
    if (!accessor || !rowData || !Object.keys(rowData).length) return false;

    return !!state.get(rowData[accessor]);
  };

  return {
    toggle,
    isSelected,
    hasSelectActions: Boolean(selectActions?.length),
  };
};

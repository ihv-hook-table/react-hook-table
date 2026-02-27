import { Checkbox } from '@/components/ui/checkbox';
import { TableRecord, useSelectContext } from '@/hook-table';

type Props<T extends TableRecord = TableRecord> = {
  rowData?: T;
  accessor: keyof T;
};

// Element that expands the row when clicked.
// If multiple expanders are used, the identifier prop can be used to differentiate them.
export const RowSelect = <T extends TableRecord = TableRecord>({
  rowData,
  accessor,
}: Props<T>) => {
  const { selectRow, deselectRow, state } = useSelectContext<T>();

  console.log(state);

  const toggle = () => {
    if (!accessor || !rowData || !Object.keys(rowData).length) return;

    return state.get(rowData[accessor])
      ? deselectRow(rowData[accessor])
      : selectRow(rowData[accessor], rowData);
  };

  return (
    <div className="flex justify-center">
      <Checkbox
        checked={rowData && !!state.get(rowData[accessor])}
        onCheckedChange={() => toggle()}
      />
    </div>
  );
};

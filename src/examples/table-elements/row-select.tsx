import { Checkbox } from '@/components/ui/checkbox';
import { TableRecord } from '@/hook-table';

type Props<T extends TableRecord = TableRecord> = {
  rowData?: T;
  accessor: keyof T | undefined;
  toggle?: () => void;
  isSelected: boolean;
  indeterminate: boolean;
  disabled?: boolean;
};

// Element that expands the row when clicked.
// If multiple expanders are used, the identifier prop can be used to differentiate them.
export const RowSelect = <T extends TableRecord = TableRecord>({
  toggle,
  isSelected,
  disabled,
  indeterminate = false,
}: Props<T>) => {
  return (
    <div className="flex justify-center">
      <Checkbox
        checked={isSelected}
        onCheckedChange={toggle}
        indeterminate={indeterminate}
        disabled={disabled}
      />
    </div>
  );
};

import { useCustomComponent } from '@/hook-table/hooks/use-custom-component';
import { CustomRenderer } from './custom-renderer';
import { useSelectContext } from '@/hook-table/context/select-context/select-context';
import { TableRecord } from '@/hook-table/types';

type Props<T extends TableRecord = TableRecord> = {
  disabled?: boolean;
  rowData?: T;
  accessor: keyof T;
};

export const RowSelect = <T extends TableRecord = TableRecord>(
  props: Props<T>,
) => {
  const CustomRowSelect = useCustomComponent('RowSelect');

  if (CustomRowSelect) {
    return <CustomRenderer Component={CustomRowSelect} props={props} />;
  }

  return <InnerRowSelect {...props} />;
};

const InnerRowSelect = <T extends TableRecord = TableRecord>({
  disabled,
  rowData,
  accessor,
}: Props<T>) => {
  const { selectRow, deselectRow, state } = useSelectContext<T>();

  const toggle = () => {
    if (!accessor || !rowData || !Object.keys(rowData).length) return;

    return state.get(rowData[accessor])
      ? deselectRow(rowData[accessor])
      : selectRow(rowData[accessor], rowData);
  };

  return (
    <input
      type="checkbox"
      checked={rowData && !!state.get(rowData[accessor])}
      onChange={toggle}
      disabled={disabled}
    />
  );
};

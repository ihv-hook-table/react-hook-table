import { useCustomComponent } from '@/hook-table/hooks/use-custom-component';
import { CustomRenderer } from './custom-renderer';
import { TableRecord } from '@/hook-table/types';

type Props<T extends TableRecord = TableRecord> = {
  disabled?: boolean;
  accessor: keyof T | undefined;
  isSelected: boolean;
  indeterminate: boolean;
  toggle?: () => void;
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
  isSelected,
  toggle,
}: Props<T>) => {
  return (
    <input
      type="checkbox"
      checked={!!isSelected}
      onChange={toggle}
      disabled={disabled}
    />
  );
};

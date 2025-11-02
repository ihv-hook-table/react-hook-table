import { ComponentProps } from 'react';
import { clsx } from '../../utils';
import { ColumnAlignmentProps } from '../../types';
import { useCustomComponent } from '@/hook-table/hooks/use-custom-component';
import { CustomRenderer } from './custom-renderer';

type Props = ComponentProps<'td'> &
  ColumnAlignmentProps & {
    expandable?: boolean;
    isSubRow?: boolean;
    wrap?: boolean;
  };

export const TableData = (props: Props) => {
  const CustomTableData = useCustomComponent<Props>('TableData');

  if (CustomTableData) {
    return <CustomRenderer Component={CustomTableData} props={props} />;
  }

  const {
    alignment = 'left',
    isMultiValue = false,
    expandable,
    isSubRow = false,
    wrap = false,
    ...rest
  } = props;

  return (
    <td
      className={clsx(
        !expandable && `align-${alignment}`,
        !expandable && isMultiValue && 'multi-line',
        expandable && 'expandable',
        isSubRow && 'subrow',
        wrap && 'wrap',
      )}
      {...rest}
    />
  );
};

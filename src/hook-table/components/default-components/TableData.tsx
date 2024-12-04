import { ComponentProps } from 'react';
import { useCustomComponent } from '../../context/use-custom-component';
import { clsx } from '../../utils';
import { ColumnAlignmentProps } from '../../types';

type Props = ComponentProps<'td'> &
  ColumnAlignmentProps & {
    expandable?: boolean;
    isSubRow?: boolean;
    wrap: boolean;
  };

export const TableData = (props: Props) => {
  const CustomTableData = useCustomComponent<Props>('TableData');

  if (CustomTableData) {
    return <CustomTableData {...props} />;
  }

  const {
    alignment = 'left',
    isMultiValue,
    expandable,
    isSubRow,
    wrap,
    ...rest
  } = props;

  return (
    <td
      {...rest}
      className={clsx(
        !expandable && `align-${alignment}`,
        !expandable && isMultiValue && 'multi-line',
        expandable && 'expandable',
        isSubRow && 'subrow',
        wrap && 'wrap',
      )}
    />
  );
};

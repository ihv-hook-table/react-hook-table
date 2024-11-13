import { ComponentProps } from 'react';
import { useCustomComponent } from '../../context/use-custom-component';
import { clsx } from '../../utils';
import { ColumnAlignment } from '../../types';

type Props = ComponentProps<'td'> & {
  alignment?: ColumnAlignment;
  isMulti?: boolean;
  expandable?: boolean;
};

export const TableData = (props: Props) => {
  const CustomTableData = useCustomComponent<Props>('TableData');

  if (CustomTableData) {
    return <CustomTableData {...props} />;
  }

  const { alignment = 'left', isMulti, expandable, ...rest } = props;

  return (
    <td
      {...rest}
      className={clsx(
        !expandable && `align-${alignment}`,
        !expandable && isMulti && 'multi-line',
        expandable && 'expandable',
      )}
    />
  );
};

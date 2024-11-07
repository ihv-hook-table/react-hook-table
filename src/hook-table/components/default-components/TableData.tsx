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
  const TableData = useCustomComponent<Props>('TableData');

  if (TableData) {
    return <TableData {...props} />;
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

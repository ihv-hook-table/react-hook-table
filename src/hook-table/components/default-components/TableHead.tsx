import { ComponentProps } from 'react';
import { useCustomComponent } from '../../context/use-custom-component';
import { clsx } from '../../utils';
import { ColumnAlignment } from '../../types';

type Props = ComponentProps<'th'> & {
  alignment?: ColumnAlignment;
  isMulti?: boolean;
};

export const TableHead = (props: Props) => {
  const TableHead = useCustomComponent<Props>('TableHead');

  if (TableHead) {
    return <TableHead {...props} />;
  }

  const { alignment = 'left', isMulti, ...rest } = props;

  return (
    <th
      {...rest}
      className={clsx(`align-${alignment}`, isMulti && 'multi-line')}
    />
  );
};

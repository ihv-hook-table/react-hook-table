import { ComponentProps } from 'react';
import { useCustomComponent } from '../../context/use-custom-component';
import { clsx } from '../../utils';
import { ColumnAlignment } from '../../types';

type Props = ComponentProps<'th'> & {
  alignment?: ColumnAlignment;
  isMulti?: boolean;
};

export const TableHead = (props: Props) => {
  const CustomTableHead = useCustomComponent<Props>('TableHead');

  if (CustomTableHead) {
    return <CustomTableHead {...props} />;
  }

  const { alignment = 'left', isMulti, ...rest } = props;

  return (
    <th
      {...rest}
      className={clsx(`align-${alignment}`, isMulti && 'multi-line')}
    />
  );
};

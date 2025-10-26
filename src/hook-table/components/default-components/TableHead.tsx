import { ComponentProps } from 'react';
import { clsx } from '../../utils';
import { ColumnAlignmentProps } from '../../types';
import { useCustomComponent } from '@/hook-table/hooks/use-custom-component';

type Props = ComponentProps<'th'> &
  ColumnAlignmentProps & { accessor?: string };

export const TableHead = (props: Props) => {
  const CustomTableHead = useCustomComponent<Props>('TableHead');

  if (CustomTableHead) {
    return <CustomTableHead {...props} />;
  }

  const { alignment = 'left', isMultiValue, ...rest } = props;

  return (
    <th
      className={clsx(`align-${alignment}`, isMultiValue && 'multi-line')}
      {...rest}
    />
  );
};

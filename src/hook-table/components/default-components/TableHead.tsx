import { ComponentProps } from 'react';
import { useCustomComponent } from '../../context/use-custom-component';
import { clsx } from '../../utils';
import { ColumnAlignmentProps } from '../../types';

type Props = ComponentProps<'th'> & ColumnAlignmentProps;

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

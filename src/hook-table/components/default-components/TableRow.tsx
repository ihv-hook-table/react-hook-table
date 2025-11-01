import { ComponentProps } from 'react';
import { clsx } from '../../utils';
import { useCustomComponent } from '@/hook-table/hooks/use-custom-component';

type Props = ComponentProps<'tr'> & {
  subrow?: boolean;
  expanded?: boolean;
};

export const TableRow = (props: Props) => {
  const CustomTableRow = useCustomComponent<Props>('TableRow');

  if (CustomTableRow) {
    return <CustomTableRow {...props} />;
  }

  const { className, subrow, expanded, ...rest } = props;

  return (
    <tr
      className={clsx(subrow && 'subrow', expanded && 'expanded', className)}
      {...rest}
    />
  );
};

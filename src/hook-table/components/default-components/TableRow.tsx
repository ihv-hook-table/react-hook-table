import { ComponentProps } from 'react';
import { clsx } from '../../utils';
import { useCustomComponent } from '@/hook-table/hooks/use-custom-component';
import { CustomRenderer } from './custom-renderer';

type Props = ComponentProps<'tr'> & {
  subrow?: boolean;
};

export const TableRow = (props: Props) => {
  const CustomTableRow = useCustomComponent<Props>('TableRow');

  if (CustomTableRow) {
    return <CustomRenderer Component={CustomTableRow} props={props} />;
  }

  const { className, subrow, ...rest } = props;

  return <tr className={clsx(subrow && 'subrow', className)} {...rest} />;
};

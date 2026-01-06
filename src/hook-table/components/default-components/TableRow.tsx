import { ComponentProps } from 'react';
import { useCustomComponent } from '@/hook-table/hooks/use-custom-component';
import { CustomRenderer } from './custom-renderer';

type Props = ComponentProps<'tr'>;

export const TableRow = (props: Props) => {
  const CustomTableRow = useCustomComponent<Props>('TableRow');

  if (CustomTableRow) {
    return <CustomRenderer Component={CustomTableRow} props={props} />;
  }

  return <tr {...props} />;
};

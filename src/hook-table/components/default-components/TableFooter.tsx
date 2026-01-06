import { useCustomComponent } from '@/hook-table/hooks/use-custom-component';
import { ComponentProps } from 'react';
import { CustomRenderer } from './custom-renderer';

type Props = ComponentProps<'tfoot'>;

export const TableFooter = (props: Props) => {
  const CustomTableFooter = useCustomComponent<Props>('TableFooter');

  if (CustomTableFooter) {
    return <CustomRenderer Component={CustomTableFooter} props={props} />;
  }

  return <tfoot {...props} />;
};

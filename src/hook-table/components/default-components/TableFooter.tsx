import { useCustomComponent } from '@/hook-table/hooks/use-custom-component';
import { ComponentProps } from 'react';

type Props = ComponentProps<'tfoot'>;

export const TableFooter = (props: Props) => {
  const CustomTableFooter = useCustomComponent<Props>('TableFooter');

  if (CustomTableFooter) {
    return <CustomTableFooter {...props} />;
  }

  return <tfoot {...props} />;
};

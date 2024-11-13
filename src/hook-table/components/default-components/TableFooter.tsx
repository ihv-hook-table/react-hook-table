import { ComponentProps } from 'react';
import { useCustomComponent } from '../../context/use-custom-component';

type TableFooterProps = ComponentProps<'tfoot'>;

export const TableFooter = (props: TableFooterProps) => {
  const CustomTableFooter = useCustomComponent<TableFooterProps>('TableFooter');

  if (CustomTableFooter) {
    return <CustomTableFooter {...props} />;
  }

  return <tfoot {...props} />;
};

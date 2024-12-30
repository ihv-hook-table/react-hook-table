import { ComponentProps } from 'react';
import { useCustomComponent } from '../../context/use-custom-component';

type Props = ComponentProps<'tfoot'>;

export const TableFooter = (props: Props) => {
  const CustomTableFooter = useCustomComponent<Props>('TableFooter');

  if (CustomTableFooter) {
    return <CustomTableFooter {...props} />;
  }

  return <tfoot {...props} />;
};

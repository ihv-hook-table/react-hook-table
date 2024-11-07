import { ComponentProps } from 'react';
import { useCustomComponent } from '../../context/use-custom-component';
import { clsx } from '../../utils';

type Props = ComponentProps<'tr'> & { expanded?: boolean };

export const TableRow = (props: Props) => {
  const TableRow = useCustomComponent<Props>('TableRow');

  if (TableRow) {
    return <TableRow {...props} />;
  }

  const { className, expanded, ...rest } = props;

  return <tr {...rest} className={clsx(className, expanded && 'expanded')} />;
};

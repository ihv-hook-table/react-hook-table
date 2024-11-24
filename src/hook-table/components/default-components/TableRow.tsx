import { ComponentProps } from 'react';
import { useCustomComponent } from '../../context/use-custom-component';
import { clsx } from '../../utils';

type Props = ComponentProps<'tr'> & { subrow?: boolean; expanded?: boolean };

export const TableRow = (props: Props) => {
  const CustomTableRow = useCustomComponent<Props>('TableRow');

  if (CustomTableRow) {
    return <CustomTableRow {...props} />;
  }

  const { className, subrow, expanded, ...rest } = props;

  return (
    <tr
      {...rest}
      className={clsx(subrow && 'subrow', expanded && 'expanded', className)}
    />
  );
};

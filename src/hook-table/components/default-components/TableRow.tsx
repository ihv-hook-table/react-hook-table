import { ComponentProps, use } from 'react';
import { useCustomComponent } from '../../context/use-custom-component';
import { clsx } from '../../utils';
import { PaginationContext } from '@/hook-table/context/pagination-context/pagination-context';

type Props = ComponentProps<'tr'> & {
  subrow?: boolean;
  expanded?: boolean;
  isLoading?: boolean;
};

export const TableRow = (props: Props) => {
  const CustomTableRow = useCustomComponent<Props>('TableRow');
  const { state } = use(PaginationContext) || {};

  if (CustomTableRow) {
    return <CustomTableRow {...props} isLoading={state?.isLoading} />;
  }

  const { className, subrow, expanded, ...rest } = props;

  return (
    <tr
      className={clsx(subrow && 'subrow', expanded && 'expanded', className)}
      {...rest}
    />
  );
};

import { ComponentProps } from 'react';
import { clsx } from '../../utils';
import {
  ColumnAlignmentProps,
  ColumnsAccessor,
  TableRecord,
} from '../../types';
import { useCustomComponent } from '@/hook-table/hooks/use-custom-component';
import { CustomRenderer } from './custom-renderer';

type Props<T extends TableRecord = TableRecord> = ComponentProps<'th'> &
  ColumnAlignmentProps & {
    accessor?: ColumnsAccessor<T> | ColumnsAccessor<T>[];
  };

export const TableHead = <T extends TableRecord = TableRecord>(
  props: Props<T>,
) => {
  const CustomTableHead = useCustomComponent<Props>('TableHead');

  if (CustomTableHead) {
    return <CustomRenderer Component={CustomTableHead} props={props} />;
  }

  const { alignment = 'left', isMultiValue, ...rest } = props;

  return (
    <th
      className={clsx(`align-${alignment}`, isMultiValue && 'multi-line')}
      {...rest}
    />
  );
};

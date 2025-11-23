import { ComponentProps } from 'react';
import { ColumnAlignmentProps, ColumnAccessor, TableRecord } from '../../types';
import { useCustomComponent } from '@/hook-table/hooks/use-custom-component';
import { CustomRenderer } from './custom-renderer';

type Props<T extends TableRecord = TableRecord> = ComponentProps<'th'> &
  ColumnAlignmentProps & {
    accessor?: ColumnAccessor<T> | ColumnAccessor<T>[];
    sortAccessor?: ColumnAccessor<T>;
  };

export const TableHead = <T extends TableRecord = TableRecord>(
  props: Props<T>,
) => {
  const CustomTableHead = useCustomComponent<Props>('TableHead');

  if (CustomTableHead) {
    return <CustomRenderer Component={CustomTableHead} props={props} />;
  }

  return <th {...props} />;
};

import { useMemo } from 'react';
import { ColumnProps, TableRowType } from '../types';
import { Column } from './Column/Column';

export const useCreateColumn = <
  T extends TableRowType = TableRowType,
  F extends TableRowType = TableRowType,
>() => {
  const HookColumn = useMemo(
    () => (props: ColumnProps<T, F>) => <Column {...props} />,
    [],
  );

  return { Column: HookColumn };
};

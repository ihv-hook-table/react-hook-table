import { useMemo } from 'react';
import { ColumnProps, FormatOptions, TableRecord } from '../types';
import { Column } from './Column/Column';

export const useCreateColumn = <
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
>() => {
  const HookColumn = useMemo(
    () => (props: ColumnProps<T, F>) => <Column {...props} />,
    [],
  );

  return { Column: HookColumn };
};

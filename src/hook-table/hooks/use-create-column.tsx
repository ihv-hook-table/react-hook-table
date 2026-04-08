import { useMemo } from 'react';
import type { ColumnProps, FormatOptions, TableRecord } from '../types';

export const useCreateColumn = <
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
>() => {
  const Column = useMemo(() => (_props: ColumnProps<T, F>) => null, []);

  return { Column };
};

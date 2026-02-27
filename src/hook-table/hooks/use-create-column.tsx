import { useMemo } from 'react';
import type { ColumnProps, FormatOptions, TableRecord } from '../types';

export const useCreateColumn = <
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
>() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const Column = useMemo(() => (_props: ColumnProps<T, F>) => null, []);

  return { Column };
};

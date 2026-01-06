import { ColumnProps, FormatOptions, TableRecord } from '@/hook-table/types';
import { createContext, use } from 'react';

const createColumnContext = <
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
>() => createContext<ColumnProps<T, F>[] | undefined>(undefined);

export const ColumnContext = createColumnContext();

export const useColumnContext = () => use(ColumnContext);

import { TableRecord } from '@/hook-table/types';
import { createContext, use } from 'react';

type SelectContextType<T> = {
  state: Map<T[keyof T], T>;
  selectRow: (rowIndex: T[keyof T], row: T) => void;
  deselectRow: (rowIndex: T[keyof T]) => void;
  selectAll: (rows: Map<T[keyof T], T>) => void;
  deselectAll: () => void;
};

export const SelectContext = createContext<SelectContextType<TableRecord>>({
  state: new Map(),
  selectRow: () => {},
  deselectRow: () => {},
  selectAll: () => {},
  deselectAll: () => {},
});

export const useSelectContext = <T extends TableRecord = TableRecord>() =>
  use(SelectContext) as unknown as SelectContextType<T>;

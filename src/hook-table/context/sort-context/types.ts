import { TableRecord } from '@/hook-table/types';

export type SortDirection = 'asc' | 'desc' | 'none';

export type SortState<T extends TableRecord = TableRecord> = {
  sortAccessor?: keyof T;
  sortDirection: SortDirection;
};

export interface ISortContextProvider<T extends TableRecord = TableRecord>
  extends SortState<T> {
  sortingEnabled?: boolean;
  onSort: (sortAccessor: keyof T) => void;
}

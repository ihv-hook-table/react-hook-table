import { ColumnsAccessor, TableRecord } from '@/hook-table/types';

export type SortDirection = 'asc' | 'desc' | 'none';

export type SortState<T extends TableRecord = TableRecord> = {
  sortAccessor?: ColumnsAccessor<T> | ColumnsAccessor<T>[];
  sortDirection: SortDirection;
};

export interface ISortContextProvider<T extends TableRecord = TableRecord>
  extends SortState<T> {
  sortingEnabled?: boolean;
  onSort: (sortAccessor: ColumnsAccessor<T> | ColumnsAccessor<T>[]) => void;
}

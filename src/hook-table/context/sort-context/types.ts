import { ColumnAccessor, SortDirection, TableRecord } from '@/hook-table/types';

export type SortState<T extends TableRecord = TableRecord> = {
  sortAccessor?: ColumnAccessor<T>;
  sortDirection: SortDirection;
};

export interface ISortContextProvider<T extends TableRecord = TableRecord>
  extends SortState<T> {
  sortingEnabled?: boolean;
  onSort: (sortAccessor: ColumnAccessor<T>) => void;
}

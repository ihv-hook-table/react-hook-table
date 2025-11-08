import {
  ColumnsAccessor,
  SortDirection,
  TableRecord,
} from '@/hook-table/types';

export type SortState<T extends TableRecord = TableRecord> = {
  sortAccessor?: ColumnsAccessor<T> | ColumnsAccessor<T>[];
  sortDirection: SortDirection;
};

export interface ISortContextProvider<T extends TableRecord = TableRecord>
  extends SortState<T> {
  sortingEnabled?: boolean;
  onSort: (sortAccessor: ColumnsAccessor<T> | ColumnsAccessor<T>[]) => void;
}

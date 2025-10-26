import { TableRecord } from '@/hook-table/types';
import { SortDirection } from './types';

export enum ActionTypes {
  SET_SORT_ACCESSOR = 'SET_SORT_ACCESSOR',
  SET_SORT_DIRECTION = 'SET_SORT_DIRECTION',
}

type SetSortAccessor<T extends TableRecord = TableRecord> = {
  type: ActionTypes.SET_SORT_ACCESSOR;
  sortAccessor: keyof T;
  sortDirection?: SortDirection;
};

type SetSortDirection = {
  type: ActionTypes.SET_SORT_DIRECTION;
  sortDirection: SortDirection;
};

export type Actions = SetSortAccessor | SetSortDirection;

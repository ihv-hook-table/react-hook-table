import { TableRecord } from '@/hook-table/types';

export enum ActionTypes {
  SELECT_ROW = 'SELECT_ROW',
  DESELECT_ROW = 'DESELECT_ROW',
  SELECT_ALL = 'SELECT_ALL',
  DESELECT_ALL = 'DESELECT_ALL',
}

type SelectRowAction<T extends TableRecord> = {
  type: ActionTypes.SELECT_ROW;
  payload: {
    rowIndex: T[keyof T];
    row: T;
  };
};

type DeselectRowAction<T extends TableRecord> = {
  type: ActionTypes.DESELECT_ROW;
  payload: {
    rowIndex: T[keyof T];
  };
};

type SelectAllAction<T extends TableRecord> = {
  type: ActionTypes.SELECT_ALL;
  payload: Map<T[keyof T], T>;
};

type DeselectAllAction = {
  type: ActionTypes.DESELECT_ALL;
};

export type Actions<T extends TableRecord> =
  | SelectRowAction<T>
  | DeselectRowAction<T>
  | SelectAllAction<T>
  | DeselectAllAction;

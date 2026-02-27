import { TableRecord } from '@/hook-table/types';
import { Actions, ActionTypes } from './select-actions';

export type State<T extends TableRecord> = {
  selectedRows: Map<T[keyof T], T>;
};

export const reducer = <T extends TableRecord>(
  state: State<T>,
  action: Actions<T>,
): State<T> => {
  switch (action.type) {
    case ActionTypes.SELECT_ROW: {
      const nextSelectedRows = new Map(state.selectedRows);
      nextSelectedRows.set(action.payload.rowIndex, action.payload.row);

      return {
        ...state,
        selectedRows: nextSelectedRows,
      };
    }
    case ActionTypes.DESELECT_ROW: {
      const nextSelectedRows = new Map(state.selectedRows);
      nextSelectedRows.delete(action.payload.rowIndex);

      return {
        ...state,
        selectedRows: nextSelectedRows,
      };
    }
    case ActionTypes.SELECT_ALL:
      return {
        ...state,
        selectedRows: new Map(action.payload),
      };
    case ActionTypes.DESELECT_ALL:
      return {
        ...state,
        selectedRows: new Map(),
      };
    default:
      return state;
  }
};

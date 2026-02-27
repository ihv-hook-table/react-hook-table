import { ReactNode, useReducer } from 'react';
import { TableRecord } from '@/hook-table/types';
import { SelectContext } from './select-context';
import { reducer } from './select-reducer';
import { ActionTypes } from './select-actions';

type Props = {
  children: ReactNode;
};

export const SelectContextProvider = <T extends TableRecord = TableRecord>({
  children,
}: Props) => {
  const [state, dispatch] = useReducer(reducer<T>, {
    selectedRows: new Map<T[keyof T], T>(),
  });

  const selectRow = (rowIndex: T[keyof T], row: T) => {
    dispatch({
      type: ActionTypes.SELECT_ROW,
      payload: {
        rowIndex,
        row,
      },
    });
  };

  const deselectRow = (rowIndex: T[keyof T]) => {
    dispatch({
      type: ActionTypes.DESELECT_ROW,
      payload: {
        rowIndex,
      },
    });
  };

  const selectAll = (rows: Map<T[keyof T], T>) => {
    dispatch({
      type: ActionTypes.SELECT_ALL,
      payload: rows,
    });
  };

  const deselectAll = () => {
    dispatch({
      type: ActionTypes.DESELECT_ALL,
    });
  };

  return (
    <SelectContext
      value={{
        state: state.selectedRows,
        selectRow: selectRow as (rowIndex: unknown, row: TableRecord) => void,
        deselectRow: deselectRow as (rowIndex: unknown) => void,
        selectAll: selectAll as (rows: Map<unknown, TableRecord>) => void,
        deselectAll: deselectAll as () => void,
      }}
    >
      {children}
    </SelectContext>
  );
};

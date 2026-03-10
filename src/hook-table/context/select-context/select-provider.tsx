import { ReactNode, useMemo, useReducer } from 'react';
import { TableRecord } from '@/hook-table/types';
import { SelectContext } from './select-context';
import { reducer } from './select-reducer';
import { ActionTypes } from './select-actions';

type Props<T extends TableRecord = TableRecord> = {
  children: ReactNode;
  selectActions?: {
    action?: string;
    label: string;
    onClick: (selectedRows: T[]) => void | Promise<void>;
  }[];
};

export const SelectContextProvider = <T extends TableRecord = TableRecord>({
  children,
  selectActions,
}: Props<T>) => {
  const [state, dispatch] = useReducer(reducer<T>, {
    selectedRows: new Map<T[keyof T], T>(),
  });

  const currentSelectedRows = useMemo(
    () => Array.from(state.selectedRows.values()),
    [state.selectedRows],
  );

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

  const wrappedSelectActions = useMemo(
    () =>
      selectActions?.map(({ onClick, ...action }) => ({
        ...action,
        onClick: async (selectedRows?: T[]) => {
          await Promise.resolve(onClick(selectedRows ?? currentSelectedRows));
          deselectAll();
        },
      })),
    [currentSelectedRows, selectActions],
  );

  return (
    <SelectContext
      value={{
        state: state.selectedRows,
        selectRow: selectRow as (rowIndex: unknown, row: TableRecord) => void,
        deselectRow: deselectRow as (rowIndex: unknown) => void,
        selectAll: selectAll as (rows: Map<unknown, TableRecord>) => void,
        deselectAll: deselectAll as () => void,
        selectActions: wrappedSelectActions as {
          action?: string;
          label: string;
          onClick: (selectedRows?: TableRecord[]) => void | Promise<void>;
        }[],
      }}
    >
      {children}
    </SelectContext>
  );
};

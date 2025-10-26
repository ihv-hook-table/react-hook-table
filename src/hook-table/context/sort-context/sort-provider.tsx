import { ReactNode, useReducer } from 'react';
import { SortingContext } from './sort-context';
import { ISortContextProvider } from './types';
import { reducer } from './sort-reducer';
import { TableRecord } from '@/hook-table/types';
import { ActionTypes } from './sort-actions';

type Props<T extends TableRecord = TableRecord> = {
  children: ReactNode;
  initialState?: Partial<ISortContextProvider<T>>;
};

export const SortingContextProvider = <T extends TableRecord = TableRecord>({
  children,
  initialState,
}: Props<T>) => {
  const [state, dispatch] = useReducer(reducer, {
    sortAccessor: initialState?.sortAccessor,
    sortDirection: initialState?.sortDirection ?? 'none',
  });

  const onSort = (sortAccessor: keyof T) => {
    if (!state?.sortAccessor) {
      dispatch({
        type: ActionTypes.SET_SORT_ACCESSOR,
        sortAccessor,
      });
    }

    if (state.sortAccessor === sortAccessor) {
      const newDirection =
        state.sortDirection === 'asc'
          ? 'desc'
          : state.sortDirection === 'desc'
            ? 'none'
            : 'asc';

      dispatch({
        type: ActionTypes.SET_SORT_DIRECTION,
        sortDirection: newDirection,
      });
    } else {
      dispatch({
        type: ActionTypes.SET_SORT_ACCESSOR,
        sortAccessor,
      });
    }
  };

  return (
    <SortingContext
      value={{ ...state, onSort, sortingEnabled: initialState?.sortingEnabled }}
    >
      {children}
    </SortingContext>
  );
};

import { ReactNode, use, useReducer } from 'react';
import { reducer } from './pagination-reducer';
import { PaginationContext } from './pagination-context';
import { ActionTypes } from './pagination-actions';
import { TableOptionsContext } from '../table-options-context';
import { isFunction } from '@/hook-table/utils';

type Props = {
  children: ReactNode;
  initialState?: {
    isLastPage?: boolean;
    numberOfRecords?: number;
    onPaginate?: (pageNumber: number, pageSize: number) => void;
    paginate?: boolean;
    pageNumber?: number;
    pageSize?: number;
  };
};

const getPageCount = (numberOfRecords?: number, pageSize?: number) => {
  if (!numberOfRecords || !pageSize) return 0;
  return Math.ceil(numberOfRecords / pageSize);
};

export const PaginationContextProvider = ({
  children,
  initialState,
}: Props) => {
  const { pagination } = use(TableOptionsContext) || {};

  const currentPageSize =
    initialState?.pageSize || pagination?.defaultPageSize || 10;

  const isManualPagination =
    initialState?.onPaginate && isFunction(initialState.onPaginate);

  const [state, dispatch] = useReducer(reducer, {
    pageNumber: initialState?.pageNumber || 1,
    pageSize: currentPageSize,
    paginate: !!initialState?.paginate || isManualPagination,
    pageCount: getPageCount(initialState?.numberOfRecords, currentPageSize),
    isLastPage: initialState?.isLastPage,
    isManualPagination,
  });

  const search = (pageNumber: number, pageSize: number) => {
    if (initialState?.onPaginate && isFunction(initialState.onPaginate)) {
      return initialState?.onPaginate(pageNumber, pageSize);
    }
  };

  const goToPage = (pageNumber: number) => {
    dispatch({ type: ActionTypes.PAGE_NUMBER, pageNumber });
    if (isManualPagination) {
      search(pageNumber, state.pageSize);
    }
  };

  const nextPage = () => {
    dispatch({ type: ActionTypes.NEXT });
    if (isManualPagination) {
      setTimeout(() => {
        search(state.pageNumber + 1, state.pageSize);
      });
    }
  };

  const previousPage = () => {
    dispatch({ type: ActionTypes.PREVIOUS });
    if (isManualPagination) {
      search(state.pageNumber - 1, state.pageSize);
    }
  };

  const setPageSize = (pageSize: number) => {
    dispatch({
      type: ActionTypes.PAGE_SIZE,
      pageSize,
      pageCount: getPageCount(initialState?.numberOfRecords, pageSize),
    });
    if (isManualPagination) {
      search(1, pageSize);
    }
  };

  return (
    <PaginationContext
      value={{
        state,
        nextPage,
        previousPage,
        goToPage,
        setPageSize,
      }}
    >
      {children}
    </PaginationContext>
  );
};

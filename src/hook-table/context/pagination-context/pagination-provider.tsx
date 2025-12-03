import { ReactNode, useReducer } from 'react';
import { reducer } from './pagination-reducer';
import { PaginationContext } from './pagination-context';
import { ActionTypes } from './pagination-actions';
import { isFunction } from '@/hook-table/utils';
import { useTableOptionsContext } from '../options-context/options-context';
import { PaginationValue } from '@/hook-table/types';

export type PaginationState = {
  isLastPage?: boolean;
  pageNumber?: number;
  pageSize?: number;
  onPaginate?: (value: PaginationValue) => Promise<void>;
  numberOfRecords?: number;
};

type Props = {
  children: ReactNode;
  initialState?: PaginationState;
};

const getPageCount = (numberOfRecords?: number, pageSize?: number) => {
  if (!numberOfRecords || !pageSize) return 0;
  return Math.ceil(numberOfRecords / pageSize);
};

export const PaginationContextProvider = ({
  children,
  initialState,
}: Props) => {
  const { pagination } = useTableOptionsContext() || {};

  const currentPageSize =
    initialState?.pageSize || pagination?.defaultPageSize || 10;

  const isServersidePagination =
    initialState?.onPaginate && isFunction(initialState.onPaginate);

  const [state, dispatch] = useReducer(reducer, {
    pageNumber: initialState?.pageNumber || 1,
    pageSize: currentPageSize,
    paginate: !!initialState?.onPaginate || isServersidePagination,
    pageCount: getPageCount(initialState?.numberOfRecords, currentPageSize),
    isLastPage: initialState?.isLastPage,
    isServersidePagination,
  });

  const search = (pageNumber: number, pageSize: number) => {
    const paginationFunction =
      initialState?.onPaginate || pagination?.onPaginate;

    if (paginationFunction && isFunction(paginationFunction)) {
      paginationFunction({ pageNumber, pageSize });
    }
  };

  const goToPage = (pageNumber: number) => {
    if (isServersidePagination) {
      return search(pageNumber, state.pageSize);
    }

    dispatch({
      type: ActionTypes.PAGE_NUMBER,
      pageNumber,
    });
  };

  const nextPage = () => {
    if (isServersidePagination) {
      return search(state.pageNumber + 1, state.pageSize);
    }

    dispatch({
      type: ActionTypes.NEXT,
    });
  };

  const previousPage = () => {
    if (isServersidePagination) {
      return search(state.pageNumber - 1, state.pageSize);
    }

    dispatch({
      type: ActionTypes.PREVIOUS,
    });
  };

  const setPageSize = (pageSize: number) => {
    if (isServersidePagination) {
      return search(1, pageSize);
    }

    dispatch({
      type: ActionTypes.PAGE_SIZE,
      pageSize,
      pageCount: getPageCount(initialState?.numberOfRecords, pageSize),
    });
  };

  return (
    <PaginationContext
      value={{
        state,
        nextPage,
        previousPage,
        goToPage,
        setPageSize,
        search,
      }}
    >
      {children}
    </PaginationContext>
  );
};

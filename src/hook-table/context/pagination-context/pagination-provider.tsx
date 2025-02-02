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
    onPaginate?: (pageNumber: number, pageSize: number) => Promise<void>;
    paginate?: boolean;
    pageNumber?: number;
    pageSize?: number;
    isLoading?: boolean;
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
    isLoading: !!initialState?.isLoading,
  });

  const search = async (pageNumber: number, pageSize: number) => {
    if (initialState?.onPaginate && isFunction(initialState.onPaginate)) {
      return await initialState?.onPaginate(pageNumber, pageSize);
    }
  };

  const setLoadingFalse = () =>
    dispatch({ type: ActionTypes.LOADING, isLoading: false });

  const goToPage = (pageNumber: number) => {
    dispatch({
      type: ActionTypes.PAGE_NUMBER,
      pageNumber,
      isLoading: state.isManualPagination ? true : false,
    });
    if (isManualPagination) {
      return search(pageNumber, state.pageSize)?.finally(setLoadingFalse);
    }
  };

  const nextPage = () => {
    dispatch({
      type: ActionTypes.NEXT,
      isLoading: state.isManualPagination ? true : false,
    });
    if (isManualPagination) {
      return search(state.pageNumber + 1, state.pageSize)?.finally(
        setLoadingFalse,
      );
    }
  };

  const previousPage = () => {
    dispatch({
      type: ActionTypes.PREVIOUS,
      isLoading: state.isManualPagination ? true : false,
    });
    if (isManualPagination) {
      return search(state.pageNumber - 1, state.pageSize)?.finally(
        setLoadingFalse,
      );
    }
  };

  const setPageSize = (pageSize: number) => {
    dispatch({
      type: ActionTypes.PAGE_SIZE,
      pageSize,
      pageCount: getPageCount(initialState?.numberOfRecords, pageSize),
      isLoading: state.isManualPagination ? true : false,
    });
    if (isManualPagination) {
      return search(1, pageSize)?.finally(setLoadingFalse);
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
        search,
        setLoading: (isLoading: boolean) =>
          dispatch({ type: ActionTypes.LOADING, isLoading }),
      }}
    >
      {children}
    </PaginationContext>
  );
};

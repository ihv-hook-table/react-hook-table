import { ReactNode, useReducer } from 'react';
import { reducer } from './pagination-reducer';
import { PaginationContext } from './pagination-context';
import { ActionTypes } from './pagination-actions';
import { isFunction } from '@/hook-table/utils';
import { useTableOptionsContext } from '../options-context/options-context';
import { useLoadingContext } from '../loading-context/loading-context';

type Props = {
  children: ReactNode;
  initialState?: {
    isLastPage?: boolean;
    numberOfRecords?: number;
    onPaginate?: (pageNumber: number, pageSize: number) => Promise<void>;
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
  const { pagination } = useTableOptionsContext() || {};
  const { setLoading } = useLoadingContext();

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

  const search = async (pageNumber: number, pageSize: number) => {
    if (initialState?.onPaginate && isFunction(initialState.onPaginate)) {
      return await initialState?.onPaginate(pageNumber, pageSize);
    }
  };

  const goToPage = (pageNumber: number) => {
    dispatch({
      type: ActionTypes.PAGE_NUMBER,
      pageNumber,
    });

    if (isManualPagination) {
      setLoading?.(true);
      return search(pageNumber, state.pageSize).finally(() =>
        setLoading?.(false),
      );
    }
  };

  const nextPage = () => {
    dispatch({
      type: ActionTypes.NEXT,
    });
    if (isManualPagination) {
      setLoading?.(true);
      return search(state.pageNumber + 1, state.pageSize).finally(() =>
        setLoading?.(false),
      );
    }
  };

  const previousPage = () => {
    dispatch({
      type: ActionTypes.PREVIOUS,
    });
    if (isManualPagination) {
      setLoading?.(true);
      return search(state.pageNumber - 1, state.pageSize).finally(() =>
        setLoading?.(false),
      );
    }
  };

  const setPageSize = (pageSize: number) => {
    dispatch({
      type: ActionTypes.PAGE_SIZE,
      pageSize,
      pageCount: getPageCount(initialState?.numberOfRecords, pageSize),
    });
    if (isManualPagination) {
      setLoading?.(true);
      return search(1, pageSize).finally(() => setLoading?.(false));
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
      }}
    >
      {children}
    </PaginationContext>
  );
};

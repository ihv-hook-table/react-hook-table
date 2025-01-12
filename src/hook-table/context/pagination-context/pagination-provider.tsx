import { ReactNode, use, useReducer } from 'react';
import { reducer } from './pagination-reducer';
import { PaginationContext } from './pagination-context';
import { ActionTypes } from './pagination-actions';
import { TableOptionsContext } from '../table-options-context';

type Props = {
  children: ReactNode;
  initialState?: {
    paginate?: boolean;
    pageNumber?: number;
    pageSize?: number;
    numberOfRecords?: number;
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

  const [state, dispatch] = useReducer(reducer, {
    pageNumber: initialState?.pageNumber || 1,
    pageSize: currentPageSize,
    paginate: initialState?.paginate,
    pageCount: getPageCount(initialState?.numberOfRecords, currentPageSize),
  });

  const goToPage = (pageNumber: number) =>
    dispatch({ type: ActionTypes.PAGE_NUMBER, pageNumber });

  const nextPage = () => dispatch({ type: ActionTypes.NEXT });

  const previousPage = () => dispatch({ type: ActionTypes.PREVIOUS });

  const setPageSize = (pageSize: number) =>
    dispatch({
      type: ActionTypes.PAGE_SIZE,
      pageSize,
      pageCount: getPageCount(initialState?.numberOfRecords, pageSize),
    });

  return (
    <PaginationContext
      value={{ state, nextPage, previousPage, goToPage, setPageSize }}
    >
      {children}
    </PaginationContext>
  );
};

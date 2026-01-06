import { createContext, use } from 'react';

type PaginationState = {
  pageNumber: number;
  pageSize: number;
  paginate?: boolean;
  pageCount?: number;
  isLastPage?: boolean;
  isServersidePagination?: boolean;
};

type PaginationContextType = {
  state: PaginationState;
  setPageSize: (pageSize: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (pageNumber: number) => void;
  search?: (pageNumber: number, pageSize: number) => void;
};

export const PaginationContext = createContext<PaginationContextType>({
  state: {} as PaginationState,
  setPageSize: () => {},
  nextPage: () => {},
  previousPage: () => {},
  goToPage: () => {},
});

export const usePaginationContext = () => use(PaginationContext) || {};

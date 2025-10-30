import { createContext } from 'react';

type PaginationState = {
  pageNumber: number;
  pageSize: number;
  paginate?: boolean;
  pageCount?: number;
  isLastPage?: boolean;
  isManualPagination?: boolean;
};

type PaginationContextType = {
  state: PaginationState;
  setPageSize: (pageSize: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (pageNumber: number) => void;
  search?: (pageNumber: number, pageSize: number) => Promise<void>;
};

export const PaginationContext = createContext<PaginationContextType | null>(
  null,
);

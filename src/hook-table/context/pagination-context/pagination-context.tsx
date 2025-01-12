import { createContext } from 'react';

type State = {
  pageNumber: number;
  pageSize: number;
  paginate?: boolean;
  pageCount?: number;
};

type PaginationContextType = {
  state: State;
  setPageSize: (pageSize: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (pageNumber: number) => void;
};

export const PaginationContext = createContext<PaginationContextType | null>(
  null,
);

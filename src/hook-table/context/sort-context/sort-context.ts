import { createContext, use } from 'react';
import { ISortContextProvider } from './types';

export const SortingContext = createContext<ISortContextProvider>({
  sortAccessor: undefined,
  sortDirection: 'none',
  onSort: () => {},
});

export const useSortingContext = () => use(SortingContext);

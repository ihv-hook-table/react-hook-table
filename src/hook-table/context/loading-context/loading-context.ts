import { createContext, use } from 'react';

type LoadingContextType = {
  isLoading: boolean;
};

export const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
});

export const useLoadingContext = () => use(LoadingContext);

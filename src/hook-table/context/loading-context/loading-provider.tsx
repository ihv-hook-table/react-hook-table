import { ReactNode, useReducer } from 'react';
import { reducer } from './loading-reducer';
import { ActionTypes } from './loading-actions';
import { LoadingContext } from './loading-context';

type Props = {
  children: ReactNode;
  value?: boolean;
};

export const LoadingContextProvider = ({ children, value }: Props) => {
  const [state, dispatch] = useReducer(reducer, value || false);

  return (
    <LoadingContext
      value={{
        isLoading: !!state || !!value,
        setLoading: (isLoading: boolean) =>
          dispatch({ type: ActionTypes.SET_LOADING, isLoading }),
      }}
    >
      {children}
    </LoadingContext>
  );
};

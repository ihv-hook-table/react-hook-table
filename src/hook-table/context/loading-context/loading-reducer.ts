import { Actions, ActionTypes } from './loading-actions';

export const reducer = (state: boolean, actions: Actions) => {
  switch (actions.type) {
    case ActionTypes.SET_LOADING:
      return actions.isLoading;
    default:
      return state;
  }
};

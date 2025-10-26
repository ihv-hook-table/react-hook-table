import { Actions, ActionTypes } from './sort-actions';
import { SortState } from './types';

export const reducer = (state: SortState, actions: Actions): SortState => {
  switch (actions.type) {
    case ActionTypes.SET_SORT_ACCESSOR:
      return {
        ...state,
        sortAccessor: actions.sortAccessor,
        sortDirection:
          // TODO: maybe add default initial sort direction to config
          state?.sortDirection === 'none' ? 'asc' : state.sortDirection,
      };
    case ActionTypes.SET_SORT_DIRECTION:
      return {
        ...state,
        sortDirection: actions.sortDirection,
      };
    default:
      return state;
  }
};

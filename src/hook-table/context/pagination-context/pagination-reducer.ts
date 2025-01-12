import { Actions, ActionTypes } from './pagination-actions';

type State = {
  pageNumber: number;
  pageSize: number;
  paginate?: boolean;
  pageCount?: number;
};

export const reducer = (state: State, actions: Actions) => {
  switch (actions.type) {
    case ActionTypes.PREVIOUS:
      return {
        ...state,
        pageNumber: state.pageNumber - 1,
      };
    case ActionTypes.NEXT:
      return {
        ...state,
        pageNumber: state.pageNumber + 1,
      };
    case ActionTypes.PAGE_NUMBER:
      return {
        ...state,
        pageNumber: actions.pageNumber,
      };
    case ActionTypes.PAGE_SIZE:
      return {
        ...state,
        pageSize: actions.pageSize,
        pageCount: actions.pageCount,
        pageNumber: 1,
      };
    default:
      return state;
  }
};

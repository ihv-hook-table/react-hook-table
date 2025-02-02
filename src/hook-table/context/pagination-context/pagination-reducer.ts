import { Actions, ActionTypes } from './pagination-actions';

type State = {
  pageNumber: number;
  pageSize: number;
  paginate?: boolean;
  pageCount?: number;
  isLastPage?: boolean;
  isManualPagination?: boolean;
  isLoading: boolean;
};

export const reducer = (state: State, actions: Actions) => {
  switch (actions.type) {
    case ActionTypes.LOADING:
      return {
        ...state,
        isLoading: actions.isLoading,
      };
    case ActionTypes.PREVIOUS:
      return {
        ...state,
        pageNumber: state.pageNumber - 1,
        isLoading: state?.isManualPagination ? actions.isLoading : false,
      };
    case ActionTypes.NEXT:
      return {
        ...state,
        pageNumber: state.pageNumber + 1,
        isLoading: state?.isManualPagination ? actions.isLoading : false,
      };
    case ActionTypes.PAGE_NUMBER:
      return {
        ...state,
        pageNumber: actions.pageNumber,
        isLoading: state?.isManualPagination ? actions.isLoading : false,
      };
    case ActionTypes.PAGE_SIZE:
      return {
        ...state,
        pageSize: actions.pageSize,
        pageCount: actions.pageCount,
        pageNumber: 1,
        isLoading: state?.isManualPagination ? actions.isLoading : false,
      };
    default:
      return state;
  }
};

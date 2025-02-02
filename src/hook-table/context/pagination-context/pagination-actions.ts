export enum ActionTypes {
  PAGE_NUMBER = 'PAGE_NUMBER',
  PAGE_SIZE = 'PAGE_SIZE',
  PREVIOUS = 'PREVIOUS',
  NEXT = 'NEXT',
  LOADING = 'LOADING',
}

type LoadingAction = {
  type: ActionTypes.LOADING;
  isLoading: boolean;
};

type NextAction = {
  type: ActionTypes.NEXT;
  isLoading: boolean;
};

type PageNumberAction = {
  type: ActionTypes.PAGE_NUMBER;
  pageNumber: number;
  isLoading: boolean;
};

type PageSizeAction = {
  type: ActionTypes.PAGE_SIZE;
  pageSize: number;
  pageCount: number;
  isLoading: boolean;
};

type PreviousAction = {
  type: ActionTypes.PREVIOUS;
  isLoading: boolean;
};

export type Actions =
  | LoadingAction
  | NextAction
  | PageNumberAction
  | PageSizeAction
  | PreviousAction;

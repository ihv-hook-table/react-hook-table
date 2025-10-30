export enum ActionTypes {
  PAGE_NUMBER = 'PAGE_NUMBER',
  PAGE_SIZE = 'PAGE_SIZE',
  PREVIOUS = 'PREVIOUS',
  NEXT = 'NEXT',
}

type NextAction = {
  type: ActionTypes.NEXT;
};

type PageNumberAction = {
  type: ActionTypes.PAGE_NUMBER;
  pageNumber: number;
};

type PageSizeAction = {
  type: ActionTypes.PAGE_SIZE;
  pageSize: number;
  pageCount: number;
};

type PreviousAction = {
  type: ActionTypes.PREVIOUS;
};

export type Actions =
  | NextAction
  | PageNumberAction
  | PageSizeAction
  | PreviousAction;

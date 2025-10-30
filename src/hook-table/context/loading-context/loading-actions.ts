export enum ActionTypes {
  SET_LOADING = 'SET_LOADING',
}

type LoadingAction = {
  type: ActionTypes.SET_LOADING;
  isLoading: boolean;
};

export type Actions = LoadingAction;

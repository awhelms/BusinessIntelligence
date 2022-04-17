import { Reducer, ReducerAction } from "react";
import { Business } from "../types";
import { ProviderState } from "./types";

export const defaultState: ProviderState = {
  loading: false,
  businesses: [],
  error: null,
};

export enum BusinessAction {
  FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE
}
export interface FetchStartedAction {
  type: BusinessAction;
}
export interface FetchSuccessAction {
  type: BusinessAction;
  payload: Business[];
}
export interface FetchFailureAction {
  type: BusinessAction;
  payload: any;
}

type BusinessActions = FetchStartedAction | FetchSuccessAction | FetchFailureAction

export const reducer: Reducer<ProviderState, BusinessActions> = (state = defaultState, action) => {
  switch (action.type) {
    case BusinessAction.FETCH_STARTED:
      return {
        ...state,
        loading: true,
      };
    case BusinessAction.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        businesses: (action as FetchSuccessAction).payload,
      };
    case BusinessAction.FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: (action as FetchFailureAction).payload,
      };
  }
  return state;
};

export const createLoadingAction = () => ({ type: BusinessAction.FETCH_STARTED });
export const createSuccessAction = (businesses: Business[]) => ({
  type: BusinessAction.FETCH_SUCCESS,
  payload: businesses,
});
export const createFailureAction = (error: any) => ({
  type: BusinessAction.FETCH_FAILURE,
  payload: error,
});

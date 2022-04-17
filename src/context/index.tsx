import React, { createContext, useContext, useCallback, useReducer, PropsWithChildren } from 'react';

import { getBusinesses } from '../services/businessesApi';

import { reducer, defaultState, createLoadingAction, createSuccessAction, createFailureAction } from './reducer';
import { ProviderState } from './types';

export interface BusinessContextValue extends ProviderState {
  refresh: () => void;
}

const BusinessesContext = createContext<BusinessContextValue>({
  ...defaultState,
  // temporary
  refresh: () => {},
});

BusinessesContext.displayName = 'Business';

export const BusinessesProvider = (props: PropsWithChildren<{}>) => {
  const {children} = props;

  const [state, dispatch] = useReducer(reducer, defaultState);

  const refresh = useCallback(() => {
    dispatch(createLoadingAction());
    getBusinesses()
      .then((list) => dispatch(createSuccessAction(list)))
      .catch((err) => dispatch(createFailureAction(err)))
  }, [dispatch]);

  return (
    <BusinessesContext.Provider value={{...state, refresh}}>
      {children}
    </BusinessesContext.Provider>
  )
}

export const BusinessConsumer = BusinessesContext.Consumer;

export const useBusiness = () => {
  return useContext(BusinessesContext);
};

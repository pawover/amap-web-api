import React, { type Dispatch, createContext, useContext } from 'react';

export interface LocaContextState extends LocaContext {
  map: MapContext['map'];
}
export interface LocaContextValue {
  state: LocaContextState;
  dispatch: Dispatch<LocaContextState>;
}

export const locaContextState: LocaContextState = {
  map: undefined,
  Loca: undefined,
  locaContainer: undefined,
};

export const locaReducer = (state: LocaContextState, action: LocaContextState) => ({ ...state, ...action });
export const LocaCtx = createContext<LocaContextValue>({
  state: locaContextState,
  dispatch: () => null,
});
export const useLocaContext = () => {
  const { state, dispatch } = useContext(LocaCtx);
  return { ...state, state, dispatch };
};

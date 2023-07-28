import React, { createContext, type Dispatch, useContext } from 'react';

export interface MapContextState extends MapContext {}
export interface MapContextValue {
  state: MapContextState;
  dispatch: Dispatch<MapContextState>;
}

export const mapContextState: MapContextState = {
  AMap: undefined,
  map: undefined,
  container: undefined,
};
export const mapReducer = (state: MapContextState, action: MapContextState) => ({ ...state, ...action });
export const MapCtx = createContext<MapContextValue>({
  state: mapContextState,
  dispatch: () => null,
});
export const useMapContext = () => {
  const { state, dispatch } = useContext(MapCtx);
  return { ...state, state, dispatch };
};

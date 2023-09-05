import { createContext, useContext } from 'react';

export const mapContextState: MapContext = { map: undefined };
export const mapCtx = createContext<MapContext>(mapContextState);
export const mapReducer = (state: MapContext, action: MapContext) => action;
export const useMapContext = () => useContext(mapCtx);

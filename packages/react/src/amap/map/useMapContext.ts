import { createContext } from "react";

export const mapContextState: MapContext = { map: undefined };
export const MapContext = createContext<MapContext>(mapContextState);
MapContext.displayName = "MapContext";
export const mapReducer = (_state: MapContext, action: MapContext) => action;
export const useMapContext = () => (MapContext as unknown as { use: () => MapContext }).use();

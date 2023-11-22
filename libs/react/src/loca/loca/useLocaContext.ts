import { createContext, useContext } from "react";

export const locaContextState: LocaContext = { map: undefined, loca: undefined };
export const locaCtx = createContext<LocaContext>(locaContextState);
export const locaReducer = (state: LocaContext, action: LocaContext) => action;
export const useLocaContext = () => useContext(locaCtx);

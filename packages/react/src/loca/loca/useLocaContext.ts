import { createContext } from "react";

export const locaContextState: LocaContext = { map: undefined, loca: undefined };
export const LocaContext = createContext<LocaContext>(locaContextState);
LocaContext.displayName = "LocaContext";
export const locaReducer = (_state: LocaContext, action: LocaContext) => action;
export const useLocaContext = () => (LocaContext as unknown as { use: () => LocaContext }).use();

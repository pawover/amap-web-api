import { forwardRef, useImperativeHandle } from "react";
import type { ContextProps } from "../map";
import { useIndoorMap } from "./useIndoorMap";

export interface IndoorMapProps extends ContextProps, AMap.IndoorMap.Events, AMap.IndoorMap.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const IndoorMap = forwardRef<IndoorMapProps & { instance: AMap.IndoorMap | undefined }, IndoorMapProps>(
  (props, ref) => {
    const { indoorMap } = useIndoorMap(props);
    useImperativeHandle(ref, () => ({ ...props, instance: indoorMap }), [props, indoorMap]);

    return null;
  },
);

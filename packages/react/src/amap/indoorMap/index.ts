import { useImperativeHandle, type Ref } from "react";
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

export function IndoorMap (props: IndoorMapProps & { ref?: Ref<IndoorMapProps & { instance: AMap.IndoorMap | undefined }> }) {
  const { indoorMap } = useIndoorMap(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: indoorMap }), [props, indoorMap]);

  return null;
}

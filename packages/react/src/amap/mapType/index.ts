import { useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { useMapType } from "./useMapType";

export interface MapTypeProps extends ContextProps, Omit<AMap.MapType.Options, "position">, AMap.Control.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  /**
   * 相对于地图容器左上角的偏移量，正数代表向右下偏移
   *
   * @default [10,10]
   */
  offset?: [number, number];
}

export function MapType (props: MapTypeProps & { ref?: Ref<MapTypeProps & { instance: AMap.MapType | undefined }> }) {
  const { mapType } = useMapType(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: mapType }), [props, mapType]);

  return null;
}

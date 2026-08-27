import { useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { useTileLayer } from "./useTileLayer";

export interface TileLayerProps extends ContextProps, AMap.TileLayer.Events, AMap.TileLayer.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export function TileLayer (props: TileLayerProps & { ref?: Ref<TileLayerProps & { instance: AMap.TileLayer | undefined }> }) {
  const { tileLayer } = useTileLayer(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: tileLayer }), [props, tileLayer]);

  return null;
}

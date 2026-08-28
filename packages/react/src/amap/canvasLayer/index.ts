import { useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { useCanvasLayer } from "./useCanvasLayer";

export interface CanvasLayerProps extends ContextProps, AMap.CanvasLayer.Events, AMap.CanvasLayer.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export function CanvasLayer (props: CanvasLayerProps & { ref?: Ref<CanvasLayerProps & { instance: AMap.CanvasLayer | undefined }> }) {
  const { canvasLayer } = useCanvasLayer(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: canvasLayer }), [props, canvasLayer]);

  return null;
}

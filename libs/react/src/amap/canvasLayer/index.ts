import { forwardRef, useImperativeHandle } from "react";
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

export const CanvasLayer = forwardRef<CanvasLayerProps & { instance: AMap.CanvasLayer | undefined }, CanvasLayerProps>(
  (props, ref) => {
    const { canvasLayer } = useCanvasLayer(props);
    useImperativeHandle(ref, () => ({ ...props, instance: canvasLayer }), [props, canvasLayer]);

    return null;
  },
);

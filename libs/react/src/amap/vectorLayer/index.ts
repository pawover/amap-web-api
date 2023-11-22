import { forwardRef, useImperativeHandle } from "react";
import type { ContextProps } from "../map";
import { useVectorLayer } from "./useVectorLayer";

export interface VectorLayerProps extends ContextProps, AMap.VectorLayer.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  /** 图层中包含的覆盖物列表 */
  layers?: AMap.OverlayType[];
}

export const VectorLayer = forwardRef<VectorLayerProps & { instance: AMap.VectorLayer | undefined }, VectorLayerProps>(
  (props, ref) => {
    const { vectorLayer } = useVectorLayer(props);
    useImperativeHandle(ref, () => ({ ...props, instance: vectorLayer }), [props, vectorLayer]);

    return null;
  },
);

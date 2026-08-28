import { useImperativeHandle, type Ref } from "react";
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

export function VectorLayer (props: VectorLayerProps & { ref?: Ref<VectorLayerProps & { instance: AMap.VectorLayer | undefined }> }) {
  const { vectorLayer } = useVectorLayer(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: vectorLayer }), [props, vectorLayer]);

  return null;
}

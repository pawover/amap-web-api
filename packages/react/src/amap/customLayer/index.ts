import { useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { useCustomLayer } from "./useCustomLayer";

export interface CustomLayerProps extends ContextProps, AMap.CustomLayer.Events, AMap.CustomLayer.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  /** 图层的 DOM 容器 id 或 DOM 容器 */
  canvas?: string | HTMLCanvasElement;
  /** 图层 DOM 容器的类名 */
  className?: string;
}

export function CustomLayer (props: CustomLayerProps & { ref?: Ref<CustomLayerProps & { instance: AMap.CustomLayer | undefined }> }) {
  const { customLayer } = useCustomLayer(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: customLayer }), [props, customLayer]);

  return null;
}

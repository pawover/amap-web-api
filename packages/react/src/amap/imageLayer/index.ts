import { useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { useImageLayer } from "./useImageLayer";

export interface ImageLayerProps extends ContextProps, AMap.ImageLayer.Events, AMap.ImageLayer.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export function ImageLayer (props: ImageLayerProps & { ref?: Ref<ImageLayerProps & { instance: AMap.ImageLayer | undefined }> }) {
  const { imageLayer } = useImageLayer(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: imageLayer }), [props, imageLayer]);

  return null;
}

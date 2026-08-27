import { useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { useGLCustomLayer } from "./useGLCustomLayer";

export interface GLCustomLayerProps extends ContextProps, AMap.GLCustomLayer.Events, AMap.GLCustomLayer.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export function GLCustomLayer (props: GLCustomLayerProps & { ref?: Ref<GLCustomLayerProps & { instance: AMap.GLCustomLayer | undefined }> }) {
  const { glCustomLayer } = useGLCustomLayer(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: glCustomLayer }), [props, glCustomLayer]);

  return null;
}

import { useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { useInfoWindow } from "./useInfoWindow";

export interface InfoWindowProps
  extends ContextProps,
  AMap.InfoWindow.Events,
  Omit<AMap.InfoWindow.Options, "content" | "isCustom" | "size"> {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  /**
   * 显示内容
   * - 指定 `content` 属性时，`children` 属性将失效
   */
  content?: React.ReactNode;
  /**
   * 显示内容
   * - 指定 `content` 属性时，`children` 属性将失效
   */
  children?: React.ReactNode;
}

export function InfoWindow (props: InfoWindowProps & { ref?: Ref<InfoWindowProps & { instance: AMap.InfoWindow | undefined }> }) {
  const { infoWindow, wrapper } = useInfoWindow(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: infoWindow }), [props, infoWindow]);

  return wrapper;
}

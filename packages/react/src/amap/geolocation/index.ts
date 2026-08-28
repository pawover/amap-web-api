import { useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { useGeolocation } from "./useGeolocation";

export interface GeolocationProps extends ContextProps, AMap.Geolocation.Events, AMap.Geolocation.Options {
  /**
   * 定位类型
   * - `position` 获取 用户的精确位置，有失败几率
   * - `cityInfo` 根据用户 IP 获取 用户所在城市信息
   *
   * @default "position"
   */
  type?: "position" | "cityInfo";
}

export function Geolocation (props: GeolocationProps & { ref?: Ref<GeolocationProps & { instance: AMap.Geolocation | undefined }> }) {
  const { geolocation } = useGeolocation(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: geolocation }), [props, geolocation]);

  return null;
}

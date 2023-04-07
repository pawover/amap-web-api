import React, { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useGeolocation } from './useGeolocation';

export * from './useGeolocation';
export interface GeolocationProps extends CommonProps, AMap.Geolocation.Events, AMap.Geolocation.Options {
  /**
   * 定位类型
   * - `position` 获取 用户的精确位置，有失败几率
   * - `cityInfo` 根据用户 IP 获取 用户所在城市信息
   *
   * @default "position"
   */
  type?: 'position' | 'cityInfo';
}

export const Geolocation = forwardRef<
  GeolocationProps & { geolocation: AMap.Geolocation | undefined },
  GeolocationProps
>((props, ref) => {
  const { geolocation } = useGeolocation(props);
  useImperativeHandle(ref, () => ({ ...props, geolocation }), [geolocation]);

  return null;
});

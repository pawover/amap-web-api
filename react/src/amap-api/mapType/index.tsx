import { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useMapType } from './useMapType';

export * from './useMapType';
export interface MapTypeProps extends CommonProps, Omit<AMap.MapType.Options, 'position'>, AMap.Control.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  /**
   * 相对于地图容器左上角的偏移量，正数代表向右下偏移
   *
   * @default [10,10]
   */
  offset?: [number, number];
}

export const MapType = forwardRef<MapTypeProps & { mapType: AMap.MapType | undefined }, MapTypeProps>((props, ref) => {
  const { mapType } = useMapType(props);
  useImperativeHandle(ref, () => ({ ...props, mapType }), [mapType]);

  return null;
});

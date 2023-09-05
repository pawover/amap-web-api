import { forwardRef, useImperativeHandle } from 'react';
import type { ContextProps } from '../map';
import { useDistrictLayer } from './useDistrictLayer';

export * from './useDistrictLayer';
export interface DistrictLayerProps extends ContextProps, AMap.DistrictLayer.Events, AMap.DistrictLayer.Options {
  /**
   * 行政区类型
   * - `world` 世界简易行政区图层
   * - `country` 国家简易行政区图层
   * - `province` 省市简易行政区图层
   */
  districtType: 'world' | 'country' | 'province';
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const DistrictLayer = forwardRef<
  DistrictLayerProps & { instance: AMap.DistrictLayer | undefined },
  DistrictLayerProps
>((props, ref) => {
  const { districtLayer } = useDistrictLayer(props);
  useImperativeHandle(ref, () => ({ ...props, instance: districtLayer }), [props, districtLayer]);

  return null;
});

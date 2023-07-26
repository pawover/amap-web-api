import React, { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useVectorLayer } from './useVectorLayer';

export * from './useVectorLayer';
export interface VectorLayerProps extends CommonProps, AMap.VectorLayer.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  /** 图层中包含的覆盖物列表 */
  layers?: AMap.Overlays[];
}

export const VectorLayer = forwardRef<
  VectorLayerProps & { vectorLayer: AMap.VectorLayer | undefined },
  VectorLayerProps
>((props, ref) => {
  const { vectorLayer } = useVectorLayer(props);
  useImperativeHandle(ref, () => ({ ...props, vectorLayer }), [props, vectorLayer]);

  return null;
});

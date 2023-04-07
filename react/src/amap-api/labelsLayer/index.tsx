import React, { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useLabelsLayer } from './useLabelsLayer';

export * from './useLabelsLayer';
export interface LabelsLayerProps extends CommonProps, AMap.LabelsLayer.Events, AMap.LabelsLayer.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const LabelsLayer = forwardRef<
  LabelsLayerProps & { labelsLayer: AMap.LabelsLayer | undefined },
  LabelsLayerProps
>((props, ref) => {
  const { labelsLayer } = useLabelsLayer(props);
  useImperativeHandle(ref, () => ({ ...props, labelsLayer }), [labelsLayer]);

  return null;
});

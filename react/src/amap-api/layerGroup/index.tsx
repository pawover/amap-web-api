import { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useLayerGroup } from './useLayerGroup';

export * from './useLayerGroup';
export interface LayerGroupProps extends CommonProps, AMap.LayerGroup.Events {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  /** 图层列表 */
  layers: AMap.Layers[];
}

export const LayerGroup = forwardRef<LayerGroupProps & { layerGroup: AMap.LayerGroup | undefined }, LayerGroupProps>(
  (props, ref) => {
    const { layerGroup } = useLayerGroup(props);
    useImperativeHandle(ref, () => ({ ...props, layerGroup }), [layerGroup]);

    return null;
  },
);

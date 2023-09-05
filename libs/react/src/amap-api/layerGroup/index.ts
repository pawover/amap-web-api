import { forwardRef, useImperativeHandle } from 'react';
import type { ContextProps } from '../map';
import { useLayerGroup } from './useLayerGroup';

export * from './useLayerGroup';
export interface LayerGroupProps extends ContextProps, AMap.LayerGroup.Events {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  /** 图层列表 */
  layers: AMap.LayerType[];
}

export const LayerGroup = forwardRef<LayerGroupProps & { instance: AMap.LayerGroup | undefined }, LayerGroupProps>(
  (props, ref) => {
    const { layerGroup } = useLayerGroup(props);
    useImperativeHandle(ref, () => ({ ...props, instance: layerGroup }), [props, layerGroup]);

    return null;
  },
);

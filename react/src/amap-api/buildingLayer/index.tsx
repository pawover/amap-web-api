import { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useBuildingLayer, useBuildings } from './useBuildingLayer';

export * from './useBuildingLayer';
export interface BuildingLayerProps extends CommonProps, AMap.BuildingLayer.Events, AMap.BuildingLayer.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const BuildingLayer = forwardRef<
  BuildingLayerProps & { buildingLayer: AMap.BuildingLayer | undefined },
  BuildingLayerProps
>((props, ref) => {
  const { buildingLayer } = useBuildingLayer(props);
  useImperativeHandle(ref, () => ({ ...props, buildingLayer }), [buildingLayer]);

  return null;
});
export const Buildings = forwardRef<BuildingLayerProps & { buildings: AMap.Buildings | undefined }, BuildingLayerProps>(
  (props, ref) => {
    const { buildings } = useBuildings(props);
    useImperativeHandle(ref, () => ({ ...props, buildings }), [buildings]);

    return null;
  },
);

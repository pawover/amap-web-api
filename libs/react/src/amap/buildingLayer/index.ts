import { forwardRef, useImperativeHandle } from "react";
import type { ContextProps } from "../map";
import { useBuildingLayer, useBuildings } from "./useBuildingLayer";

export interface BuildingLayerProps extends ContextProps, AMap.BuildingLayer.Events, AMap.BuildingLayer.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export const BuildingLayer = forwardRef<
  BuildingLayerProps & { instance: AMap.BuildingLayer | undefined },
  BuildingLayerProps
>((props, ref) => {
  const { buildingLayer } = useBuildingLayer(props);
  useImperativeHandle(ref, () => ({ ...props, instance: buildingLayer }), [props, buildingLayer]);

  return null;
});

export const Buildings = forwardRef<BuildingLayerProps & { instance: AMap.Buildings | undefined }, BuildingLayerProps>(
  (props, ref) => {
    const { buildings } = useBuildings(props);
    useImperativeHandle(ref, () => ({ ...props, instance: buildings }), [props, buildings]);

    return null;
  },
);

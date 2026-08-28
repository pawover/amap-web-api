import { useImperativeHandle, type Ref } from "react";
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

export function BuildingLayer (props: BuildingLayerProps & { ref?: Ref<BuildingLayerProps & { instance: AMap.BuildingLayer | undefined }> }) {
  const { buildingLayer } = useBuildingLayer(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: buildingLayer }), [props, buildingLayer]);

  return null;
}

export function Buildings (props: BuildingLayerProps & { ref?: Ref<BuildingLayerProps & { instance: AMap.Buildings | undefined }> }) {
  const { buildings } = useBuildings(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: buildings }), [props, buildings]);

  return null;
}

import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { BuildingLayerProps } from "./";

interface UseBuildingLayerProps extends BuildingLayerProps {}

export function useBuildingLayer (props: UseBuildingLayerProps) {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [buildingLayer, setBuildingLayer] = useState<AMap.BuildingLayer>();

  useVisible(buildingLayer, visible);
  useProperty<AMap.BuildingLayer, UseBuildingLayerProps>(buildingLayer, props);
  useEventProperty<AMap.BuildingLayer, UseBuildingLayerProps, AMap.BuildingLayer.Events>(buildingLayer, props, [
    "onComplete",
  ]);

  // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
  useEffect(() => {
    if (AMap && map && !buildingLayer) {
      const instance = new AMap.Buildings(rest);
      // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
      map.add(instance);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setBuildingLayer(instance);
    }

    return () => {
      if (buildingLayer) {
        buildingLayer.clearEvents();
        buildingLayer.setMap(null);
        setBuildingLayer(undefined);
      }
    };
  }, [map, buildingLayer]);

  return { buildingLayer };
}

export function useBuildings (props: UseBuildingLayerProps) {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [buildings, setBuildings] = useState<AMap.Buildings>();

  useVisible(buildings, visible);
  useProperty<AMap.Buildings, UseBuildingLayerProps>(buildings, props);
  useEventProperty<AMap.Buildings, UseBuildingLayerProps, AMap.Buildings.Events>(buildings, props, ["onComplete"]);

  // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
  useEffect(() => {
    if (AMap && map && !buildings) {
      const instance = new AMap.Buildings(rest);
      // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
      map.add(instance);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setBuildings(instance);
    }

    return () => {
      if (buildings) {
        buildings.clearEvents();
        buildings.setMap(null);
        setBuildings(undefined);
      }
    };
  }, [map, buildings]);

  return { buildings };
}

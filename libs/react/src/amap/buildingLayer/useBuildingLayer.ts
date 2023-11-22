import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { BuildingLayerProps } from "./";

interface useBuildingLayer extends BuildingLayerProps {}

export const useBuildingLayer = (props: useBuildingLayer) => {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [buildingLayer, setBuildingLayer] = useState<AMap.BuildingLayer>();

  useVisible(buildingLayer, visible);
  useProperty<AMap.BuildingLayer, useBuildingLayer>(buildingLayer, props);
  useEventProperty<AMap.BuildingLayer, useBuildingLayer, AMap.BuildingLayer.Events>(buildingLayer, props, [
    "onComplete",
  ]);

  useEffect(() => {
    if (AMap && map && !buildingLayer) {
      const instance = new AMap.Buildings(rest);
      map.add(instance);
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
};

export const useBuildings = (props: useBuildingLayer) => {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [buildings, setBuildings] = useState<AMap.Buildings>();

  useVisible(buildings, visible);
  useProperty<AMap.Buildings, useBuildingLayer>(buildings, props);
  useEventProperty<AMap.Buildings, useBuildingLayer, AMap.Buildings.Events>(buildings, props, ["onComplete"]);

  useEffect(() => {
    if (AMap && map && !buildings) {
      const instance = new AMap.Buildings(rest);
      map.add(instance);
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
};

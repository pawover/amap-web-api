import React, { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperties, useSetProperties, useVisible } from '../utils';
import type { BuildingLayerProps } from './';

interface useBuildingLayer extends BuildingLayerProps {}

export const useBuildingLayer = (props: useBuildingLayer) => {
  const { visible = true, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [buildingLayer, setBuildingLayer] = useState<AMap.BuildingLayer>();

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

  useVisible(buildingLayer!, visible);
  useSetProperties<AMap.BuildingLayer, useBuildingLayer>(
    buildingLayer!,
    props,
    Object.keys(props) as (keyof typeof props)[],
  );
  useEventProperties<AMap.BuildingLayer, useBuildingLayer, AMap.BuildingLayer.Events>(buildingLayer!, props, [
    'onComplete',
  ]);

  return {
    buildingLayer,
    setBuildingLayer,
  };
};

export const useBuildings = (props: useBuildingLayer) => {
  const { visible = true, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [buildings, setBuildings] = useState<AMap.Buildings>();

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

  useVisible(buildings!, visible);
  useSetProperties<AMap.Buildings, useBuildingLayer>(buildings!, props, Object.keys(props) as (keyof typeof props)[]);
  useEventProperties<AMap.Buildings, useBuildingLayer, AMap.Buildings.Events>(buildings!, props, ['onComplete']);

  return {
    buildings,
    setBuildings,
  };
};

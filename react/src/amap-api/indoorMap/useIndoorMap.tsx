import React, { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperties, useSetProperties, useVisible } from '../utils';
import type { IndoorMapProps } from './';

interface useIndoorMap extends IndoorMapProps {}

export const useIndoorMap = (props: useIndoorMap) => {
  const { visible = true, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [indoorMap, setIndoorMap] = useState<AMap.IndoorMap>();

  useEffect(() => {
    if (AMap && map && !indoorMap) {
      const instance = new AMap.IndoorMap(rest);
      map.add(instance);
      setIndoorMap(instance);
    }
    return () => {
      if (indoorMap) {
        indoorMap.clearEvents();
        indoorMap.setMap(null);
        setIndoorMap(undefined);
      }
    };
  }, [map, indoorMap]);

  useVisible(indoorMap!, visible);
  useSetProperties<AMap.IndoorMap, useIndoorMap>(indoorMap!, props, Object.keys(props) as (keyof typeof props)[]);
  useEventProperties<AMap.IndoorMap, useIndoorMap, AMap.IndoorMap.Events>(indoorMap!, props, ['onComplete']);

  return {
    indoorMap,
    setIndoorMap,
  };
};

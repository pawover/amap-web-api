import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import type { TileLayerProps } from '.';
import { useEventProperties, useSetProperties, useVisible } from '../utils';

interface useTileLayer extends TileLayerProps {}

export const useTileLayer = (props: useTileLayer) => {
  const { visible = true, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [tileLayer, setTileLayer] = useState<AMap.TileLayer>();

  useEffect(() => {
    if (AMap && map && !tileLayer) {
      const instance = new AMap.TileLayer(rest);
      map.add(instance);
      setTileLayer(instance);
    }
    return () => {
      if (tileLayer) {
        tileLayer.clearEvents();
        tileLayer.setMap(null);
        setTileLayer(undefined);
      }
    };
  }, [map, tileLayer]);

  useVisible(tileLayer!, visible);
  useSetProperties<AMap.TileLayer, useTileLayer>(tileLayer!, props, Object.keys(props) as (keyof typeof props)[]);
  useEventProperties<AMap.TileLayer, useTileLayer, AMap.TileLayer.Events>(tileLayer!, props, ['onComplete']);

  return {
    tileLayer,
    setTileLayer,
  };
};

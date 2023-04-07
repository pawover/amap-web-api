import React, { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import type { CanvasLayerProps } from '.';
import { useEventProperties, useSetProperties, useVisible } from '../utils';

interface useCanvasLayer extends CanvasLayerProps {}

export const useCanvasLayer = (props: useCanvasLayer) => {
  const { visible = true, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [canvasLayer, setCanvasLayer] = useState<AMap.CanvasLayer>();

  useEffect(() => {
    if (AMap && map && !canvasLayer) {
      const instance = new AMap.CanvasLayer(rest);
      map.add(instance);
      setCanvasLayer(instance);
    }
    return () => {
      if (canvasLayer) {
        canvasLayer.clearEvents();
        canvasLayer.setMap(null);
        setCanvasLayer(undefined);
      }
    };
  }, [map, canvasLayer]);

  useVisible(canvasLayer!, visible);
  useSetProperties<AMap.CanvasLayer, useCanvasLayer>(canvasLayer!, props, Object.keys(props) as (keyof typeof props)[]);
  useEventProperties<AMap.CanvasLayer, useCanvasLayer, AMap.CanvasLayer.Events>(canvasLayer!, props, ['onComplete']);

  return {
    canvasLayer,
    setCanvasLayer,
  };
};

import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperty, useProperty, useVisible } from '../utils';
import type { CanvasLayerProps } from './';

interface useCanvasLayer extends CanvasLayerProps {}

export const useCanvasLayer = (props: useCanvasLayer) => {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [canvasLayer, setCanvasLayer] = useState<AMap.CanvasLayer>();

  useVisible(canvasLayer, visible);
  useProperty<AMap.CanvasLayer, useCanvasLayer>(canvasLayer, props);
  useEventProperty<AMap.CanvasLayer, useCanvasLayer, AMap.CanvasLayer.Events>(canvasLayer, props, ['onComplete']);

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

  return { canvasLayer };
};

import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperty, useProperty, useVisible } from '../utils';
import type { CustomLayerProps } from './';

interface useCustomLayer extends CustomLayerProps {}

export const useCustomLayer = (props: useCustomLayer) => {
  const { visible = true, canvas, className = '', ...rest } = props;
  const { map } = useMapContext();
  const [customLayer, setCustomLayer] = useState<AMap.CustomLayer>();

  useVisible(customLayer, visible);
  useProperty<AMap.CustomLayer, useCustomLayer>(customLayer, props);
  useEventProperty<AMap.CustomLayer, useCustomLayer, AMap.CustomLayer.Events>(customLayer, props, ['onComplete']);

  useEffect(() => {
    if (AMap && map && !customLayer) {
      let canvasDom: HTMLCanvasElement;
      if (canvas) {
        if (typeof canvas === 'string') canvasDom = document.getElementById(canvas) as HTMLCanvasElement;
        else canvasDom = canvas;
      } else canvasDom = document.createElement('canvas');
      canvasDom.setAttribute('class', className);
      const instance = new AMap.CustomLayer(canvasDom, rest);
      map.add(instance);
      setCustomLayer(instance);
    }
    return () => {
      if (customLayer) {
        customLayer.clearEvents();
        customLayer.setMap(null);
        setCustomLayer(undefined);
      }
    };
  }, [map, customLayer]);

  return { customLayer };
};

import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import type { CustomLayerProps } from '.';
import { useEventProperties, useSetProperties, useVisible } from '../utils';

interface useCustomLayer extends CustomLayerProps {}

export const useCustomLayer = (props: useCustomLayer) => {
  const { visible = true, canvas, className = '', ...rest } = props;
  const { AMap, map } = useMapContext();
  const [customLayer, setCustomLayer] = useState<AMap.CustomLayer>();

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

  useVisible(customLayer!, visible);
  useSetProperties<AMap.CustomLayer, useCustomLayer>(customLayer!, props, Object.keys(props) as (keyof typeof props)[]);
  useEventProperties<AMap.CustomLayer, useCustomLayer, AMap.CustomLayer.Events>(customLayer!, props, ['onComplete']);

  return {
    customLayer,
    setCustomLayer,
  };
};

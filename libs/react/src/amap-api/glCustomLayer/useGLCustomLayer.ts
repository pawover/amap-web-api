import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperty, useProperty, useVisible } from '../utils';
import type { GLCustomLayerProps } from './';

interface useGLCustomLayer extends GLCustomLayerProps {}

export const useGLCustomLayer = (props: useGLCustomLayer) => {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [glCustomLayer, setGLCustomLayer] = useState<AMap.GLCustomLayer>();

  useVisible(glCustomLayer, visible);
  useProperty<AMap.GLCustomLayer, useGLCustomLayer>(glCustomLayer, props);
  useEventProperty<AMap.GLCustomLayer, useGLCustomLayer, AMap.GLCustomLayer.Events>(glCustomLayer, props, [
    'onComplete',
  ]);

  useEffect(() => {
    if (AMap && map && !glCustomLayer) {
      const instance = new AMap.GLCustomLayer(rest);
      map.add(instance);
      setGLCustomLayer(instance);
    }
    return () => {
      if (glCustomLayer) {
        glCustomLayer.clearEvents();
        glCustomLayer.setMap(null);
        setGLCustomLayer(undefined);
      }
    };
  }, [map, glCustomLayer]);

  return { glCustomLayer };
};

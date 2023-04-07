import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import type { GLCustomLayerProps } from '.';
import { useEventProperties, useSetProperties, useVisible } from '../utils';

interface useGLCustomLayer extends GLCustomLayerProps {}

export const useGLCustomLayer = (props: useGLCustomLayer) => {
  const { visible = true, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [glCustomLayer, setGLCustomLayer] = useState<AMap.GLCustomLayer>();
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

  useVisible(glCustomLayer!, visible);
  useSetProperties<AMap.GLCustomLayer, useGLCustomLayer>(
    glCustomLayer!,
    props,
    Object.keys(props) as (keyof typeof props)[],
  );
  useEventProperties<AMap.GLCustomLayer, useGLCustomLayer, AMap.GLCustomLayer.Events>(glCustomLayer!, props, [
    'onComplete',
  ]);

  return {
    glCustomLayer,
    setGLCustomLayer,
  };
};

import React, { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperties, useSetProperties, useVisible } from '../utils';
import type { PolygonProps } from './';

interface UsePolygon extends PolygonProps {}

export const usePolygon = (props: UsePolygon) => {
  const { visible = true, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [polygon, setPolygon] = useState<AMap.Polygon>();

  useEffect(() => {
    if (AMap && map && !polygon) {
      const instance = new AMap.Polygon(rest);
      map.add(instance);
      setPolygon(instance);
    }
    return () => {
      if (polygon) {
        polygon.remove();
        setPolygon(undefined);
      }
    };
  }, [map, polygon]);

  useVisible(polygon!, visible);
  useSetProperties<AMap.Polygon, UsePolygon>(polygon!, props, Object.keys(props) as (keyof typeof props)[]);
  useEventProperties<AMap.Polygon, UsePolygon, AMap.Polygon.Events>(polygon!, props, [
    'onHide',
    'onShow',
    'onClick',
    'onDblClick',
    'onRightClick',
    'onMouseUp',
    'onMouseDown',
    'onMouseOver',
    'onMouseOut',
    'onMouseMove',
    'onDragStart',
    'onDragEnd',
    'onDragging',
    'onTouchStart',
    'onTouchEnd',
    'onTouchMove',
  ]);

  return {
    polygon,
    setPolygon,
  };
};

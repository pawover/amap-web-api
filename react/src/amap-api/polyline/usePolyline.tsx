import React, { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import type { PolylineProps } from '.';
import { useEventProperties, useSetProperties, useVisible } from '../utils';

interface UsePolyline extends PolylineProps {}

export const usePolyline = (props: UsePolyline) => {
  const { visible = true, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [polyline, setPolyline] = useState<AMap.Polyline>();

  useEffect(() => {
    if (AMap && map && !polyline) {
      const instance = new AMap.Polyline(rest);
      map.add(instance);
      setPolyline(instance);
    }
    return () => {
      if (polyline) {
        polyline.clearEvents();
        polyline.setMap(null);
        setPolyline(undefined);
      }
    };
  }, [map, polyline]);

  useVisible(polyline!, visible);
  useSetProperties<AMap.Polyline, UsePolyline>(polyline!, props, Object.keys(props) as (keyof typeof props)[]);
  useEventProperties<AMap.Polyline, UsePolyline, AMap.Polyline.Events>(polyline!, props, [
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
    polyline,
    setPolyline,
  };
};

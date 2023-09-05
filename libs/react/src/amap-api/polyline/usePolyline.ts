import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperty, useProperty, useVisible } from '../utils';
import type { PolylineProps } from './';

interface UsePolyline extends PolylineProps {}

export const usePolyline = (props: UsePolyline) => {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [polyline, setPolyline] = useState<AMap.Polyline>();

  useVisible(polyline, visible);
  useProperty<AMap.Polyline, UsePolyline>(polyline, props);
  useEventProperty<AMap.Polyline, UsePolyline, AMap.Polyline.Events>(polyline, props, [
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

  return { polyline };
};

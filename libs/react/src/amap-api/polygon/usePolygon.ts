import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperty, useProperty, useVisible } from '../utils';
import type { PolygonProps } from './';

interface UsePolygon extends PolygonProps {}

export const usePolygon = (props: UsePolygon) => {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [polygon, setPolygon] = useState<AMap.Polygon>();

  useVisible(polygon, visible);
  useProperty<AMap.Polygon, UsePolygon>(polygon, props);
  useEventProperty<AMap.Polygon, UsePolygon, AMap.Polygon.Events>(polygon, props, [
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

  return { polygon };
};

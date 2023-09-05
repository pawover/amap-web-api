import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperty, useProperty, useVisible } from '../utils';
import type { RectangleProps } from './';

interface UseRectangle extends RectangleProps {}

export const useRectangle = (props: UseRectangle) => {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [rectangle, setRectangle] = useState<AMap.Rectangle>();
  useVisible(rectangle, visible);
  useProperty<AMap.Rectangle, UseRectangle>(rectangle, props);
  useEventProperty<AMap.Rectangle, UseRectangle, AMap.Rectangle.Events>(rectangle, props, [
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
    if (AMap && map && !rectangle) {
      const instance = new AMap.Rectangle(rest);
      map.add(instance);
      setRectangle(instance);
    }
    return () => {
      if (rectangle) {
        rectangle.clearEvents();
        rectangle.setMap(null);
        setRectangle(undefined);
      }
    };
  }, [map, rectangle]);

  return { rectangle };
};

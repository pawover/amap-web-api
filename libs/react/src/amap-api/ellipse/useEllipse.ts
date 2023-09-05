import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperty, useProperty, useVisible } from '../utils';
import type { EllipseProps } from './';

interface UseEllipse extends EllipseProps {}

export const useEllipse = (props: UseEllipse) => {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [ellipse, setEllipse] = useState<AMap.Ellipse>();

  useVisible(ellipse, visible);
  useProperty<AMap.Ellipse, UseEllipse>(ellipse, props);
  useEventProperty<AMap.Ellipse, UseEllipse, AMap.Ellipse.Events>(ellipse, props, [
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
    if (AMap && map && !ellipse) {
      const instance = new AMap.Ellipse(rest);
      map.add(instance);
      setEllipse(instance);
    }
    return () => {
      if (ellipse) {
        ellipse.clearEvents();
        ellipse.setMap(null);
        setEllipse(undefined);
      }
    };
  }, [map, ellipse]);

  return { ellipse };
};

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useMapContext } from '../index';
import { useEventProperty, useProperty, useVisible } from '../utils';
import type { MarkerProps } from './';

interface UseMarkerProps extends MarkerProps {}

export const useMarker = (props: UseMarkerProps) => {
  const { visible = true, content, children, ...rest } = props;
  const { map } = useMapContext();
  const [marker, setMarker] = useState<AMap.Marker>();
  const [wrapper, setWrapper] = useState<React.ReactPortal>();
  const isStrictModeRenderedRefRef = useRef(false);

  useVisible(marker, visible);
  useProperty<AMap.Marker, UseMarkerProps>(marker, { ...props, content: content || children ? ' ' : undefined });
  useEventProperty<AMap.Marker, UseMarkerProps, AMap.Marker.Events>(marker, props, [
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
    'onMoving',
    'onMoveEnd',
    'onMoveAlong',
    'onTouchStart',
    'onTouchEnd',
    'onTouchMove',
  ]);

  useEffect(() => {
    if (AMap && map && !marker && !isStrictModeRenderedRefRef.current) {
      const options: AMap.Marker.Options = rest;
      if (content || children) {
        options.content = ' ';
      }
      const instance = new AMap.Marker(options);
      map.add(instance);
      if (content || children) {
        const dom = instance.getContentDom();
        if (dom) {
          const wrapper = createPortal(content || children, dom);
          setWrapper(wrapper);
        }
      }
      setMarker(instance);
      isStrictModeRenderedRefRef.current = true;
    }
    return () => {
      if (marker) {
        marker.stopMove();
        marker.setMap(null);
        setMarker(undefined);
        isStrictModeRenderedRefRef.current = false;
      }
    };
  }, [map, marker]);

  return { marker, wrapper };
};

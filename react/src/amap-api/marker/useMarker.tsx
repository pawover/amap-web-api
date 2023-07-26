import React, { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperties, useSetProperties, useVisible, useWrapper } from '../utils';
import type { MarkerProps } from './';

interface UseMarker extends MarkerProps {}

export const useMarker = (props: UseMarker) => {
  const { visible = true, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [marker, setMarker] = useState<AMap.Marker>();
  const { container, setWrapper } = useWrapper({ class: 'amap-marker-wrapper' });
  useEffect(() => {
    if (AMap && map && !marker) {
      if (rest.children) rest.content = container;
      const instance = new AMap.Marker(rest);
      map.add(instance);
      setMarker(instance);
    }
    return () => {
      if (marker) {
        marker.stopMove();
        marker.setMap(null);
        setMarker(undefined);
      }
    };
  }, [map, marker]);

  useVisible(marker!, visible);
  useSetProperties<AMap.Marker, UseMarker>(marker!, props, Object.keys(props) as (keyof typeof props)[]);
  useEventProperties<AMap.Marker, UseMarker, AMap.Marker.Events>(marker!, props, [
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

  return {
    marker,
    setMarker,
    MarkerWrapper: setWrapper,
  };
};

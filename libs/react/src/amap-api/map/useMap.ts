import { useEffect, useState } from 'react';
import { useEventProperty, useProperty, useSetStatus } from '../utils';
import type { MapProps } from './';

/** 传递给子组件的 context props */
export interface ContextProps extends MapContext {}
/** 地图 Map 组件 */
interface UseMapProps extends MapProps, MapContext {
  /** 指定的容器 */
  container?: HTMLDivElement | undefined;
}

export const useMap = (props: UseMapProps) => {
  const [map, setMap] = useState<AMap.Map>();

  useSetStatus<AMap.Map, UseMapProps>(map, props, [
    'dragEnable',
    'zoomEnable',
    'jogEnable',
    'pitchEnable',
    'rotateEnable',
    'animateEnable',
    'keyboardEnable',
  ]);
  useProperty<AMap.Map, UseMapProps>(map, props);
  useEventProperty<AMap.Map, UseMapProps, AMap.Map.Events>(map, props, [
    'onResize',
    'onComplete',
    'onZoomStart',
    'onZoomEnd',
    'onZoomChange',
    'onMapMove',
    'onMoveStart',
    'onMoveEnd',
    'onClick',
    'onDblClick',
    'onRightClick',
    'onMouseUp',
    'onMouseDown',
    'onMouseOver',
    'onMouseOut',
    'onMouseMove',
    'onMouseWheel',
    'onHotspotClick',
    'onHotspotOver',
    'onHotspotOut',
    'onDragStart',
    'onDragEnd',
    'onDragging',
    'onRotateStart',
    'onRotateEnd',
    'onRotateChange',
    'onTouchStart',
    'onTouchEnd',
    'onTouchMove',
  ]);

  useEffect(() => {
    if (AMap && !map && props.container) {
      const instance = new AMap.Map(props.container, props);
      setMap(instance);
    }
  }, [map, props]);

  return { map };
};

import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useEventProperties, useSetProperties, useSetStatus } from '../utils';
import type { MapProps } from './';
import { MapCtx } from './context';

/** `<Map>` 组件传递给子组件 (如 `<Marker>`) 的 props */
export interface MapChildProps {
  /** 高德地图的核心类，JS API 加载完后挂载至全局对象中 */
  AMap?: typeof AMap;
  /** 地图实例 */
  map?: AMap.Map;
}
/** 子组件通用 props 传递项 */
export interface CommonProps extends MapChildProps {}
/** 地图 Map 组件 */
interface UseMap extends MapProps, MapChildProps {
  /** 指定的容器 */
  container?: HTMLDivElement | null;
}

export const useMap = (props: UseMap) => {
  const { container } = props;
  const { dispatch } = useContext(MapCtx);
  const [map, setMap] = useState<AMap.Map>();
  const [zoom, setZoom] = useState(props.zoom || 15);

  useEffect(() => {
    if (container && !map && AMap) {
      container.className = (container.className || '') + ' react-amap-wrapper';
      const instance = new AMap.Map(container, { zoom, ...props });
      setMap(instance);
    }
    return () => {
      if (map) {
        map?.clearInfoWindow();
        map?.clearLimitBounds();
        map?.clearMap();
        map?.destroy();
        setMap(undefined);
      }
    };
  }, [map, container]);

  useEffect(() => {
    map && container && dispatch({ map, container, AMap });
    return () => {
      dispatch({ map: undefined, container: null, AMap: undefined });
    };
  }, [map, container]);

  useMemo(() => {
    if (map && typeof props.zoom === 'number' && zoom !== props.zoom && props.zoom >= 2 && props.zoom <= 20) {
      setZoom(props.zoom);
      map.setZoom(props.zoom);
    }
  }, [zoom, props.zoom]);

  useMemo(() => {
    props.center && map?.setCenter(props.center);
  }, [map, props.center]);

  useSetStatus<AMap.Map, UseMap>(map!, props, [
    'dragEnable',
    'zoomEnable',
    'jogEnable',
    'pitchEnable',
    'rotateEnable',
    'animateEnable',
    'keyboardEnable',
  ]);
  useSetProperties<AMap.Map, UseMap>(map!, props, Object.keys(props) as (keyof typeof props)[]);
  useEventProperties<AMap.Map, UseMap, AMap.Map.Events>(map!, props, [
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

  return {
    map,
    setMap,
    zoom,
    setZoom,
  };
};

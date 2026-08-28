import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { CircleMarkerProps } from "./";

interface UseCircleMarker extends CircleMarkerProps {}

export function useCircleMarker (props: UseCircleMarker) {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [circleMarker, setCircleMarker] = useState<AMap.CircleMarker>();

  useVisible(circleMarker, visible);
  useProperty<AMap.CircleMarker, UseCircleMarker>(circleMarker, props);
  useEventProperty<AMap.CircleMarker, UseCircleMarker, AMap.CircleMarker.Events>(circleMarker, props, [
    "onHide",
    "onShow",
    "onClick",
    "onDblClick",
    "onRightClick",
    "onMouseUp",
    "onMouseDown",
    "onMouseOver",
    "onMouseOut",
    "onMouseMove",
    "onDragStart",
    "onDragEnd",
    "onDragging",
    "onTouchStart",
    "onTouchEnd",
    "onTouchMove",
  ]);

  // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
  useEffect(() => {
    if (AMap && map && !circleMarker) {
      const instance = new AMap.CircleMarker(rest);
      // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
      map.add(instance);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setCircleMarker(instance);
    }

    return () => {
      if (circleMarker) {
        circleMarker.clearEvents();
        circleMarker.setMap(null);
        setCircleMarker(undefined);
      }
    };
  }, [map, circleMarker]);

  return { circleMarker };
}

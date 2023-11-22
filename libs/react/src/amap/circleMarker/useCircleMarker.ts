import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { CircleMarkerProps } from "./";

interface UseCircleMarker extends CircleMarkerProps {}

export const useCircleMarker = (props: UseCircleMarker) => {
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

  useEffect(() => {
    if (AMap && map && !circleMarker) {
      const instance = new AMap.CircleMarker(rest);
      map.add(instance);
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
};

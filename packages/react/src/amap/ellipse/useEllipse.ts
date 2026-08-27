import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { EllipseProps } from "./";

interface UseEllipse extends EllipseProps {}

export function useEllipse (props: UseEllipse) {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [ellipse, setEllipse] = useState<AMap.Ellipse>();

  useVisible(ellipse, visible);
  useProperty<AMap.Ellipse, UseEllipse>(ellipse, props);
  useEventProperty<AMap.Ellipse, UseEllipse, AMap.Ellipse.Events>(ellipse, props, [
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
    if (AMap && map && !ellipse) {
      const instance = new AMap.Ellipse(rest);
      // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
      map.add(instance);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
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
}

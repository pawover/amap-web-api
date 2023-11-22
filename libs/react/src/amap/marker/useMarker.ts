import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { MarkerProps } from "./";

interface UseMarkerProps extends MarkerProps {}

export const useMarker = (props: UseMarkerProps) => {
  const { visible = true, content, children, ...rest } = props;
  const renderContent = content || children;
  const { map } = useMapContext();
  const [marker, setMarker] = useState<AMap.Marker>();
  const [wrapper, setWrapper] = useState<React.ReactPortal>();
  const isStrictModeRenderedRef = useRef(false);

  useVisible(marker, visible);
  useProperty<AMap.Marker, UseMarkerProps>(marker, rest);
  useEventProperty<AMap.Marker, UseMarkerProps, AMap.Marker.Events>(marker, props, [
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
    "onMoving",
    "onMoveEnd",
    "onMoveAlong",
    "onTouchStart",
    "onTouchEnd",
    "onTouchMove",
  ]);

  useEffect(() => {
    if (AMap && map && !marker && !isStrictModeRenderedRef.current) {
      const instance = new AMap.Marker(rest);
      map.add(instance);

      if (renderContent) {
        const dom = instance.getContentDom();
        if (dom) {
          dom.innerHTML = "";
          const wrapper = createPortal(renderContent, dom);
          setWrapper(wrapper);
        }
      }

      setMarker(instance);
      isStrictModeRenderedRef.current = true;
    }
    return () => {
      if (marker) {
        marker.stopMove();
        marker.setMap(null);
        setMarker(undefined);
        isStrictModeRenderedRef.current = false;
      }
    };
  }, [map, marker]);

  useEffect(() => {
    if (marker && renderContent) {
      const dom = marker.getContentDom();
      if (dom) {
        const wrapper = createPortal(renderContent, dom);
        setWrapper(wrapper);
      }
    }
  }, [marker, renderContent]);

  return { marker, wrapper };
};

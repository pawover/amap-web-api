import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useMapContext } from "../index";
import { useEventProperty, useProperty } from "../utils";
import type { InfoWindowProps } from "./";

interface UseInfoWindowProps extends InfoWindowProps {}

const shadowContainerClassName = ".amap-info-shadowContainer";
const contentContainerClassName = ".amap-info-contentContainer";

export const useInfoWindow = (props: UseInfoWindowProps) => {
  const { visible = true, content, children, ...rest } = props;
  const { map } = useMapContext();
  const [wrapper, setWrapper] = useState<React.ReactPortal>();
  const [infoWindow, setInfoWindow] = useState<AMap.InfoWindow>();

  const createWrapper = (infoWindow: AMap.InfoWindow) => {
    const dom = infoWindow.getContentDom();

    if (dom) {
      const contentContainer = dom.querySelector(contentContainerClassName);
      const shadowContainer = dom.querySelector(shadowContainerClassName);
      if (contentContainer) contentContainer.remove();
      if (shadowContainer) shadowContainer.remove();
      const wrapper = createPortal(content || children, dom);
      setWrapper(wrapper);
    }
  };

  useProperty<AMap.InfoWindow, UseInfoWindowProps>(infoWindow, props);
  useEventProperty<AMap.InfoWindow, UseInfoWindowProps, AMap.InfoWindow.Events>(infoWindow, props, [
    "onOpen",
    "onClose",
  ]);

  useEffect(() => {
    if (AMap && map && !infoWindow) {
      const instance = new AMap.InfoWindow({ ...rest, isCustom: true });
      if (content || children) createWrapper(instance);
      setInfoWindow(instance);
    }
    return () => {
      if (infoWindow) {
        infoWindow.clearEvents();
        infoWindow.close();
        setInfoWindow(undefined);
      }
    };
  }, [map, infoWindow]);

  useEffect(() => {
    if (map && infoWindow) {
      const isOpen = infoWindow.getIsOpen();

      if (visible) {
        if (!isOpen) infoWindow.open(map, rest.position || map.getCenter());
      } else {
        if (isOpen) infoWindow.close();
      }
    }
  }, [infoWindow, visible, rest.position]);

  useEffect(() => {
    if (infoWindow && (content || children)) createWrapper(infoWindow);
  }, [infoWindow, children, content]);

  return {
    infoWindow,
    wrapper,
  };
};

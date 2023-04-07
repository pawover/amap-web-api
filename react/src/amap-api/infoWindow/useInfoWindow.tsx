import { useEffect, useMemo, useState } from 'react';
import { useMapContext } from '../index';
import type { InfoWindowProps } from '.';
import { useEventProperties, useWrapper, useSetProperties } from '../utils';

interface UseInfoWindow extends InfoWindowProps {}

export const useInfoWindow = (props: UseInfoWindow) => {
  const { visible = true, position, ...rest } = props;
  const { AMap, map } = useMapContext();
  const { container, setWrapper } = useWrapper({ class: 'amap-info-wrapper' });
  const [isOpen, setIsOpen] = useState(visible);
  const [infoWindow, setInfoWindow] = useState<AMap.InfoWindow>();

  useEffect(() => {
    if (AMap && map && !infoWindow) {
      const positionCenter = map.getCenter();
      if (props.children) rest.content = container;
      const instance = new AMap.InfoWindow({ ...rest, position: position || positionCenter });
      setInfoWindow(instance);
      if (isOpen) instance.open(map, position || positionCenter);
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
    if (infoWindow) {
      infoWindow.setContent(props.children ? container : rest.content || '');
    }
  }, [props.children, container, rest.content, infoWindow]);
  useEffect(() => {
    if (!map || !infoWindow || !visible) return;
    const positionCenter = map.getCenter();
    infoWindow.open(map, position || positionCenter);
  }, [position]);

  useMemo(() => {
    if (isOpen !== visible && infoWindow && map) {
      setIsOpen(visible);
      if (visible) {
        const positionCenter = map.getCenter();
        infoWindow.open(map, position || positionCenter);
      } else {
        infoWindow.close();
      }
    }
  }, [visible, infoWindow]);

  useSetProperties<AMap.InfoWindow, UseInfoWindow>(infoWindow!, props, Object.keys(props) as (keyof typeof props)[]);
  useEventProperties<AMap.InfoWindow, UseInfoWindow, AMap.InfoWindow.Events>(infoWindow!, props, ['onOpen', 'onClose']);

  return {
    isOpen,
    setIsOpen,
    infoWindow,
    setInfoWindow,
    InfoWindowWrapper: setWrapper,
  };
};

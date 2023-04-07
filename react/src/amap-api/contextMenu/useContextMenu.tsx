import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import type { ContextMenuProps } from '.';
import { useEventProperties } from '../utils';

interface UseContextMenu extends ContextMenuProps {}

export const useContextMenu = (props: UseContextMenu) => {
  const { position, disabled = false, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [contextMenu, setContextMenu] = useState<AMap.ContextMenu>();

  useEffect(() => {
    if (AMap && map && !contextMenu) {
      const instance = new AMap.ContextMenu(rest);
      setContextMenu(instance);
      const rightClick = (event: AMap.MapsEvent<AMap.MapEventList, unknown>) =>
        instance.open(map, position || [event.lnglat!?.lng, event.lnglat!?.lat]);
      map.on('rightclick', rightClick);
    }
    return () => {
      if (contextMenu) {
        contextMenu.clearEvents();
        contextMenu.close();
        setContextMenu(undefined);
      }
    };
  }, [map, contextMenu]);
  useEffect(() => {
    contextMenu?.close();
  }, [disabled]);

  useEventProperties<AMap.ContextMenu, UseContextMenu, AMap.ContextMenu.Events>(contextMenu!, props, [
    'onOpen',
    'onClose',
  ]);

  return {
    contextMenu,
    setContextMenu,
  };
};

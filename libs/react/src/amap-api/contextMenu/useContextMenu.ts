import { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperty } from '../utils';
import type { ContextMenuProps } from './';

interface UseContextMenu extends ContextMenuProps {}

export const useContextMenu = (props: UseContextMenu) => {
  const { position, disabled = false, ...rest } = props;
  const { map } = useMapContext();
  const [contextMenu, setContextMenu] = useState<AMap.ContextMenu>();

  useEventProperty<AMap.ContextMenu, UseContextMenu, AMap.ContextMenu.Events>(contextMenu, props, [
    'onOpen',
    'onClose',
  ]);

  useEffect(() => {
    if (AMap && map && !contextMenu) {
      const instance = new AMap.ContextMenu(rest);
      setContextMenu(instance);
      const rightClick = (event?: AMap.MapsEvent<AMap.MapEventList, unknown>) => {
        if (event?.lnglat) instance.open(map, position || event.lnglat.toArray());
      };
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

  return { contextMenu };
};

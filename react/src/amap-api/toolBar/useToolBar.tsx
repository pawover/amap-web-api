import React, { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useVisible } from '../utils';
import type { ToolBarProps } from './';

interface UseToolBar extends ToolBarProps {}

export const useToolBar = (props: UseToolBar) => {
  const { visible = true, position = 'LT', offset = [10, 10] } = props;
  const { AMap, map } = useMapContext();
  const [toolBar, setToolBar] = useState<AMap.ToolBar>();

  useEffect(() => {
    if (AMap && map && !toolBar) {
      toolBar && map.removeControl(toolBar);
      AMap.plugin(['AMap.ToolBar'], () => {
        const instance = new AMap.ToolBar({
          offset,
          position,
        });
        map.addControl(instance);
        setToolBar(instance);
      });
    }
    return () => {
      if (toolBar) {
        map?.removeControl(toolBar);
        setToolBar(undefined);
      }
    };
  }, [map, position, JSON.stringify(offset)]);

  useVisible(toolBar!, visible);

  return {
    toolBar,
    setToolBar,
  };
};

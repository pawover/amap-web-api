import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { IndoorMapProps } from "./";

interface UseIndoorMapProps extends IndoorMapProps {}

export function useIndoorMap (props: UseIndoorMapProps) {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [indoorMap, setIndoorMap] = useState<AMap.IndoorMap>();

  useVisible(indoorMap, visible);
  useProperty<AMap.IndoorMap, UseIndoorMapProps>(indoorMap, props);
  useEventProperty<AMap.IndoorMap, UseIndoorMapProps, AMap.IndoorMap.Events>(indoorMap, props, ["onComplete"]);

  // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
  useEffect(() => {
    if (AMap && map && !indoorMap) {
      const instance = new AMap.IndoorMap(rest);
      // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
      map.add(instance);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setIndoorMap(instance);
    }

    return () => {
      if (indoorMap) {
        indoorMap.clearEvents();
        indoorMap.setMap(null);
        setIndoorMap(undefined);
      }
    };
  }, [map, indoorMap]);

  return { indoorMap };
}

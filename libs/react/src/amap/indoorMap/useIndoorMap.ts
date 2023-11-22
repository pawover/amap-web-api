import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { IndoorMapProps } from "./";

interface useIndoorMap extends IndoorMapProps {}

export const useIndoorMap = (props: useIndoorMap) => {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [indoorMap, setIndoorMap] = useState<AMap.IndoorMap>();

  useVisible(indoorMap, visible);
  useProperty<AMap.IndoorMap, useIndoorMap>(indoorMap, props);
  useEventProperty<AMap.IndoorMap, useIndoorMap, AMap.IndoorMap.Events>(indoorMap, props, ["onComplete"]);

  useEffect(() => {
    if (AMap && map && !indoorMap) {
      const instance = new AMap.IndoorMap(rest);
      map.add(instance);
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
};

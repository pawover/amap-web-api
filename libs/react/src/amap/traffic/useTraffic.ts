import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { TrafficProps } from "./";

interface useTraffic extends TrafficProps {}

export const useTraffic = (props: useTraffic) => {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [traffic, setTraffic] = useState<AMap.Traffic>();

  useVisible(traffic, visible);
  useProperty<AMap.Traffic, useTraffic>(traffic, props);
  useEventProperty<AMap.Traffic, useTraffic, AMap.Traffic.Events>(traffic, props, ["onComplete"]);

  useEffect(() => {
    if (AMap && map && !traffic) {
      const instance = new AMap.Traffic(rest);
      map.add(instance);
      setTraffic(instance);
    }
    return () => {
      if (traffic) {
        traffic.clearEvents();
        traffic.setMap(null);
        setTraffic(undefined);
      }
    };
  }, [map, traffic]);

  return { traffic };
};

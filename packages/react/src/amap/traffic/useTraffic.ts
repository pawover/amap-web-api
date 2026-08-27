import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { TrafficProps } from "./";

interface UseTrafficProps extends TrafficProps {}

export function useTraffic (props: UseTrafficProps) {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [traffic, setTraffic] = useState<AMap.Traffic>();

  useVisible(traffic, visible);
  useProperty<AMap.Traffic, UseTrafficProps>(traffic, props);
  useEventProperty<AMap.Traffic, UseTrafficProps, AMap.Traffic.Events>(traffic, props, ["onComplete"]);

  // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
  useEffect(() => {
    if (AMap && map && !traffic) {
      const instance = new AMap.Traffic(rest);
      // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
      map.add(instance);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
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
}

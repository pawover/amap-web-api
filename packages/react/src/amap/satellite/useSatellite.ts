import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { SatelliteProps } from "./";

interface UseSatelliteProps extends SatelliteProps {}

export function useSatellite (props: UseSatelliteProps) {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [satellite, setSatellite] = useState<AMap.Satellite>();

  useVisible(satellite, visible);
  useProperty<AMap.Satellite, UseSatelliteProps>(satellite, props);
  useEventProperty<AMap.Satellite, UseSatelliteProps, AMap.Satellite.Events>(satellite, props, ["onComplete"]);

  // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
  useEffect(() => {
    if (AMap && map && !satellite) {
      const instance = new AMap.Satellite(rest);
      // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
      map.add(instance);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setSatellite(instance);
    }

    return () => {
      if (satellite) {
        satellite.clearEvents();
        satellite.setMap(null);
        setSatellite(undefined);
      }
    };
  }, [map, satellite]);

  return { satellite };
}

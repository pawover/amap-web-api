import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { RoadNetProps } from "./";

interface UseRoadNetProps extends RoadNetProps {}

export function useRoadNet (props: UseRoadNetProps) {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [roadNet, setRoadNet] = useState<AMap.RoadNet>();

  useVisible(roadNet, visible);
  useProperty<AMap.RoadNet, UseRoadNetProps>(roadNet, props);
  useEventProperty<AMap.RoadNet, UseRoadNetProps, AMap.RoadNet.Events>(roadNet, props, ["onComplete"]);

  // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
  useEffect(() => {
    if (AMap && map && !roadNet) {
      const instance = new AMap.RoadNet(rest);
      // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
      map.add(instance);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setRoadNet(instance);
    }

    return () => {
      if (roadNet) {
        roadNet.clearEvents();
        roadNet.setMap(null);
        setRoadNet(undefined);
      }
    };
  }, [map, roadNet]);

  return { roadNet };
}

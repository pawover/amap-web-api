import { useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty, useVisible } from "../utils";
import type { FlexibleProps } from "./";

interface UseFlexibleProps extends FlexibleProps {}

export function useFlexible (props: UseFlexibleProps) {
  const { visible = true, ...rest } = props;
  const { map } = useMapContext();
  const [flexible, setFlexible] = useState<AMap.Flexible>();

  useVisible(flexible, visible);
  useProperty<AMap.Flexible, UseFlexibleProps>(flexible, props);
  useEventProperty<AMap.Flexible, UseFlexibleProps, AMap.Flexible.Events>(flexible, props, ["onComplete"]);

  // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
  useEffect(() => {
    if (AMap && map && !flexible) {
      const instance = new AMap.Flexible(rest);
      // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
      map.add(instance);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setFlexible(instance);
    }

    return () => {
      if (flexible) {
        flexible.clearEvents();
        flexible.setMap(null);
        setFlexible(undefined);
      }
    };
  }, [map, flexible]);

  return { flexible };
}

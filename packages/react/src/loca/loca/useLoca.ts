import { useEffect, useState } from "react";
import type { LocaProps } from "./";

interface UseLocaProps extends LocaProps, LocaContext {}

export function useLoca (props: UseLocaProps) {
  const { map } = props;
  const [loca, setLoca] = useState<Loca.Container>();

  // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
  useEffect(() => {
    if (map && !loca) {
      const instance = new Loca.Container({ map });
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setLoca(instance);
    }

    return () => {
      if (loca) {
        // eslint-disable-next-line react/immutability -- AMap 为高德外部 SDK 实例，必须 mutate
        loca.clear();
        loca.destroy();
        setLoca(undefined);
      }
    };
  }, [map, loca]);

  return { loca };
}

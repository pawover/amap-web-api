import { useEffect, useState } from "react";
import { useLocaContext } from "../loca";
import type { AmbientLightProps } from "./";

interface UseAmbientLightProps extends AmbientLightProps {}

export function useAmbientLight (props: UseAmbientLightProps) {
  const { loca } = useLocaContext();
  const [ambientLight, setAmbientLight] = useState<Loca.AmbientLight>();

  useEffect(() => {
    if (loca && !ambientLight) {
      const instance = new Loca.AmbientLight(props, loca);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setAmbientLight(instance);
    }

    return () => {
      if (ambientLight) {
        loca?.removeLight(ambientLight);
        setAmbientLight(undefined);
      }
    };
  }, [loca, ambientLight]);

  return { ambientLight };
}

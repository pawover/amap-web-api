import { useEffect, useState } from "react";
import { useLocaContext } from "../index";
import type { DirectionalLightProps } from "./";

interface UseDirectionalLightProps extends DirectionalLightProps {}

export function useDirectionalLight (props: UseDirectionalLightProps) {
  const { loca } = useLocaContext();
  const [directionalLight, setDirectionalLight] = useState<Loca.DirectionalLight>();

  useEffect(() => {
    if (loca && !directionalLight) {
      const instance = new Loca.DirectionalLight(props, loca);
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
      setDirectionalLight(instance);
    }

    return () => {
      if (directionalLight) {
        loca?.removeLight(directionalLight);
        setDirectionalLight(undefined);
      }
    };
  }, [loca, directionalLight]);

  return { directionalLight };
}

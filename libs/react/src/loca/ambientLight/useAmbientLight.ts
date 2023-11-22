import { useEffect, useState } from "react";
import { useLocaContext } from "../loca";
import type { AmbientLightProps } from "./";

interface UseAmbientLightProps extends AmbientLightProps {}

export const useAmbientLight = (props: UseAmbientLightProps) => {
  const { loca } = useLocaContext();
  const [ambientLight, setAmbientLight] = useState<Loca.AmbientLight>();

  useEffect(() => {
    if (loca && !ambientLight) {
      const instance = new Loca.AmbientLight(props, loca);
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
};

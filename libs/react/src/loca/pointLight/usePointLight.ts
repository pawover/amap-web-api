import { useEffect, useState } from "react";
import { useLocaContext } from "../index";
import type { PointLightProps } from "./";

interface UsePointLightProps extends PointLightProps {}

export const usePointLight = (props: UsePointLightProps) => {
  const { loca } = useLocaContext();
  const [pointLight, setPointLight] = useState<Loca.PointLight>();

  useEffect(() => {
    if (loca && !pointLight) {
      const instance = new Loca.DirectionalLight(
        { ...props, distance: props.distance || 0, target: props.target || [0, 0, 0] },
        loca,
      );
      setPointLight(instance);
    }
    return () => {
      if (pointLight) {
        loca?.removeLight(pointLight);
        setPointLight(undefined);
      }
    };
  }, [loca, pointLight]);

  return { pointLight };
};

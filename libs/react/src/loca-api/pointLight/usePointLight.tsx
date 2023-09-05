import { useEffect, useState } from 'react';
import { useLocaContext } from '../index';
import type { PointLightProps } from './';

interface UsePointLight extends PointLightProps {}

export const usePointLight = (props: UsePointLight = {}) => {
  const { locaContainer } = useLocaContext();
  const [pointLight, setPointLight] = useState<Loca.PointLight>();

  useEffect(() => {
    if (locaContainer && !pointLight) {
      const instance = new Loca.DirectionalLight(props, props.locaContainer || locaContainer);
      setPointLight(instance);
    }
    return () => {
      if (pointLight) {
        locaContainer?.removeLight(pointLight);
        setPointLight(undefined);
      }
    };
  }, [locaContainer, pointLight, props]);

  return { pointLight };
};

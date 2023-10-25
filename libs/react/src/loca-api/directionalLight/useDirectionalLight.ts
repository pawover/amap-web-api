import { useEffect, useState } from 'react';
import { useLocaContext } from '../index';
import type { DirectionalLightProps } from './';

interface UseDirectionalLightProps extends DirectionalLightProps {}

export const useDirectionalLight = (props: UseDirectionalLightProps) => {
  const { loca } = useLocaContext();
  const [directionalLight, setDirectionalLight] = useState<Loca.DirectionalLight>();

  useEffect(() => {
    if (loca && !directionalLight) {
      const instance = new Loca.DirectionalLight(props, loca);
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
};

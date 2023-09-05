import { useEffect, useState } from 'react';
import { useLocaContext } from '../index';
import type { DirectionalLightProps } from './';

interface UseDirectionalLight extends DirectionalLightProps {}

export const useDirectionalLight = (props: UseDirectionalLight = {}) => {
  const { locaContainer } = useLocaContext();
  const [directionalLight, setDirectionalLight] = useState<Loca.DirectionalLight>();

  useEffect(() => {
    if (locaContainer && !directionalLight) {
      const instance = new Loca.DirectionalLight(props, props.locaContainer || locaContainer);
      setDirectionalLight(instance);
    }
    return () => {
      if (directionalLight) {
        locaContainer?.removeLight(directionalLight);
        setDirectionalLight(undefined);
      }
    };
  }, [locaContainer, directionalLight]);

  return { directionalLight };
};

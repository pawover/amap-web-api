import React, { useEffect, useState } from 'react';
import { useLocaContext } from '../loca';
import type { AmbientLightProps } from './';

interface UseAmbientLight extends AmbientLightProps {}

export const useAmbientLight = (props: UseAmbientLight = {}) => {
  const { locaContainer } = useLocaContext();
  const [ambientLight, setAmbientLight] = useState<Loca.AmbientLight>();

  useEffect(() => {
    if (locaContainer && !ambientLight) {
      const instance = new Loca.AmbientLight(props, props.locaContainer || locaContainer);
      setAmbientLight(instance);
    }
    return () => {
      if (ambientLight) {
        locaContainer?.removeLight(ambientLight);
        setAmbientLight(undefined);
      }
    };
  }, [locaContainer, ambientLight]);

  return { ambientLight, setAmbientLight };
};

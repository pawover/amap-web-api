import { useEffect, useState } from 'react';
import type { LocaProps } from './';

interface UseLocaProps extends LocaProps, LocaContext {}

export const useLoca = (props: UseLocaProps) => {
  const { map } = props;
  const [loca, setLoca] = useState<Loca.Container>();

  useEffect(() => {
    if (map && !loca) {
      const instance = new Loca.Container({ map });
      setLoca(instance);
    }
    return () => {
      if (loca) {
        loca.clear();
        loca.destroy();
        setLoca(undefined);
      }
    };
  }, [map, loca]);

  return { loca };
};

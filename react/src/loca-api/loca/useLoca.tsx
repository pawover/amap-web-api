import { useEffect, useState } from 'react';
import { useMapContext } from '../../index';

interface UseLoca extends MapContext {}

export const useLoca = (props: UseLoca = {}) => {
  const [locaContainer, setLocaContainer] = useState<Loca.Container>();
  const { map } = useMapContext();

  useEffect(() => {
    if (map && !locaContainer) {
      const instance = new Loca.Container({ map: props.map || map });
      setLocaContainer(instance);
    }
    return () => {
      if (locaContainer) {
        locaContainer.clearLight();
        locaContainer.destroy();
      }
    };
  }, [map, locaContainer]);

  return { locaContainer, setLocaContainer };
};

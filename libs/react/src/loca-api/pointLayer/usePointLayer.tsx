import { useEffect, useState } from 'react';
import { useLocaContext } from '../index';
import type { PointLayerProps } from './';

interface UsePointLayer extends PointLayerProps {}

export const usePointLayer = (props: UsePointLayer = {}) => {
  const { locaContainer } = useLocaContext();
  const [pointLayer, setPointLayer] = useState<Loca.PointLayer>();

  useEffect(() => {
    if (locaContainer && !pointLayer) {
      const instance = new Loca.PointLayer({ ...props, loca: props.locaContainer || locaContainer });
      setPointLayer(instance);
    }
    return () => {
      if (pointLayer) {
        pointLayer.setLoca(null);
        setPointLayer(undefined);
      }
    };
  }, [locaContainer, pointLayer]);

  return { pointLayer };
};

import { useEffect, useState } from 'react';
import { useLocaContext } from '../index';
import type { LegendProps } from './';

interface UseLegendProps extends LegendProps {}

export const useLegend = (props: UseLegendProps) => {
  const { loca } = useLocaContext();
  const [legend, setLegend] = useState<Loca.Legend>();

  useEffect(() => {
    if (loca && !legend) {
      const instance = new Loca.Legend({ ...props, loca });
      setLegend(instance);
    }
    return () => {
      if (legend) {
        legend.remove();
        setLegend(undefined);
      }
    };
  }, [loca, legend]);

  return { legend };
};

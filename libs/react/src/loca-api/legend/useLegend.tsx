import { useEffect, useState } from 'react';
import { useLocaContext } from '../index';
import type { LegendProps } from './';

interface UseLegend extends LegendProps {}

export const useLegend = (props: UseLegend = {}) => {
  const { locaContainer } = useLocaContext();
  const [legend, setLegend] = useState<Loca.Legend>();

  useEffect(() => {
    if (locaContainer && !legend) {
      const instance = new Loca.Legend({ ...props, loca: props.locaContainer || locaContainer });
      setLegend(instance);
    }
    return () => {
      if (legend) {
        legend.remove();
        setLegend(undefined);
      }
    };
  }, [locaContainer, legend]);

  return { legend };
};

import { useEffect, useState } from "react";
import { useLocaContext } from "../index";
import type { LegendProps } from "./";

interface UseLegendProps extends LegendProps {}

export function useLegend (props: UseLegendProps) {
  const { loca } = useLocaContext();
  const [legend, setLegend] = useState<Loca.Legend>();

  useEffect(() => {
    if (loca && !legend) {
      const instance = new Loca.Legend({ ...props, loca });
      // eslint-disable-next-line react/set-state-in-effect -- 实例依赖 context 的 map，只能在 effect 中创建
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
}

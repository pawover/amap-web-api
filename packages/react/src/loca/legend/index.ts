import { useImperativeHandle, type Ref } from "react";
import { useLegend } from "./useLegend";

export interface LegendProps extends Omit<Loca.Legend.Options, "loca"> {}

export function Legend (props: LegendProps & { ref?: Ref<LegendProps & { instance: Loca.Legend | undefined }> }) {
  const { legend } = useLegend(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: legend }), [props, legend]);

  return null;
}

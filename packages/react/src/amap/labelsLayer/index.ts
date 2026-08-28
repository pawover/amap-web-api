import { useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { useLabelsLayer } from "./useLabelsLayer";

export interface LabelsLayerProps extends ContextProps, AMap.LabelsLayer.Events, AMap.LabelsLayer.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
}

export function LabelsLayer (props: LabelsLayerProps & { ref?: Ref<LabelsLayerProps & { instance: AMap.LabelsLayer | undefined }> }) {
  const { labelsLayer } = useLabelsLayer(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: labelsLayer }), [props, labelsLayer]);

  return null;
}

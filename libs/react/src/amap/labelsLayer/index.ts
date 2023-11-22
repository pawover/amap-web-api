import { forwardRef, useImperativeHandle } from "react";
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

export const LabelsLayer = forwardRef<LabelsLayerProps & { instance: AMap.LabelsLayer | undefined }, LabelsLayerProps>(
  (props, ref) => {
    const { labelsLayer } = useLabelsLayer(props);
    useImperativeHandle(ref, () => ({ ...props, instance: labelsLayer }), [props, labelsLayer]);

    return null;
  },
);

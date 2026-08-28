import { useImperativeHandle, type Ref } from "react";
import type { ContextProps } from "../map";
import { useLabelMarker } from "./useLabelMarker";

export interface LabelMarkerProps extends ContextProps, AMap.LabelMarker.Events, AMap.LabelMarker.Options {}

export function LabelMarker (props: LabelMarkerProps & { ref?: Ref<LabelMarkerProps & { instance: AMap.LabelMarker | undefined }> }) {
  const { labelMarker } = useLabelMarker(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: labelMarker }), [props, labelMarker]);

  return null;
}

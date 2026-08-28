import { useImperativeHandle, type Ref } from "react";
import { useAmbientLight } from "./useAmbientLight";

export interface AmbientLightProps extends Loca.AmbientLight.Options {}

export function AmbientLight (props: AmbientLightProps & { ref?: Ref<AmbientLightProps & { instance: Loca.AmbientLight | undefined }> }) {
  const { ambientLight } = useAmbientLight(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: ambientLight }), [props, ambientLight]);

  return null;
}

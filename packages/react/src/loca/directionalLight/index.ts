import { useImperativeHandle, type Ref } from "react";
import { useDirectionalLight } from "./useDirectionalLight";

export interface DirectionalLightProps extends Loca.DirectionalLight.Options {}

export function DirectionalLight (props: DirectionalLightProps & { ref?: Ref<DirectionalLightProps & { instance: Loca.DirectionalLight | undefined }> }) {
  const { directionalLight } = useDirectionalLight(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: directionalLight }), [props, directionalLight]);

  return null;
}

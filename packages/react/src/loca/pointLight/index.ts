import { useImperativeHandle, type Ref } from "react";
import { usePointLight } from "./usePointLight";

export interface PointLightProps extends Loca.PointLight.Options {}

export function PointLight (props: PointLightProps & { ref?: Ref<PointLightProps & { instance: Loca.PointLight | undefined }> }) {
  const { pointLight } = usePointLight(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: pointLight }), [props, pointLight]);

  return null;
}

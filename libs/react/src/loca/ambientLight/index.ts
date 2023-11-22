import { forwardRef, useImperativeHandle } from "react";
import { useAmbientLight } from "./useAmbientLight";

export interface AmbientLightProps extends Loca.AmbientLight.Options {}

export const AmbientLight = forwardRef<
  AmbientLightProps & { instance: Loca.AmbientLight | undefined },
  AmbientLightProps
>((props, ref) => {
  const { ambientLight } = useAmbientLight(props);
  useImperativeHandle(ref, () => ({ ...props, instance: ambientLight }), [props, ambientLight]);

  return null;
});

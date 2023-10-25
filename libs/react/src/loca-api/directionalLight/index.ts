import { forwardRef, useImperativeHandle } from 'react';
import { useDirectionalLight } from './useDirectionalLight';

export * from './useDirectionalLight';
export interface DirectionalLightProps extends Loca.DirectionalLight.Options {}

export const DirectionalLight = forwardRef<
  DirectionalLightProps & { instance: Loca.DirectionalLight | undefined },
  DirectionalLightProps
>((props, ref) => {
  const { directionalLight } = useDirectionalLight(props);
  useImperativeHandle(ref, () => ({ ...props, instance: directionalLight }), [props, directionalLight]);

  return null;
});

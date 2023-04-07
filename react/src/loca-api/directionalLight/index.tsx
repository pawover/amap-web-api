import { forwardRef, useImperativeHandle } from 'react';
import { useDirectionalLight } from './useDirectionalLight';

export * from './useDirectionalLight';
export interface DirectionalLightProps extends LocaContext, Loca.DirectionalLight.Options {}

export const DirectionalLight = forwardRef<
  DirectionalLightProps & { directionalLight: Loca.DirectionalLight | undefined },
  DirectionalLightProps
>((props, ref) => {
  const { directionalLight } = useDirectionalLight(props);
  useImperativeHandle(ref, () => ({ ...props, directionalLight }), [directionalLight]);

  return null;
});

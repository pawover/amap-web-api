import React, { forwardRef, useImperativeHandle } from 'react';
import { useAmbientLight } from './useAmbientLight';

export * from './useAmbientLight';
export interface AmbientLightProps extends LocaContext, Loca.AmbientLight.Options {}

export const AmbientLight = forwardRef<
  AmbientLightProps & { ambientLight: Loca.AmbientLight | undefined },
  AmbientLightProps
>((props, ref) => {
  const { ambientLight } = useAmbientLight(props);
  useImperativeHandle(ref, () => ({ ...props, ambientLight }), [props, ambientLight]);

  return null;
});

import React, { forwardRef, useImperativeHandle } from 'react';
import { usePointLight } from './usePointLight';

export * from './usePointLight';
export interface PointLightProps extends LocaContext, Loca.PointLight.Options {}

export const PointLight = forwardRef<PointLightProps & { pointLight: Loca.PointLight | undefined }, PointLightProps>(
  (props, ref) => {
    const { pointLight } = usePointLight(props);
    useImperativeHandle(ref, () => ({ ...props, pointLight }), [pointLight]);

    return null;
  },
);

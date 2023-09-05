import { forwardRef, useImperativeHandle } from 'react';
import { usePointLight } from './usePointLight';

export * from './usePointLight';
export interface PointLightProps extends LocaContext, Loca.PointLight.Options {}

export const PointLight = forwardRef<PointLightProps & { instance: Loca.PointLight | undefined }, PointLightProps>(
  (props, ref) => {
    const { pointLight } = usePointLight(props);
    useImperativeHandle(ref, () => ({ ...props, instance: pointLight }), [props, pointLight]);

    return null;
  },
);

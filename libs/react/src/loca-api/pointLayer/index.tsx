import { forwardRef, useImperativeHandle } from 'react';
import { usePointLayer } from './usePointLayer';

export * from './usePointLayer';
export interface PointLayerProps extends LocaContext, Omit<Loca.PointLayer.Options, 'loca'> {}

export const PointLayer = forwardRef<PointLayerProps & { instance: Loca.PointLayer | undefined }, PointLayerProps>(
  (props, ref) => {
    const { pointLayer } = usePointLayer(props);
    useImperativeHandle(ref, () => ({ ...props, instance: pointLayer }), [props, pointLayer]);

    return null;
  },
);

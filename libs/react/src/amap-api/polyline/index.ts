import { forwardRef, useEffect, useImperativeHandle } from 'react';
import type { ContextProps } from '../map';
import { usePolyline } from './usePolyline';

export * from './usePolyline';
export interface PolylineProps extends ContextProps, AMap.Polyline.Events, AMap.Polyline.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  setChildComponentInstanceForEditor?: Fn;
}

export const Polyline = forwardRef<PolylineProps & { instance: AMap.Polyline | undefined }, PolylineProps>(
  (props, ref) => {
    const { polyline } = usePolyline(props);

    useEffect(() => {
      props?.setChildComponentInstanceForEditor?.(polyline);

      return () => {
        props?.setChildComponentInstanceForEditor?.(undefined);
      };
    }, [polyline]);

    useImperativeHandle(ref, () => ({ ...props, instance: polyline }), [props, polyline]);

    return null;
  },
);

import React, { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useInfoWindow } from './useInfoWindow';

export * from './useInfoWindow';
export interface InfoWindowProps extends CommonProps, AMap.InfoWindow.Events, AMap.InfoWindow.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  children?: JSX.Element;
}

export const InfoWindow = forwardRef<InfoWindowProps & { infoWindow: AMap.InfoWindow | undefined }, InfoWindowProps>(
  (props, ref) => {
    const { infoWindow, InfoWindowWrapper } = useInfoWindow(props);
    useImperativeHandle(ref, () => ({ ...props, infoWindow }), [props, infoWindow]);

    return <InfoWindowWrapper>{props.children}</InfoWindowWrapper>;
  },
);

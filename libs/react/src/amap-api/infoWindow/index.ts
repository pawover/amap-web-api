import { forwardRef, useImperativeHandle } from 'react';
import type { ContextProps } from '../map';
import { useInfoWindow } from './useInfoWindow';

export * from './useInfoWindow';
export interface InfoWindowProps
  extends ContextProps,
    AMap.InfoWindow.Events,
    Omit<AMap.InfoWindow.Options, 'content' | 'isCustom' | 'size'> {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  /**
   * 显示内容
   * - 指定 `content` 属性时，`children` 属性将失效
   */
  content?: React.ReactNode;
  /**
   * 显示内容
   * - 指定 `content` 属性时，`children` 属性将失效
   */
  children?: React.ReactNode;
}

export const InfoWindow = forwardRef<InfoWindowProps & { instance: AMap.InfoWindow | undefined }, InfoWindowProps>(
  (props, ref) => {
    const { infoWindow, wrapper } = useInfoWindow(props);
    useImperativeHandle(ref, () => ({ ...props, instance: infoWindow }), [props, infoWindow]);

    return wrapper;
  },
);

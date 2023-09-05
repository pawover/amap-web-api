import { forwardRef, useImperativeHandle } from 'react';
import type { ContextProps } from '../map';
import { useText } from './useText';

export * from './useText';
export interface TextProps extends ContextProps, AMap.Text.Events, AMap.Text.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  children?: React.ReactNode;
}

export const Text = forwardRef<TextProps & { instance: AMap.Text | undefined }, TextProps>((props, ref) => {
  const { text } = useText(props);
  useImperativeHandle(ref, () => ({ ...props, instance: text }), [props, text]);

  return null;
});

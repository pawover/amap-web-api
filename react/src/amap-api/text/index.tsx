import React, { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useText } from './useText';

export * from './useText';
export interface TextProps extends CommonProps, AMap.Text.Events, AMap.Text.Options {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  children?: JSX.Element;
}

export const Text = forwardRef<Omit<TextProps, 'text'> & { text: AMap.Text | undefined }, TextProps>((props, ref) => {
  const { text, TextWrapper } = useText(props);
  useImperativeHandle(ref, () => ({ ...props, text }), [props, text]);

  if (!props.children) return null;
  return <TextWrapper>{props.children}</TextWrapper>;
});

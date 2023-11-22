import { forwardRef, useImperativeHandle } from "react";
import type { ContextProps } from "../map";
import { useText } from "./useText";

export interface TextProps extends ContextProps, AMap.Text.Events, Omit<AMap.Text.Options, "text" | "content"> {
  /**
   * 是否显示
   *
   * @default true
   */
  visible?: boolean;
  /**
   * 显示内容
   * - 指定 `content` 属性时，`icon` 属性将失效
   * - 指定 `content` 属性时，`children` 属性将失效
   */
  content?: React.ReactNode;
  /**
   * 显示内容
   * - 指定 `children` 属性时，`icon` 属性将失效
   * - 指定 `content` 属性时，`children` 属性将失效
   */
  children?: React.ReactNode;
}

export const Text = forwardRef<TextProps & { instance: AMap.Text | undefined }, TextProps>((props, ref) => {
  const { text, wrapper } = useText(props);
  useImperativeHandle(ref, () => ({ ...props, instance: text }), [props, text]);

  return wrapper;
});

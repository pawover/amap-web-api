import { forwardRef, useImperativeHandle } from 'react';
import type { ContextProps } from '../map';
import { useAutocomplete, useAutoComplete } from './useAutoComplete';

export * from './useAutoComplete';
export interface AutoCompleteProps extends ContextProps, AMap.AutoComplete.Events, AMap.AutoComplete.Options {
  /** 查询的关键字 */
  keyword?: string;
  /** 查询成功时的触发事件 */
  onComplete?: (result: AMap.AutoComplete.Result) => void;
  /** 查询失败时的触发事件 */
  onError?: (result: string) => void;
}

export const AutoComplete = forwardRef<
  AutoCompleteProps & { instance: AMap.AutoComplete | undefined },
  AutoCompleteProps
>((props, ref) => {
  const { autoComplete } = useAutoComplete(props);
  useImperativeHandle(ref, () => ({ ...props, instance: autoComplete }), [props, autoComplete]);

  return null;
});
/**
 * @deprecated AMap Web API 2.x 中已废弃
 */
export const Autocomplete = forwardRef<
  AutoCompleteProps & { instance: AMap.Autocomplete | undefined },
  AutoCompleteProps
>((props, ref) => {
  const { autocomplete } = useAutocomplete(props);
  useImperativeHandle(ref, () => ({ ...props, instance: autocomplete }), [props, autocomplete]);

  return null;
});

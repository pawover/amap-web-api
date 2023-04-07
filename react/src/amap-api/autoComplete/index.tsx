import React, { forwardRef, useImperativeHandle } from 'react';
import type { CommonProps } from '../map';
import { useAutoComplete, useAutocomplete } from './useAutoComplete';

export * from './useAutoComplete';
export interface AutoCompleteProps extends CommonProps, AMap.AutoComplete.Events, AMap.AutoComplete.Options {
  /** 查询的关键字 */
  keyword?: string;
  /** 查询成功时的触发事件 */
  onComplete?: (result: AMap.AutoComplete.Result) => void;
  /** 查询失败时的触发事件 */
  onError?: (result: string) => void;
}

export const AutoComplete = forwardRef<
  AutoCompleteProps & { autoComplete: AMap.AutoComplete | undefined },
  AutoCompleteProps
>((props, ref) => {
  const { autoComplete } = useAutoComplete(props);
  useImperativeHandle(ref, () => ({ ...props, autoComplete }), [autoComplete]);

  return null;
});
/**
 * @deprecated — AMap Web API 2.0 中已废弃
 */
export const Autocomplete = forwardRef<
  AutoCompleteProps & { autocomplete: AMap.Autocomplete | undefined },
  AutoCompleteProps
>((props, ref) => {
  const { autocomplete } = useAutocomplete(props);
  useImperativeHandle(ref, () => ({ ...props, autocomplete }), [autocomplete]);

  return null;
});

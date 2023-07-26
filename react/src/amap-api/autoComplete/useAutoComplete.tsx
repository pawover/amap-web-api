import React, { useCallback, useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperties, useSetProperties } from '../utils';
import type { AutoCompleteProps } from './';

interface UseAutoComplete extends AutoCompleteProps {}

export const useAutoComplete = (props: UseAutoComplete) => {
  const { keyword, onComplete, onError, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [autoComplete, setAutoComplete] = useState<AMap.AutoComplete>();

  const callback: AMap.AutoComplete.Callback = (status, result) => {
    if (status === 'complete' && onComplete) onComplete(result as AMap.AutoComplete.Result);
    else if (onError) onError(result as string);
  };

  useEffect(() => {
    if (AMap && map && !autoComplete) {
      AMap.plugin(['AMap.AutoComplete'], () => {
        const instance = new AMap.AutoComplete(rest);
        setAutoComplete(instance);
      });
    }
    return () => {
      if (autoComplete) {
        autoComplete.clearEvents();
        setAutoComplete(undefined);
      }
    };
  }, [map, autoComplete]);

  useEffect(() => {
    if (typeof keyword === 'string' && autoComplete) {
      autoComplete.search(keyword, callback);
    }
  }, [keyword, autoComplete]);

  useSetProperties<AMap.AutoComplete, UseAutoComplete>(
    autoComplete!,
    props,
    Object.keys(props) as (keyof typeof props)[],
  );
  useEventProperties<AMap.AutoComplete, UseAutoComplete, AMap.AutoComplete.Events>(autoComplete!, props, [
    'onChoose',
    'onSelect',
  ]);

  return {
    autoComplete,
    setAutoComplete,
  };
};
/**
 * @deprecated AMap Web API 2.x 中已废弃
 */
export const useAutocomplete = (props: UseAutoComplete) => {
  const { keyword, onComplete, onError, ...rest } = props;
  const { AMap, map } = useMapContext();
  const [autocomplete, setAutocomplete] = useState<AMap.Autocomplete>();

  useEffect(() => {
    if (AMap && map && !autocomplete) {
      AMap.plugin(['AMap.Autocomplete'], () => {
        const instance = new AMap.Autocomplete(rest);
        setAutocomplete(instance);
      });
    }
    return () => {
      if (autocomplete) {
        autocomplete.clearEvents();
        setAutocomplete(undefined);
      }
    };
  }, [map, autocomplete]);

  useEffect(() => {
    if (typeof keyword === 'string' && autocomplete) {
      autocomplete.search(keyword, (status, result) => {
        if (status === 'complete' && onComplete) onComplete(result as AMap.Autocomplete.Result);
        else if (onError) onError(result as string);
      });
    }
  }, [keyword, autocomplete, onComplete, onError]);

  useSetProperties<AMap.Autocomplete, UseAutoComplete>(
    autocomplete!,
    props,
    Object.keys(props) as (keyof typeof props)[],
  );
  useEventProperties<AMap.Autocomplete, UseAutoComplete, AMap.Autocomplete.Events>(autocomplete!, props, [
    'onChoose',
    'onSelect',
  ]);

  return {
    autocomplete,
    setAutocomplete,
  };
};

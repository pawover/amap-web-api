import { useCallback, useEffect, useState } from "react";
import { useMapContext } from "../index";
import { useEventProperty, useProperty } from "../utils";
import type { AutoCompleteProps } from "./";

interface UseAutoComplete extends AutoCompleteProps {}

export const useAutoComplete = (props: UseAutoComplete) => {
  const { keyword, onComplete, onError, ...rest } = props;
  const { map } = useMapContext();
  const [autoComplete, setAutoComplete] = useState<AMap.AutoComplete>();

  const callback: AMap.AutoComplete.Callback = useCallback(
    (status, result) => {
      if (status === "complete" && onComplete) onComplete(result as AMap.AutoComplete.Result);
      else if (onError) onError(result as string);
    },
    [onComplete, onError],
  );

  useProperty<AMap.AutoComplete, UseAutoComplete>(autoComplete, props);
  useEventProperty<AMap.AutoComplete, UseAutoComplete, AMap.AutoComplete.Events>(autoComplete, props, [
    "onChoose",
    "onSelect",
  ]);

  useEffect(() => {
    if (AMap && map && !autoComplete) {
      AMap.plugin(["AMap.AutoComplete"], () => {
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
    if (typeof keyword === "string" && autoComplete) {
      autoComplete.search(keyword, callback);
    }
  }, [keyword, autoComplete, callback]);

  return { autoComplete };
};
/**
 * @deprecated AMap Web API 2.x 中已废弃
 */
export const useAutocomplete = (props: UseAutoComplete) => {
  const { keyword, onComplete, onError, ...rest } = props;
  const { map } = useMapContext();
  const [autocomplete, setAutocomplete] = useState<AMap.Autocomplete>();

  const callback: AMap.Autocomplete.Callback = useCallback(
    (status, result) => {
      if (status === "complete" && onComplete) onComplete(result as AMap.AutoComplete.Result);
      else if (onError) onError(result as string);
    },
    [onComplete, onError],
  );

  useProperty<AMap.Autocomplete, UseAutoComplete>(autocomplete, props);
  useEventProperty<AMap.Autocomplete, UseAutoComplete, AMap.Autocomplete.Events>(autocomplete, props, [
    "onChoose",
    "onSelect",
  ]);

  useEffect(() => {
    if (AMap && map && !autocomplete) {
      AMap.plugin(["AMap.Autocomplete"], () => {
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
  }, [map, autocomplete, callback]);

  useEffect(() => {
    if (typeof keyword === "string" && autocomplete) {
      autocomplete.search(keyword, callback);
    }
  }, [keyword, autocomplete, callback]);

  return { autocomplete };
};

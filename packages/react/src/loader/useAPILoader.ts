import { useEffect, useState } from "react";
import { Loader, resetLoader, type APILoaderOptions } from "amap-web-loader";

let refCount = 0;

export function useAPILoader (props: APILoaderOptions) {
  const [isLoaded, setIsLoaded] = useState(Loader.isLoaded);

  useEffect(() => {
    if (!window) {
      throw Error("Failed to load AMap: JSAPI can only be used in Browser");
    }
    refCount++;
    let cancelled = false;
    const cleanup = () => {
      cancelled = true;
      refCount--;
      if (refCount === 0) {
        resetLoader();
      }
    };
    if (Loader.isLoaded) {
      return cleanup;
    }
    Loader.load(props)
      .then((amap) => {
        if (cancelled) {
          return;
        }
        props.onSuccess?.(amap);
        setIsLoaded(true);
      })
      .catch((error: Error) => {
        if (cancelled) {
          return;
        }
        props.onError?.(error);
        setIsLoaded(true);
      })
      .finally(() => {
        if (!cancelled) {
          props.onFinally?.();
        }
      });

    return cleanup;
  }, [props]);

  return { isLoaded };
}

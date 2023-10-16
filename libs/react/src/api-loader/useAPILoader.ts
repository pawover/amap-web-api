import { useEffect, useRef, useState } from 'react';
import type { APILoaderOptions } from './';

export const useAPILoader = (props: APILoaderOptions) => {
  const [isAMapLoaded, setIsAMapLoaded] = useState(false);
  const isStrictModeRenderedRef = useRef(false);

  const createAMapLoadError = (options: APILoaderOptions, error: Error) => {
    console.error(error);
    setIsAMapLoaded(false);
    options.onError?.(error);
  };
  const createAMapUILoadError = (options: APILoaderOptions, error: Error) => {
    console.error(error);
    options.AMapUI?.onError?.(error);
  };
  const createLocaLoadError = (options: APILoaderOptions, error: Error) => {
    console.error(error);
    options.Loca?.onError?.(error);
  };

  const loadAMap = (options: APILoaderOptions) => {
    return new Promise<typeof AMap>((resolve, reject) => {
      const { version, aKey, plugins = [] } = options;
      const error = new Error('Failed to load AMap');
      const tag = document.createElement('script');

      tag.type = 'text/javascript';
      tag.src = `https://webapi.amap.com/maps?v=${version}&key=${aKey}&plugin=${plugins.join(',')}`;
      tag.onload = () => {
        isStrictModeRenderedRef.current = false;
        if (window.AMap) {
          options.onSuccess?.(window.AMap);
          setIsAMapLoaded(true);
          Promise.all([loadAMapUI(options), loadLoca(options)]);
          resolve(window.AMap);
        } else {
          document.head.removeChild(tag);
          createAMapLoadError(options, error);
          reject(error);
        }
      };
      tag.onerror = (event) => {
        document.head.removeChild(tag);
        createAMapLoadError(options, error);
        isStrictModeRenderedRef.current = false;
        reject(error);
      };

      document.head.appendChild(tag);
      isStrictModeRenderedRef.current = true;
    });
  };
  const loadAMapUI = (options: APILoaderOptions) => {
    return new Promise<typeof AMapUI | undefined>((resolve, reject) => {
      if (options.AMapUI) {
        const { version: amapVersion, AMapUI } = options;
        const error = new Error('Failed to load AMapUI');
        const v = AMapUI.version === 'auto' ? (amapVersion?.startsWith('1.') ? '1.0' : '1.1') : AMapUI.version;
        const tag = document.createElement('script');

        tag.type = 'text/javascript';
        tag.src = `https://webapi.amap.com/ui/${v}/main.js`;
        tag.onload = () => {
          if (window.AMapUI) {
            options.AMapUI?.onSuccess?.(window.AMapUI);
            resolve(window.AMapUI);
          } else {
            document.head.removeChild(tag);
            createAMapUILoadError(options, error);
            reject(error);
          }
        };
        tag.onerror = (event) => {
          document.head.removeChild(tag);
          createAMapUILoadError(options, error);
          reject(error);
        };

        document.head.appendChild(tag);
      } else {
        delete (window as { AMapUI?: typeof AMapUI }).AMapUI;
        resolve(undefined);
      }
    });
  };
  const loadLoca = (options: APILoaderOptions) => {
    return new Promise<typeof Loca | undefined>((resolve, reject) => {
      if (options.Loca) {
        const { version: amapVersion, Loca } = options;
        const error = new Error('Failed to load Loca');
        const v = Loca.version === 'auto' ? (amapVersion?.startsWith('1.') ? '1.4.22' : '2.0') : Loca.version;
        const tag = document.createElement('script');

        tag.type = 'text/javascript';
        tag.src = `https://webapi.amap.com/loca?v=${v}&key=${options.aKey}`;
        tag.onload = () => {
          if (window.Loca) {
            options.Loca?.onSuccess?.(window.Loca);
            resolve(window.Loca);
          } else {
            document.head.removeChild(tag);
            createLocaLoadError(options, error);
            reject(error);
          }
        };
        tag.onerror = (event) => {
          document.head.removeChild(tag);
          createLocaLoadError(options, error);
          reject(error);
        };

        document.head.appendChild(tag);
      } else {
        delete (window as { Loca?: typeof Loca }).Loca;
        resolve(undefined);
      }
    });
  };

  useEffect(() => {
    if (!window) {
      const error = new Error('Failed to load AMap: JSAPI can only be used in Browser');
      createAMapLoadError(props, error);
    }
    if (!isAMapLoaded && !isStrictModeRenderedRef.current) {
      if (props.aKey) {
        window._AMapSecurityConfig = { securityJsCode: props.sKey, serviceHost: props.serviceHost };
        props.version = props.version || '2.0';
        props.plugins = props.plugins || [];

        loadAMap(props);
      } else {
        const error = new Error('Failed to load AMap: aKey is required');
        createAMapLoadError(props, error);
      }
    }
  }, [isAMapLoaded, props]);

  return { isAMapLoaded };
};

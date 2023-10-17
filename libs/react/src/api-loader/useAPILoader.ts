import { useEffect, useRef, useState } from 'react';
import type { APILoaderOptions } from './';

const AMapUIPlugins = [
  'control/BasicControl',
  'geo/DistrictCluster',
  'geo/DistrictExplorer',
  'misc/MarkerList',
  'misc/MobiCityPicker',
  'misc/PathSimplifier',
  'misc/PoiPicker',
  'misc/PointSimplifier',
  'misc/PointSimplifr',
  'misc/PositionPicker',
  'overlay/AwesomeMarker',
  'overlay/SimpleInfoWindow',
  'overlay/SimpleMarker',
  'overlay/SvgMarker',
];

export const useAPILoader = (props: APILoaderOptions) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isStrictModeRenderedRef = useRef(false);

  const loadAMap = (options: APILoaderOptions) => {
    return new Promise<typeof AMap>((resolve, reject) => {
      const { version, aKey, plugins = [] } = options;
      const error = new Error('Failed to load AMap');
      const tag = document.createElement('script');

      tag.type = 'text/javascript';
      tag.src = `https://webapi.amap.com/maps?v=${version}&key=${aKey}&plugin=${plugins.join(',')}`;
      tag.onload = () => {
        isStrictModeRenderedRef.current = false;
        Promise.all([loadAMapUI(options), loadLoca(options)])
          .then((value) => {
            resolve(window.AMap);
          })
          .catch((reason) => {
            reject(reason);
          })
          .finally(() => {
            setIsLoaded(true);
          });
      };
      tag.onerror = (event) => {
        setIsLoaded(true);

        document.head.removeChild(tag);
        options.onError?.(error);
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
            if (options.AMapUI?.plugins?.length) {
              const optionsPlugins = options.AMapUI.plugins;
              const unknownPlugin = optionsPlugins.find((o) => !AMapUIPlugins.some((a) => a === o));

              if (!unknownPlugin) {
                window.AMapUI.loadUI(optionsPlugins, (...args) => {
                  for (let index = 0; index < optionsPlugins.length; index++) {
                    const name = optionsPlugins[index]?.split('/').slice(-1)[0];
                    name && ((window.AMapUI as Recordable)[name] = args[index]);
                  }
                  options.AMapUI?.onSuccess?.(window.AMapUI);
                  resolve(window.AMapUI);
                });
              } else {
                const error = new Error(`Unknown AMapUI Plugin: "${unknownPlugin}"`);
                options.AMapUI?.onError?.(error);
                reject(error);
              }
            } else {
              options.AMapUI?.onSuccess?.(window.AMapUI);
              resolve(window.AMapUI);
            }
          } else {
            document.head.removeChild(tag);
            options.AMapUI?.onError?.(error);
            reject(error);
          }
        };
        tag.onerror = (event) => {
          document.head.removeChild(tag);
          options.AMapUI?.onError?.(error);
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
            options.Loca?.onError?.(error);
            reject(error);
          }
        };
        tag.onerror = (event) => {
          document.head.removeChild(tag);
          options.Loca?.onError?.(error);
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
    if (!window) throw Error('Failed to load AMap: JSAPI can only be used in Browser');
    if (!isLoaded && !isStrictModeRenderedRef.current) {
      if (props.aKey) {
        window._AMapSecurityConfig = { securityJsCode: props.sKey, serviceHost: props.serviceHost };
        props.version = props.version || '2.0';
        props.plugins = props.plugins || [];

        loadAMap(props);
      } else {
        const error = new Error('Failed to load AMap: aKey is required');
        props.onError?.(error);
        console.error(error);
      }
    }
  }, [isLoaded, props]);

  return { isLoaded };
};

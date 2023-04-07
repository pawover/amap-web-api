import { useEffect, useState } from 'react';
import { load } from '@amap/amap-jsapi-loader';

export interface APILoaderOptions {
  /**
   * 应用密钥
   * - 使用高德地图 AMap Web API 服务前，需先前往高德开放平台 [创建应用](https://lbs.amap.com/dev/key/app)
   * - 自 2021年12月02日 升级之后所申请的 KEY 必须配备安全密钥 `sKey` 一起使用
   * - 您可以查阅 [开发文档](https://lbs.amap.com/api/javascript-api/guide/abc/prepare) 获取详细入门教程
   * ---
   * - 以下是简要流程：
   *   - 首先 [注册开发者账号](https://lbs.amap.com/dev/id/newuser)，成为高德开放平台开发者
   *   - 登陆后进入 [应用管理](https://console.amap.com/dev/key/app) 页面，点击「创建新应用」
   *   - 为应用[添加 Key](https://lbs.amap.com/dev/key/app)，请在「服务平台」一项请选择「Web端(JS API)」
   */
  aKey: string;
  /**
   * 安全密钥
   * - 自 2021年12月02日 升级之后所申请的 KEY 必须配备安全密钥 `sKey` 一起使用
   * - 如 `aKey` 为升级之前申请的 KEY，可忽略此参数
   */
  sKey?: string;
  /**
   * 代理服务器的域名或地址
   */
  serviceHost?: `http://${string}/_AMapService` | `https://${string}/_AMapService`;
  /**
   * AMap Web API 版本号
   * - 默认为 `"2.0"`
   *
   * @example "1.4.15"
   * @default "2.0"
   */
  version?: `${string}.${string}`;
  /**
   * 预加载一个或者多个 AMap Web API 插件
   *
   * @example ["AMap.ToolBar", "AMap.Driving"]
   */
  plugins?: string[];
  /**
   * 是否加载 AMapUI 组件库 API
   */
  AMapUI?: {
    /**
     * AMapUI API 版本号
     * - 设置为 `"auto"` 根据 AMap Web API 版本加载，也可以指定 AMapUI API 版本号。
     * - AMap Web API 2.0 版本需要使用 AMapUI API 1.1 以上版本。
     */
    version: 'auto' | `${string}.${string}`;
    /**
     * 预加载一个或者多个 AMapUI 插件
     *
     * @example ["ui/misc/PathSimplifier", "ui/misc/PointSimplifier"]
     */
    plugins?: (keyof AMapUI.PluginMaps)[];
  };
  /**
   * 是否加载 Loca 数据可视化 API
   */
  Loca?: {
    /**
     * Loca API 版本号
     * - 设置为 `"auto"` 根据 AMap Web API 版本加载，也可以指定 Loca API 版本号。
     * - Loca API 2.0 版本和 Loca API 1.3.x 版本不兼容，它们是针对不同的 AMap Web API 版本进行的封装。
     * - 如果您需要使用 AMap Web API 1.4.x，那么只能使用 Loca API 1.3.x；如果您需要使用 AMap Web API 2.0，那么只能使用 Loca API 2.0。
     */
    version: 'auto' | `${string}.${string}`;
  };
  /**
   * Loader resolve 时的回调
   */
  onSuccess?: (amap: typeof AMap) => unknown;
  /**
   * Loader reject 时的回调
   */
  onError?: (error: Error) => unknown;
  /**
   * Loader 执行完成时的回调
   */
  onFinally?: (...args: any[]) => unknown;
}

/**
 * 高德地图 APILoader 加载组件
 * - 默认使用 AMap Web API 2.0 版本
 * - TypeScript 类型定义支持 AMap Web API 2.0 版本，如使用低版本时遇到 API 定义冲突、丢失、不存在等，请手动补全类型定义
 */
export const APILoader: React.FC<React.PropsWithChildren<APILoaderOptions>> = (props) => {
  const { children, aKey, sKey, ...options } = props;

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (aKey) {
      window._AMapSecurityConfig = { securityJsCode: sKey, serviceHost: options.serviceHost };
      const loadOptions: Parameters<typeof load>[0] = {
        key: aKey,
        version: options.version || '2.0',
        plugins: options.plugins || [],
      };
      if (options.AMapUI) {
        loadOptions.AMapUI = options.AMapUI;
        if (options.AMapUI.version === 'auto') {
          loadOptions.AMapUI.version = loadOptions.version.startsWith('1.') ? '1.0' : '1.1';
        }
      }
      if (options.Loca) {
        loadOptions.Loca = options.Loca;
        if (options.Loca.version === 'auto') {
          loadOptions.Loca.version = loadOptions.version.startsWith('1.') ? '1.3.2' : '2.0';
        }
      }
      load(loadOptions)
        .then((amap: typeof AMap) => {
          options.onSuccess?.(amap);
          setLoaded(true);
        })
        .catch((error) => {
          options.onError?.(error);
          setLoaded(false);
        });
    } else {
      const error = new TypeError('Failed to load AMap: aKey is required');
      if (options.onError) {
        options.onError(error);
      } else {
        throw error;
      }
    }
    return () => {};
  }, [aKey, sKey]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return loaded ? <>{children}</> : null;
};

import { useEffect, useState } from 'react';
import { useDebounceFn } from 'ahooks';
import { load } from '@amap/amap-jsapi-loader';

interface AMapUILoader {
  /**
   * AMapUI API 版本号
   * - 设置为 `"auto"` 根据 AMap Web API 版本加载，也可以指定 AMapUI API 版本号。
   * - AMap Web API 2.x 版本需要使用 AMapUI API 1.1 以上版本。
   */
  version: 'auto' | `${string}.${string}`;
  /**
   * 预加载一个或者多个 AMapUI 插件
   *
   * @example ["misc/PathSimplifier", "misc/PointSimplifier"]
   */
  plugins?: (keyof AMapUI.PluginMaps)[];
}
interface LocaLoader {
  /**
   * Loca API 版本号
   * - 设置为 `"auto"` 根据 AMap Web API 版本加载，也可以指定 Loca API 版本号。
   * - Loca API 2.x 版本和 Loca API 1.3.x 版本不兼容，它们是针对不同的 AMap Web API 版本进行的封装。
   * - 如果您需要使用 AMap Web API 1.4.x，那么只能使用 Loca API 1.3.x；如果您需要使用 AMap Web API 2.x，那么只能使用 Loca API 2.x。
   */
  version: 'auto' | `${string}.${string}`;
}

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
  serviceHost?: `http${string}://${string}/_AMapService`;
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
  plugins?: AMap.Plugin[];
  /**
   * 是否加载 AMapUI 组件库 API
   */
  AMapUI?: AMapUILoader;
  /**
   * 是否加载 Loca 数据可视化 API
   */
  Loca?: LocaLoader;
  /**
   * Loader resolve 时的回调
   */
  onSuccess?: (amap: typeof AMap) => void;
  /**
   * Loader reject 时的回调
   */
  onError?: (error: Error) => void;
  /**
   * Loader 执行完成时的回调
   */
  onFinally?: Fn;
}

/**
 * 高德地图 APILoader 加载组件
 * - 默认使用 AMap Web API 2.x 版本
 * - TypeScript 类型定义支持 AMap Web API 2.x 版本，如使用低版本时遇到 API 定义冲突、丢失、不存在等，请手动补全类型定义
 */
export const APILoader: React.FC<React.PropsWithChildren<APILoaderOptions>> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const { run: onSuccess } = useDebounceFn(
    (amap: typeof AMap) => {
      props.onSuccess?.(amap);
      setIsLoaded(true);
    },
    { wait: 150 },
  );
  const { run: onError } = useDebounceFn(
    (error) => {
      props.onError?.(error);
      setIsLoaded(false);
    },
    { wait: 150 },
  );

  useEffect(() => {
    if (!isLoaded) {
      if (props.aKey) {
        window._AMapSecurityConfig = { securityJsCode: props.sKey, serviceHost: props.serviceHost };
        const loadOptions: Parameters<typeof load>[0] = {
          key: props.aKey,
          version: props.version || '2.0',
          plugins: props.plugins || [],
        };
        if (props.AMapUI) {
          loadOptions.AMapUI = props.AMapUI;
          if (props.AMapUI.version === 'auto') {
            loadOptions.AMapUI.version = loadOptions.version.startsWith('1.') ? '1.0' : '1.1';
          }
        }
        if (props.Loca) {
          loadOptions.Loca = props.Loca;
          if (props.Loca.version === 'auto') {
            loadOptions.Loca.version = loadOptions.version.startsWith('1.') ? '1.4.22' : '2.0';
          }
        }
        load(loadOptions).then(onSuccess).catch(onError);
      } else {
        const errorMsg = 'Failed to load AMap: aKey is required';
        const error = new TypeError(errorMsg);
        console.error(errorMsg);
        props.onError?.(error);
      }
    }
  }, [isLoaded, props]);

  return isLoaded ? props.children : null;
};

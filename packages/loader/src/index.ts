import "amap-web-types";
import type { AnyFunction, PlainObject } from "@pawover/kit-types";

const AMapUIPlugins = [
  "control/BasicControl",
  "geo/DistrictCluster",
  "geo/DistrictExplorer",
  "misc/MarkerList",
  "misc/MobiCityPicker",
  "misc/PathSimplifier",
  "misc/PoiPicker",
  "misc/PointSimplifier",
  "misc/PointSimplifr",
  "misc/PositionPicker",
  "overlay/AwesomeMarker",
  "overlay/SimpleInfoWindow",
  "overlay/SimpleMarker",
  "overlay/SvgMarker",
];

type LoaderStatus = "notload" | "loading" | "loaded" | "failed";

const amapState = {
  status: "notload" as LoaderStatus,
  key: "" as string | undefined,
  version: "2.0" as string | undefined,
  plugins: [] as string[],
  promise: null as Promise<typeof AMap> | null,
};

const amapUIState = {
  status: "notload" as LoaderStatus,
  version: "1.1" as string | undefined,
  promise: null as Promise<typeof AMapUI | undefined> | null,
};

const locaState = {
  status: "notload" as LoaderStatus,
  version: "2.0" as string | undefined,
  promise: null as Promise<typeof Loca | undefined> | null,
};

/**
 * 是否加载 AMapUI 组件库 API
 */
export interface AMapUILoader {
  /**
   * AMapUI API 版本号
   * - 设置为 `"auto"` 根据 AMap Web API 版本加载，也可以指定 AMapUI API 版本号。
   * - AMap Web API 2.x 版本需要使用 AMapUI API 1.1 以上版本。
   */
  version?: "auto" | `${string}.${string}`;
  /**
   * 预加载一个或者多个 AMapUI 插件
   *
   * @example ["misc/PathSimplifier", "misc/PointSimplifier"]
   */
  plugins?: (keyof AMapUI.UIPlugins)[];
  /**
   * Loader resolve 时的回调
   */
  onSuccess?: (amapUI: typeof AMapUI) => void;
  /**
   * Loader reject 时的回调
   */
  onError?: (error: Error) => void;
}

/**
 * 是否加载 Loca 数据可视化 API
 */
export interface LocaLoader {
  /**
   * Loca API 版本号
   * - 设置为 `"auto"` 根据 AMap Web API 版本加载，也可以指定 Loca API 版本号。
   * - Loca API 2.x 版本和 Loca API 1.3.x 版本不兼容，它们是针对不同的 AMap Web API 版本进行的封装。
   * - 如果您需要使用 AMap Web API 1.4.x，那么只能使用 Loca API 1.3.x；如果您需要使用 AMap Web API 2.x，那么只能使用 Loca API 2.x。
   */
  version?: "auto" | `${string}.${string}`;
  /**
   * Loader resolve 时的回调
   */
  onSuccess?: (loca: typeof Loca) => void;
  /**
   * Loader reject 时的回调
   */
  onError?: (error: Error) => void;
}

/**
 * 高德地图 APILoader 加载配置
 */
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
  onFinally?: AnyFunction;
}

function rejectMismatch<T> (message: string): Promise<T> {
  return Promise.reject(new Error(message));
}

function loadAMapUI (options: APILoaderOptions): Promise<typeof AMapUI | undefined> {
  if (!options.AMapUI) {
    delete (window as { AMapUI?: typeof AMapUI }).AMapUI;

    return Promise.resolve(undefined);
  }
  const { AMapUI: amapUIOpts } = options;
  if (amapUIState.status === "loaded" || amapUIState.status === "loading") {
    if (amapUIOpts.version && amapUIOpts.version !== amapUIState.version) {
      return rejectMismatch<typeof AMapUI | undefined>("不允许多个版本 AMapUI 混用");
    }

    return amapUIState.promise!;
  }
  if (amapUIState.status === "failed") {
    return rejectMismatch<typeof AMapUI | undefined>("先前请求 AMapUI 失败");
  }

  const amapVersion = options.version || "2.0";
  const v = amapUIOpts.version === "auto" ? (amapVersion.startsWith("1.") ? "1.0" : "1.1") : (amapUIOpts.version ?? "1.1");
  amapUIState.version = v;
  amapUIState.status = "loading";
  amapUIState.promise = new Promise((resolve, reject) => {
    const tag = document.createElement("script");
    const error = new Error("Failed to load AMapUI");
    tag.type = "text/javascript";
    tag.src = `https://webapi.amap.com/ui/${v}/main.js`;
    tag.onload = () => {
      if (window.AMapUI) {
        const plugins = amapUIOpts.plugins;
        if (plugins?.length) {
          const unknown = plugins.find((o) => !AMapUIPlugins.includes(o));
          if (!unknown) {
            window.AMapUI.loadUI(plugins, (...args) => {
              for (let index = 0; index < plugins.length; index++) {
                const name = plugins[index]?.split("/").slice(-1)[0];
                name && ((window.AMapUI as PlainObject)[name] = args[index]);
              }
              amapUIOpts.onSuccess?.(window.AMapUI);
              resolve(window.AMapUI);
            });
          } else {
            const e = new Error(`Unknown AMapUI Plugin: "${unknown}"`);
            amapUIOpts.onError?.(e);
            reject(e);
          }
        } else {
          amapUIOpts.onSuccess?.(window.AMapUI);
          resolve(window.AMapUI);
        }
      } else {
        document.head.removeChild(tag);
        amapUIOpts.onError?.(error);
        reject(error);
      }
    };
    tag.onerror = () => {
      document.head.removeChild(tag);
      amapUIOpts.onError?.(error);
      reject(error);
    };
    document.head.appendChild(tag);
  });

  return amapUIState.promise;
}

function loadLoca (options: APILoaderOptions): Promise<typeof Loca | undefined> {
  if (!options.Loca) {
    delete (window as { Loca?: typeof Loca }).Loca;

    return Promise.resolve(undefined);
  }
  const { Loca: locaOpts } = options;
  if (locaState.status === "loaded" || locaState.status === "loading") {
    if (locaOpts.version && locaOpts.version !== locaState.version) {
      return rejectMismatch<typeof Loca | undefined>("不允许多个版本 Loca 混用");
    }

    return locaState.promise!;
  }
  if (locaState.status === "failed") {
    return rejectMismatch<typeof Loca | undefined>("先前请求 Loca 失败");
  }

  const amapVersion = options.version || "2.0";
  const v = locaOpts.version === "auto" ? (amapVersion.startsWith("1.") ? "1.4.22" : "2.0") : (locaOpts.version ?? "2.0");
  if (amapState.status === "loaded" && amapState.version) {
    const amapMajor = Number(amapState.version.split(".")[0]);
    const locaMajor = Number(v.split(".")[0]);
    if (amapMajor !== locaMajor) {
      return rejectMismatch<typeof Loca | undefined>(`AMap 与 Loca 大版本须对应（AMap ${amapState.version}，Loca ${v}）`);
    }
  }
  locaState.version = v;
  locaState.status = "loading";
  locaState.promise = new Promise((resolve, reject) => {
    const tag = document.createElement("script");
    const error = new Error("Failed to load Loca");
    tag.type = "text/javascript";
    tag.src = `https://webapi.amap.com/loca?v=${v}&key=${options.aKey}`;
    tag.onload = () => {
      if (window.Loca) {
        locaOpts.onSuccess?.(window.Loca);
        resolve(window.Loca);
      } else {
        document.head.removeChild(tag);
        locaOpts.onError?.(error);
        reject(error);
      }
    };
    tag.onerror = () => {
      document.head.removeChild(tag);
      locaOpts.onError?.(error);
      reject(error);
    };
    document.head.appendChild(tag);
  });

  return locaState.promise;
}

function loadAMap (options: APILoaderOptions): Promise<typeof AMap> {
  if (amapState.status === "loaded" || amapState.status === "loading") {
    if (options.aKey && options.aKey !== amapState.key) {
      return rejectMismatch("多个不一致的 key");
    }
    if (options.version && options.version !== amapState.version) {
      return rejectMismatch("不允许多个版本 JSAPI 混用");
    }

    return amapState.promise!;
  }
  if (amapState.status === "failed") {
    return rejectMismatch("AMap 加载已失败");
  }
  if (!options.aKey) {
    return rejectMismatch("aKey is required");
  }
  if (window.AMap && location.host !== "lbs.amap.com") {
    return rejectMismatch("禁止多种 API 加载方式混用");
  }

  const version = options.version || "2.0";
  amapState.key = options.aKey;
  amapState.version = version;
  amapState.plugins = options.plugins || [];
  amapState.status = "loading";
  amapState.promise = new Promise((resolve, reject) => {
    window._AMapSecurityConfig = { securityJsCode: options.sKey, serviceHost: options.serviceHost };
    const tag = document.createElement("script");
    tag.type = "text/javascript";
    tag.src = `https://webapi.amap.com/maps?callback=___onAPILoaded&v=${version}&key=${options.aKey}&plugin=${amapState.plugins.join(",")}`;
    tag.onerror = () => {
      amapState.status = "failed";
      reject(new Error("Failed to load AMap"));
    };
    window.___onAPILoaded = (err?: string) => {
      delete window.___onAPILoaded;
      if (err) {
        amapState.status = "failed";
        reject(new Error(err));

        return;
      }
      amapState.status = "loaded";
      Promise.all([loadAMapUI(options), loadLoca(options)])
        .then(() => resolve(window.AMap))
        .catch(reject);
    };
    document.head.appendChild(tag);
  });

  return amapState.promise;
}

/**
 * 重置 Loader 全部状态并清理页面全局对象
 * - 清理 `window.AMap` / `window.AMapUI` / `window.Loca`
 * - 重置内部状态机为 `notload`
 */
export function resetLoader () {
  amapState.status = "notload";
  amapState.promise = null;
  amapState.version = undefined;
  amapState.key = undefined;
  amapUIState.status = "notload";
  amapUIState.promise = null;
  amapUIState.version = undefined;
  locaState.status = "notload";
  locaState.promise = null;
  locaState.version = undefined;
  delete window.AMap;
  delete window.AMapUI;
  delete window.Loca;
}

/**
 * 高德地图 JS API 加载器（模块级单例）
 * - 负责把 AMap / AMapUI / Loca 资源注入页面，重复加载不重复请求
 * - 可脱离框架直接使用，亦被 `amap-web-react` 的 `useAPILoader` / `APILoader` 内部复用
 */
export interface AMapLoader {
  /**
   * 加载 AMap 主资源（按需并行加载 AMapUI / Loca）
   *
   * @param options 加载配置
   * @returns AMap 命名空间
   */
  load: (options: APILoaderOptions) => Promise<typeof AMap>;
  /**
   * 仅加载 AMapUI 组件库
   *
   * @param options 加载配置
   * @returns AMapUI 命名空间；未配置 `AMapUI` 时返回 `undefined`
   */
  loadUI: (options: APILoaderOptions) => Promise<typeof AMapUI | undefined>;
  /**
   * 仅加载 Loca 数据可视化库
   *
   * @param options 加载配置
   * @returns Loca 容器；未配置 `Loca` 时返回 `undefined`
   */
  loadLoca: (options: APILoaderOptions) => Promise<typeof Loca | undefined>;
  /**
   * 重置全部状态并清理页面全局对象
   */
  reset: () => void;
  /**
   * 是否已加载完成
   */
  readonly isLoaded: boolean;
  /**
   * 当前加载状态机
   */
  readonly status: LoaderStatus;
}

class AMapLoaderImpl implements AMapLoader {
  get isLoaded (): boolean {
    return amapState.status === "loaded";
  }

  get status (): LoaderStatus {
    return amapState.status;
  }

  load (options: APILoaderOptions): Promise<typeof AMap> {
    return loadAMap(options);
  }

  loadUI (options: APILoaderOptions): Promise<typeof AMapUI | undefined> {
    return loadAMapUI(options);
  }

  loadLoca (options: APILoaderOptions): Promise<typeof Loca | undefined> {
    return loadLoca(options);
  }

  reset (): void {
    resetLoader();
  }
}

/**
 * 高德地图 JS API 加载器单例
 */
export const Loader = new AMapLoaderImpl();

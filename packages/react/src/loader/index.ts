import type { APILoaderOptions } from "amap-web-loader";
import { useAPILoader } from "./useAPILoader";

export * from "amap-web-loader";
export * from "./useAPILoader";

/**
 * 高德地图 APILoader 加载组件
 * - 默认使用 AMap Web API 2.x 版本
 * - TypeScript 类型定义支持 AMap Web API 2.x 版本，如使用低版本时遇到 API 定义冲突、丢失、不存在等，请手动补全类型定义
 */
export const APILoader: React.FC<React.PropsWithChildren<APILoaderOptions>> = (props) => {
  const { children, ...rest } = props;
  const { isLoaded } = useAPILoader(rest);

  return isLoaded ? children : null;
};

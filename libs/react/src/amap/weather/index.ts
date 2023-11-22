import { forwardRef, useImperativeHandle } from "react";
import type { ContextProps } from "../map";
import { useWeather } from "./useWeather";

export interface WeatherProps extends ContextProps {
  /**
   * 地理编码时地址描述所在的城市
   * - 可选值：城市名（中文或中文全拼）、citycode、adcode
   *
   * @default "全国"
   */
  city?: string;
  /**
   * 获取 `查询实时天气信息` 或 `查询四天预报天气`
   * - `live` 查询实时天气信息。
   * - `forecast` 查询四天预报天气，包括查询当天天气信息
   *
   * @default live
   */
  type?: "live" | "forecast";
  /** 查询成功时的触发事件 */
  onComplete?: (result: AMap.Weather.ForecastResult | AMap.Weather.LiveResult) => void;
  /** 查询失败时的触发事件 */
  onError?: (result: string) => void;
}

export const Weather = forwardRef<WeatherProps & { instance: AMap.Weather | undefined }, WeatherProps>((props, ref) => {
  const { weather } = useWeather(props);
  useImperativeHandle(ref, () => ({ ...props, instance: weather }), [props, weather]);

  return null;
});

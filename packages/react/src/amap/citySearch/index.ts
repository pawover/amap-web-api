import { useImperativeHandle, type Ref } from "react";
import { useCitySearch } from "./useCitySearch";

export interface CitySearchProps extends AMap.CitySearch.Events, AMap.CitySearch.Options {
  /** 查询的 IP 地址 */
  ip?: string;
}

export function CitySearch (props: CitySearchProps & { ref?: Ref<CitySearchProps & { instance: AMap.CitySearch | undefined }> }) {
  const { citySearch } = useCitySearch(props);
  useImperativeHandle(props.ref, () => ({ ...props, instance: citySearch }), [props, citySearch]);

  return null;
}

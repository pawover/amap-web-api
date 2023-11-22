import { forwardRef, useImperativeHandle } from "react";
import { useCitySearch } from "./useCitySearch";

export interface CitySearchProps extends AMap.CitySearch.Events, AMap.CitySearch.Options {
  /** 查询的 IP 地址 */
  ip?: string;
}

export const CitySearch = forwardRef<CitySearchProps & { instance: AMap.CitySearch | undefined }, CitySearchProps>(
  (props, ref) => {
    const { citySearch } = useCitySearch(props);
    useImperativeHandle(ref, () => ({ ...props, instance: citySearch }), [props, citySearch]);

    return null;
  },
);

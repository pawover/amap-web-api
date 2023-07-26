import React, { useEffect, useState } from 'react';
import { useMapContext } from '../index';
import { useEventProperties, useSetProperties, useVisible } from '../utils';
import type { MassMarksProps } from './';

interface UseMassMarks extends MassMarksProps {}

export const useMassMarks = (props: UseMassMarks) => {
  const { visible = true, ...rest } = props;
  const { AMap, map } = useMapContext();
  const { opacity = 1, zIndex = 120, style, data } = rest || {};
  const [massMarks, setMassMarks] = useState<AMap.MassMarks>();

  useEffect(() => {
    if (AMap && map && !massMarks) {
      let initStyle = style;
      if (!initStyle) {
        // AMap Web API 2.x 支持显示设置 `zIndex`, `zIndex` 越大约靠前，默认按顺序排列
        initStyle = [
          {
            url: 'https://webapi.amap.com/images/mass/mass0.png',
            anchor: new AMap.Pixel(6, 6),
            size: new AMap.Size(11, 11),
            zIndex: 3,
          },
          {
            url: 'https://webapi.amap.com/images/mass/mass1.png',
            anchor: new AMap.Pixel(4, 4),
            size: new AMap.Size(7, 7),
            zIndex: 2,
          },
          {
            url: 'https://webapi.amap.com/images/mass/mass2.png',
            anchor: new AMap.Pixel(3, 3),
            size: new AMap.Size(5, 5),
            zIndex: 1,
          },
        ];
      }
      const instance = new AMap.MassMarks(data || [], { opacity, zIndex, style: initStyle });
      // 将海量点实例添加到地图上
      // map.add(instance);
      setMassMarks(instance);
      instance.setMap(map);
    }
    return () => {
      if (massMarks) {
        massMarks.clear();
        setMassMarks(undefined);
      }
    };
  }, [map, massMarks]);

  useVisible(massMarks!, visible);
  useSetProperties<AMap.MassMarks, UseMassMarks>(massMarks!, props, Object.keys(props) as (keyof typeof props)[]);
  useEventProperties<AMap.MassMarks, UseMassMarks, AMap.MassMarks.Events>(massMarks!, props, [
    'onClick',
    'onDblClick',
    'onMouseUp',
    'onMouseDown',
    'onMouseOver',
    'onMouseOut',
    'onMouseMove',
    'onTouchStart',
    'onTouchEnd',
    'onComplete',
  ]);

  return { massMarks, setMassMarks };
};

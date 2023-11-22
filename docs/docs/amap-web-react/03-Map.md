# Map 地图容器

作为容器，Map 组件是其他地图组件的基础

Map 组件会给所有的子组件注入三个属性 `AMap`、`map` 和 `container`

::: warning 提示

- 组件 `Map` 必须包裹在 `APILoader` 组件内
- 其他地图组件必须作为 `Map` 的子组件使用
  :::

## 基本用法

```jsx
import { APILoader } from "amap-web-react";
// moduleResolution: Node
// import { Map, Marker } from "amap-web-react/dist/amap";
import { Map, Marker } from "amap-web-react/amap";

const App = () => (
  <Map
    center={[116.405285, 39.904989]}
    style={{ height: 300 }}
  >
    <Marker
      title="北京市"
      position={[116.405285, 39.904989]}
    />
  </Map>
);

createRoot(document.getElementById("root")).render(
  <APILoader aKey="您的密钥">
    <App />
  </APILoader>,
);
```

## useMapContext

一个无需为每层组件手动注入 `AMap`、`map` 和 `container` ，就能在组件树间进行传递的 hook，由 `React.Context` 实现。

```jsx
import { useState } from "react";
import { APILoader } from "amap-web-react";
import { Map, useMapContext } from "amap-web-react/amap";

const MyComponent = () => {
  const { AMap, map, container } = useMapContext();
  const [zoom, setZoom] = useState(15);

  return (
    <>
      <button onClick={() => map.setZoom(zoom + 1)}>放大 +1 -> ({zoom})</button>
      <button onClick={() => map.setZoom(zoom - 1)}>缩小 -1 -> ({zoom})</button>
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <APILoader aKey="您的密钥">
    <Map style={{ height: 300 }}>
      <MyComponent />
    </Map>
  </APILoader>,
);
```

## 获取地图实例对象

可以通过 `React.useRef` 获取地图实例对象，也可以在 `Map` 组件加载完毕后使用 `useMapContext` 获取地图实例对象。

```jsx
import { useRef } from "react";
import { APILoader } from "amap-web-react";
import { Map } from "amap-web-react/amap";

const mapRef = useRef(null);

useEffect(() => {
  console.log("🆑 => mapRef", mapRef);
}, [mapRef.current]);

createRoot(document.getElementById("root")).render(
  <APILoader aKey="您的密钥">
    <Map
      ref={mapRef}
      style={{ height: 300 }}
    />
  </APILoader>,
);
```

## API

| 属性                | 说明                                                                  |                        类型                        |                默认值                 | 版本 |
| :------------------ | :-------------------------------------------------------------------- | :------------------------------------------------: | :-----------------------------------: | :--: |
| options             |                                                                       |                                                    |                                       |      |
| `container`         | 传入一个 `html` 元素作为地图容器                                      |                  `HTMLDivElement`                  |               `<div />`               |      |
| `center`            | 初始地图中心经纬度                                                    |                    `LngLatLike`                    |                   -                   |      |
| `zoom`              | 地图显示的缩放级别，可以设置为浮点数                                  |                      `number`                      |                 `15`                  |      |
| `zooms`             | 地图显示的缩放级别范围，取值范围 `2 ~ 30`                             |                 `[number, number]`                 |               `[2, 20]`               |      |
| `layers`            | 地图显示的图层数组，可以是图层中的一个或多个                          | `(TileLayer \| Satellite \| Traffic \| RoadNet)[]` |              `TileLayer`              |      |
| `features`          | 地图显示的元素种类                                                    |   `('bg' \| 'point' \| 'road' \| 'building')[]`    | `['bg', 'point', 'road', 'building']` |      |
| `mapStyle`          | [地图的显示样式](https://geohub.amap.com/mapstyle/index)              |             `amap://styles/${string}`              |       `'amap://styles/normal'`        |      |
| `rotation`          | 地图顺时针旋转角度，取值范围 `0 ~ 360`                                |                      `number`                      |                  `0`                  |      |
| `showLabel`         | 是否展示地图文字和 POI 信息                                           |                     `boolean`                      |                `true`                 |      |
| `showBuildingBlock` | 是否展示地图 3D 楼块                                                  |                     `boolean`                      |                `true`                 |      |
| `showIndoorMap`     | 是否展示室内地图                                                      |                     `boolean`                      |                `false`                |      |
| `viewMode`          | 地图视图模式, 可显示 `3D` 地图效果                                    |                   `'2D' \| '3D'`                   |                `'2D'`                 |      |
| `pitch`             | 俯仰角度，最大值根据地图当前 `zoom` 级别不断增加。`2D` 模式下无效     |                      `number`                      |                  `0`                  |      |
| `wallColor`         | 地图楼块的侧面颜色                                                    |                `string \| number[]`                |                   -                   |      |
| `roofColor`         | 地图楼块的顶面颜色                                                    |                `string \| number[]`                |                   -                   |      |
| `skyColor`          | 天空颜色，3D 模式下带有俯仰角时会显示                                 |                `string \| number[]`                |                   -                   |      |
| `defaultCursor`     | 地图默认鼠标样式                                                      |                      `string`                      |              `"default"`              |      |
| `mask`              | 为 Map 实例指定掩模的路径，各图层将只显示路径范围内图像，3D视图下有效 |                     `number[]`                     |                   -                   |      |
| states              |                                                                       |                                                    |                                       |      |
| `doubleClickZoom`   | 地图是否可通过双击鼠标放大地图                                        |                     `boolean`                      |                `true`                 |      |
| `isHotspot`         | 是否开启地图热点和标注的 `hover` 效果                                 |                     `boolean`                      |     桌面端 `true`，移动端 `false`     |      |
| `resizeEnable`      | 是否监控地图容器尺寸变化                                              |                     `boolean`                      |                `false`                |      |
| `scrollWheel`       | 地图是否可通过鼠标滚轮缩放浏览                                        |                     `boolean`                      |                `true`                 |      |
| `touchZoom`         | 是否开启触摸缩放                                                      |                     `boolean`                      |                   -                   |      |
| `touchZoomCenter`   | 当值为 `1` 时，移动端以地图中心为中心双指缩放，否则以双指中间点为中心 |                      `number`                      |                   -                   |      |
| `dragEnable`        | 地图是否可通过鼠标拖拽平移                                            |                     `boolean`                      |                `true`                 |      |
| `zoomEnable`        | 地图是否可缩放                                                        |                     `boolean`                      |                `true`                 |      |
| `jogEnable`         | 地图是否使用缓动效果                                                  |                     `boolean`                      |                `true`                 |      |
| `pitchEnable`       | 是否允许设置俯仰角度                                                  |                     `boolean`                      |                `true`                 |      |
| `rotateEnable`      | 地图是否可旋转                                                        |                     `boolean`                      |                `true`                 |      |
| `animateEnable`     | 地图平移过程中是否使用动画                                            |                     `boolean`                      |                `true`                 |      |
| `keyboardEnable`    | 地图是否可通过键盘控制                                                |                     `boolean`                      |                `true`                 |      |
| events              |                                                                       |                                                    |
| `onResize`          | 容器尺寸改变                                                          |       `(event: { type: 'resize' }) => void`        |                   -                   |      |
| `onComplete`        | 地图加载完成                                                          |      `(event: { type: 'complete' }) => void`       |                   -                   |      |
| `onZoomStart`       | 缩放开始                                                              |   `(event: MapsEvent<'zoomstart', Map>) => void`   |                   -                   |      |
| `onZoomEnd`         | 缩放结束                                                              |    `(event: MapsEvent<'zoomend', Map>) => void`    |                   -                   |      |
| `onZoomChange`      | 缩放比例变化                                                          |  `(event: MapsEvent<'zoomchange', Map>) => void`   |                   -                   |      |
| `onMouseWheel`      | 鼠标滚轮缩放地图比例                                                  |  `(event: MapsEvent<'mousewheel', Map>) => void`   |                   -                   |      |
| `onMapMove`         | 地图平移                                                              |    `(event: MapsEvent<'mapmove', Map>) => void`    |                   -                   |      |
| `onMoveStart`       | 地图开始平移                                                          |   `(event: MapsEvent<'movestart', Map>) => void`   |                   -                   |      |
| `onMoveEnd`         | 地图结束平移                                                          |    `(event: MapsEvent<'moveend', Map>) => void`    |                   -                   |      |
| `onHotspotClick`    | 鼠标点击热点                                                          | `(event: MapsEvent<'hotspotclick', Map>) => void`  |                   -                   |      |
| `onHotspotOver`     | 鼠标经过热点                                                          |  `(event: MapsEvent<'hotspotover', Map>) => void`  |                   -                   |      |
| `onHotspotOut`      | 鼠标移出热点                                                          |  `(event: MapsEvent<'hotspotout', Map>) => void`   |                   -                   |      |
| `onRotateStart`     | 地图旋转开始                                                          |  `(event: MapsEvent<'rotatestart', Map>) => void`  |                   -                   |      |
| `onRotateEnd`       | 地图旋转结束                                                          |   `(event: MapsEvent<'rotateend', Map>) => void`   |                   -                   |      |
| `onRotateChange`    | 地图旋转角度变化                                                      | `(event: MapsEvent<'rotatechange', Map>) => void`  |                   -                   |      |
| `onClick`           | 鼠标左键单击                                                          |     `(event: MapsEvent<'click', Map>) => void`     |                   -                   |      |
| `onDblClick`        | 鼠标左键双击                                                          |   `(event: MapsEvent<'dblclick', Map>) => void`    |                   -                   |      |
| `onRightClick`      | 鼠标右键单击                                                          |  `(event: MapsEvent<'rightclick', Map>) => void`   |                   -                   |      |
| `onMouseDown`       | 鼠标按下                                                              |   `(event: MapsEvent<'mousedown', Map>) => void`   |                   -                   |      |
| `onMouseUp`         | 鼠标抬起                                                              |    `(event: MapsEvent<'mouseup', Map>) => void`    |                   -                   |      |
| `onMouseOver`       | 鼠标经过                                                              |   `(event: MapsEvent<'mouseover', Map>) => void`   |                   -                   |      |
| `onMouseOut`        | 鼠标移出                                                              |   `(event: MapsEvent<'mouseout', Map>) => void`    |                   -                   |      |
| `onMouseMove`       | 鼠标移动                                                              |   `(event: MapsEvent<'mousemove', Map>) => void`   |                   -                   |      |
| `onTouchStart`      | 触摸开始，仅移动设备                                                  |  `(event: MapsEvent<'touchstart', Map>) => void`   |                   -                   |      |
| `onTouchMove`       | 触摸移动中，仅移动设备                                                |   `(event: MapsEvent<'touchmove', Map>) => void`   |                   -                   |      |
| `onTouchEnd`        | 触摸结束，仅移动设备                                                  |   `(event: MapsEvent<'touchend', Map>) => void`    |                   -                   |      |
| `onDragStart`       | 开始拖拽                                                              |   `(event: MapsEvent<'dragstart', Map>) => void`   |                   -                   |      |
| `onDragEnd`         | 拖拽停止                                                              |    `(event: MapsEvent<'dragend', Map>) => void`    |                   -                   |      |
| `onDragging`        | 拖拽中                                                                |   `(event: MapsEvent<'dragging', Map>) => void`    |                   -                   |      |

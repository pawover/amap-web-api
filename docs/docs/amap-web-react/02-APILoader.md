# APILoader 加载器

APILoader 高德地图加载器

用于加载高德地图的 `JSAPI` `AMapUI` `LOCA` 等，加载完成后，将在 `windows` 下挂载全局对象

::: tip 提示

- 默认使用 AMap Web API 2.x 版本
- TypeScript 类型定义支持 AMap Web API 2.x 版本，如使用低版本时遇到 API 定义冲突、丢失、不存在等，请手动补全类型定义
  :::

## 基本用法

```jsx
import { APILoader, Map } from 'amap-web-react';

createRoot(document.getElementById('root')).render(
  <APILoader
    aKey="您的密钥"
    onSuccess={(amap) => {
      console.log('🆑 => onSuccess =>', amap);
    }}
    onError={(error) => {
      console.log('🆑 => onError =>', error);
    }}
    onFinally={() => {
      console.log('🆑 => onFinally => finally');
    }}
  >
    <Map style={{ height: 300 }} />
  </APILoader>,
);
```

## 子组件渲染

```jsx
import { APILoader, Map, Marker } from 'amap-web-react';

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

createRoot(document.getElementById('root')).render(
  <APILoader aKey="您的密钥">
    <App />
  </APILoader>,
);
```

```jsx
import { APILoader, Map, Marker } from 'amap-web-react';

createRoot(document.getElementById('root')).render(
  <APILoader aKey="您的密钥">
    <button>button</button>
    <Map style={{ height: 300 }}>
      {({ AMap, map, container }) => {
        return (
          <Fragment key={1}>
            <Marker
              title="北京市"
              position={[116.405285, 39.904989]}
            />
          </Fragment>
        );
      }}
    </Map>
  </APILoader>,
);
```

::: warning 为什么不能直接在 `APILoader` 中使用地图子组件

- `APILoader` 组件会自动判断是否已加载 JSAPI，如果已存在全局对象 `AMap` 则不会再次加载。当 `AMap` 加载完成后 `APILoader` 组件才会加载子组件。此时 `AMap` 尚未加载完毕，如果直接使用子组件就会出现 `AMap is not defined` 的错误。
  :::

## 多个地图

```jsx
import { APILoader, Map } from 'amap-web-react';

createRoot(document.getElementById('root')).render(
  <APILoader aKey="您的密钥">
    <Map style={{ height: 300, marginBottom: 10 }} />
    <Map style={{ height: 300 }} />
  </APILoader>,
);
```

## API

| 属性          | 说明                                                                                                       |                   类型                   | 默认值  | 版本 |
| :------------ | :--------------------------------------------------------------------------------------------------------- | :--------------------------------------: | :-----: | :--: |
| `aKey`        | 应用密钥，您需先[申请密钥](https://lbs.amap.com/api/webservice/guide/create-project/get-key)才可使用该服务 |                 `string`                 |    -    |
| `sKey`        | 安全密钥，自 2021年12月02日 升级之后所申请的 KEY 必须配备安全密钥 `sKey` 一起使用                          |                 `string`                 |    -    |
| `serviceHost` | 代理服务器的域名或地址                                                                                     | `http${string}://${string}/_AMapService` |    -    |
| `version`     | AMap Web API 版本号                                                                                        |          `${string}.${string}`           | `"2.0"` |      |
| `plugins`     | 预加载一个或者多个 AMap Web API 插件                                                                       |                `string[]`                |    -    |      |
| `AMapUI`      | 是否加载 AMapUI 组件库 API                                                                                 |     [`AMapUILoader`](#amapuiloader)      |    -    |      |
| `Loca`        | 是否加载 Loca 数据可视化 API                                                                               |               `LocaLoader`               |    -    |      |
| `onSuccess`   | Loader resolve 时的回调                                                                                    |      `(amap: typeof AMap) => void`       |    -    |      |
| `onError`     | Loader reject 时的回调                                                                                     |         `(error: Error) => void`         |    -    |      |
| `onFinally`   | Loader 执行完成时的回调                                                                                    |               `() => void`               |    -    |      |

## 类型定义

### AMapUILoader

```ts
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
```

### LocaLoader

```ts
interface LocaLoader {
  /**
   * Loca API 版本号
   * - 设置为 `"auto"` 根据 AMap Web API 版本加载，也可以指定 Loca API 版本号。
   * - Loca API 2.x 版本和 Loca API 1.3.x 版本不兼容，它们是针对不同的 AMap Web API 版本进行的封装。
   * - 如果您需要使用 AMap Web API 1.4.x，那么只能使用 Loca API 1.3.x；如果您需要使用 AMap Web API 2.x，那么只能使用 Loca API 2.x。
   */
  version: 'auto' | `${string}.${string}`;
}
```

# 高德地图 AMap Web Api 组件库

> **Warning**
> This is a work-in-progress and not the finished product.
>
> Feel free to leave feature suggestions.

## amap-web-types

### 安装

```shell
pnpm add -D amap-web-types
```

### 使用

在对应的 `tsconfig.json` 文件中添加 `"types": ["amap-web-types"]`

## amap-web-react

### 安装

```shell
pnpm add -D amap-web-react
```

### 基本用法

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

### 子组件渲染

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

## License

[MIT](https://github.com/Handpear/amap-web-api/blob/main/LICENSE)

Copyright (c) 2023-present, Handpear

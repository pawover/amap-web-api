# 快速开始

## 安装

```shell
pnpm add amap-web-react
```

类型定义单独安装（可选，但推荐）：

```shell
pnpm add -D amap-web-types
```

在 `tsconfig.json` 中添加：

```json
{
  "compilerOptions": {
    "types": ["amap-web-types"]
  }
}
```

## 基本用法

```jsx
import { APILoader } from "amap-web-react";
import { Map } from "amap-web-react/amap";

createRoot(document.getElementById("root")).render(
  <APILoader
    aKey="您的密钥"
    onSuccess={(amap) => {
      console.log("🆑 => onSuccess =>", amap);
    }}
    onError={(error) => {
      console.log("🆑 => onError =>", error);
    }}
    onFinally={() => {
      console.log("🆑 => onFinally => finally");
    }}
  >
    <Map style={{ height: 300 }} />
  </APILoader>,
);
```

## 子组件渲染

```jsx
import { APILoader } from "amap-web-react";
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

## render-prop 形式

Map 的 children 支持函数形式，接收 `{ AMap, map, container }` 解构参数：

```jsx
import { APILoader } from "amap-web-react";
import { Map, Marker } from "amap-web-react/amap";

createRoot(document.getElementById("root")).render(
  <APILoader aKey="您的密钥">
    <Map style={{ height: 300 }}>
      {({ AMap, map, container }) => {
        return (
          <Marker
            title="北京市"
            position={[116.405285, 39.904989]}
          />
        );
      }}
    </Map>
  </APILoader>,
);
```

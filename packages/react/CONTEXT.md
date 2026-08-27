# amap-web-react 上下文

本包的领域词汇表，由 `/domain-modeling` 在术语真正落定时惰性维护。工程技能命名领域概念时应使用本表词汇（见根 `CONTEXT-MAP.md` 与 `docs/agents/domain.md`）。

基于 React 封装的高德地图组件库。

## 词汇

### APILoader

异步加载 AMap JS SDK 的根组件。`aKey` 必填，提供 `onSuccess(amap)` / `onError(error)` / `onFinally()` 回调。可选加载 AMapUI 与 Loca。子组件仅在 `isLoaded` 后渲染。

### 子组件渲染约定（Render-Prop Children）

Map 的 `children` 支持 `ReactNode | (() => ReactNode)` 双形态。render-prop 形式接收 `{ AMap, map, container }` 解构参数，便于在无 JSX 闭包内拿到地图实例。

### MapContext

`declare global` 声明的全局接口，承载 `map?: AMap.Map`。两个框架包各定义一份（react / vue 已删，仅 react 保留）。

### LocaContext

`declare global` 声明，`extends MapContext`，承载 `loca?: Loca.Container`。

### 子路径入口（Subpath Entry）

react 包的 5 个导出子路径：`.`（聚合）/ `./loader`（APILoader）/ `./amap`（地图组件）/ `./amapUI`（UI 组件）/ `./loca`（可视化组件）。各自独立打包，避免全量引入。

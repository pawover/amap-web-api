# amap-web-react 上下文

基于 React 封装的高德地图组件库。

## 词汇

### APILoader
基于 React 的高德地图加载根组件，由 Loader（加载器）与 RenderGate（渲染门控）组合而成。`aKey`（官方对应 `key`）必填，`sKey`（官方对应 `securityJsCode`）可选，提供 `onSuccess` / `onError` / `onFinally` 回调。可选加载 AMapUI 与 Loca。子组件仅在 Loader `isLoaded` 后渲染。
_Avoid_: AMapLoader（官方包名）

### Loader（模块级单例）
负责把高德 JS API 资源（AMap / AMapUI / Loca）注入页面的模块级单例。维护 `notload/loading/loaded/failed` 状态机与已加载配置记忆；重复加载不重复请求、回调堆积；key 或 version 不一致、AMap 与 Loca 版本不对应时失败。AMap 就绪以高德 `callback=___onAPILoaded` 判定，而非 `<script>.onload`。
_Avoid_: useAPILoader（仅是实现入口之一）

`Loader` 已从 `amap-web-react/loader` 作为独立公共 API 导出（`AMapLoader` 接口 + `Loader` 单例对象），脱离 React 也可直接 `Loader.load(options)` / `Loader.reset()`；`useAPILoader` 与 `APILoader` 均基于它实现。

### Loader 通道（AMapLoader 通道）
官方 JS API Loader（`@amap/amap-jsapi-loader`，Promise 式 `load()`）加载方式。本仓库未直接依赖官方包，而是借鉴其单例、状态机与版本校验，自行实现同语义的 Loader。

### Script 标签通道
官方另一加载方式：直接 `<script src="webapi.amap.com/maps?v=..&key=..">`，分同步加载与异步加载（`callback=onLoad`）。本仓库不实现该通道，仅作领域背景知识。
_Avoid_: 直接引入、裸 script

### RenderGate（渲染门控）
APILoader 的职责之一：仅在 Loader `isLoaded` 后渲染 `children`，确保子组件能安全拿到 `AMap` 实例。

### 安全密钥（Security Config）
高德 2021-12-02 后强制要求。`window._AMapSecurityConfig = { securityJsCode, serviceHost? }` 须在脚本加载前设置。项目 `sKey` 对应官方 `securityJsCode`、`aKey` 对应官方 `key`；`serviceHost` 为私有化代理地址。
_Avoid_: key（项目用 aKey）、securityJsCode（项目用 sKey）

### 版本规则（Versioning）
AMap 默认 `2.0`（官方历史默认 `1.4.15`）；AMapUI / Loca 支持 `auto` 映射（AMap 1.x→AMapUI `1.1`、Loca `1.3.2`；2.x→AMapUI `1.1`、Loca `2.0`）。AMap 与 Loca 大版本须对应（2.x↔2.x），否则加载失败。

### 全局清理（reset / 引用计数）
Loader 为页面级全局单例，卸载采用引用计数：最后一个使用者卸载才清理 `window.AMap/AMapUI/Loca`；亦暴露显式 `reset()` 重置全部状态，避免多实例 `delete` 竞态。

### 子组件渲染约定（Render-Prop Children）
Map 的 `children` 支持 `ReactNode | (() => ReactNode)` 双形态。render-prop 形式接收 `{ AMap, map, container }` 解构参数，便于在无 JSX 闭包内拿到地图实例。

### MapContext
`declare global` 声明的全局接口，承载 `map?: AMap.Map`。两个框架包各定义一份（react / vue 已删，仅 react 保留）。

### LocaContext
`declare global` 声明，`extends MapContext`，承载 `loca?: Loca.Container`。

### 子路径入口（Subpath Entry）
react 包的 5 个导出子路径：`.`（聚合）/ `./loader`（APILoader）/ `./amap`（地图组件）/ `./amapUI`（UI 组件）/ `./loca`（可视化组件）。各自独立打包，避免全量引入。

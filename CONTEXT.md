# amap-web-api 领域词汇表

本文件是领域模型的最小词汇表，由 `/domain-modeling` 与架构深化过程惰性维护。工程技能在命名领域概念时应使用本表词汇（见 `docs/agents/domain.md`）。

## 词汇

### AMap 全局（AMap Global）

高德地图 JS SDK 加载后挂到 `window.AMap` 的命名空间。SDK 通过 `APILoader` 异步加载，加载完成后 `window.AMap` 可用。类型由 `amap-web-types` 包以 `declare namespace AMap {}` 声明。

### AMapUI 全局（AMapUI Global）

高德 UI 组件库命名空间，`window.AMapUI`。独立于 AMap，需通过 `APILoader` 的 `AMapUI` 选项单独加载。`declare namespace AMapUI {}`。

### Loca 全局（Loca Global）

Loca 数据可视化库命名空间，`window.Loca`。独立于 AMap，需通过 `APILoader` 的 `Loca` 选项单独加载。`declare namespace Loca {}`。

### APILoader

异步加载 AMap JS SDK 的根组件。`aKey` 必填，提供 `onSuccess(amap)` / `onError(error)` / `onFinally()` 回调。可选加载 AMapUI 与 Loca。子组件仅在 `isLoaded` 后渲染。

### 子组件渲染约定（Render-Prop Children）

Map 的 `children` 支持 `ReactNode | (() => ReactNode)` 双形态。render-prop 形式接收 `{ AMap, map, container }` 解构参数，便于在无 JSX 闭包内拿到地图实例。

## 构建与包结构

### 发布包（Published Package）

可独立发布到 npm 的 2 个子包（react / types）。

### 内部包（Internal Package）

private、不发布、只服务仓库自身构建/脚本流程的包（当前仅 `amap-web-internal`）。
_Avoid_: 私有包（宽泛）、工具包（指包内模块层级时）

### 内部工具（Internal Tool）

内部包内的一个导出模块（如 `tsdownFixCtsStubs`、`tsdownVisualizerPlugins`）。

### 源码直出（Source-Direct）

内部包的 `exports` 直接指向 `./src/index.ts`，无需构建产物即可消费：Node ≥ 22.18 type stripping 直跑，TS 经 `preserveSymlinks` 以 node_modules 路径直查源码。

### 包边界守卫（Package Boundary Guard）

子包 tsconfig 的 `rootDir` / `composite` 对「包内代码 import 包外 `.ts` 源码」的拦截（TS6059 / TS6307）。内部包经 preserveSymlinks 豁免，但守卫对其他包外 import 保持有效。

### 消费端（Published Artifact）

发布包打出的产物。约定：内部包代码不允许出现在消费端——内部工具仅构建期使用（如 `tsdown.config.ts`），禁止从发布包 `src` 导入 internal（否则会被打包进 dist，违反约定）。

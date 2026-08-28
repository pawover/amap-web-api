# 自实现模块级单例 Loader 而非依赖官方 @amap/amap-jsapi-loader

本仓库需加载高德 JS API，官方提供 `@amap/amap-jsapi-loader`（Promise 式 `load()`）。我们决定不将其作为依赖，而是在 react 包内自实现「模块级单例 Loader」，并借鉴官方的状态机、版本校验与 `callback=___onAPILoaded` 就绪判定。

**Considered Options**
- 直接依赖官方 `@amap/amap-jsapi-loader`：开箱即用、含单例与版本校验；但该包最新 `1.0.1` 已多年未更新，且难以贴合 React 渲染门控与 `serviceHost` 等私有化诉求。
- 自实现模块级单例 Loader（采纳）：可控、可演进，复用官方验证过的单例与校验语义，同时承载 React 集成与本仓库术语（`aKey` / `sKey`）。

**Consequences**
- 加载核心为页面级全局单例，多个 `APILoader` 组件共享同一份加载状态，须以引用计数或显式 `reset()` 管理清理，避免多实例 `delete window.AMap` 竞态。
- 后续若官方包重新活跃，迁移成本集中在 Loader 模块，组件层（RenderGate）不受影响。

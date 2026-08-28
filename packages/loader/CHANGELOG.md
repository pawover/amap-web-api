# amap-web-loader

## 0.0.1-alpha.0

### Patch Changes

- 4b429af: 新增独立 `amap-web-loader` 发布包（AMap / AMapUI / Loca 模块级单例加载器），并将 `amap-web-react` 的 `APILoader` / `useAPILoader` 重构为基于 `Loader` 的 RenderGate / React 桥接层；新增引用计数清理与 `reset()`、AMap 与 Loca 大版本对应校验，以及 `___onAPILoaded` 全局类型声明。

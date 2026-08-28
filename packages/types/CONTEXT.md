# amap-web-types 上下文

本包的领域词汇表，由 `/domain-modeling` 在术语真正落定时惰性维护。工程技能命名领域概念时应使用本表词汇（见根 `CONTEXT-MAP.md` 与 `docs/agents/domain.md`）。

纯类型声明包：无运行时代码，仅产出 `.d.ts` 声明。用户通过 `tsconfig.types` 或 `/// <reference types="amap-web-types" />` 引入。

## 词汇

### AMap 全局（AMap Global）

高德地图 JS SDK 加载后挂到 `window.AMap` 的命名空间。本包用 `declare namespace AMap {}` 声明其全部 API 类型（Map / Marker / Polygon 等 40+ 类）。

### AMapUI 全局（AMapUI Global）

AMap UI 组件库命名空间，`window.AMapUI`。独立于 AMap，需单独加载。`declare namespace AMapUI {}`。

### Loca 全局（Loca Global）

Loca 数据可视化库命名空间，`window.Loca`。独立于 AMap，需单独加载。`declare namespace Loca {}`。

### GeoJSON 命名空间

[RFC 7946](https://tools.ietf.org/html/rfc7946) 的类型定义。`declare namespace GeoJSON {}`，本包只声明，AMap 的 GeoJSON 消费方引用本命名空间。

### 环境类型声明（Ambient Declaration）

不产出运行时代码、仅向 TS 类型系统注入全局类型声明的包形态。本包的 `index.ts` 仅以 `/// <reference path />` 聚合各子声明文件，无 `export`。

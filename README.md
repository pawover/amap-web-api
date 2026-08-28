<div align="center">
  <h1>amap-web-api</h1>

  [![npm version](https://img.shields.io/npm/v/amap-web-react.svg)](https://www.npmjs.com/package/amap-web-react)
  [![Node version](https://img.shields.io/badge/node-%3E%3D22.20.0-brightgreen.svg)](https://nodejs.org)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
</div>

> 高德地图 AMap Web API 组件库：基于 React 封装的高德地图组件 + TypeScript 类型声明，开箱即用、类型完备。

amap-web-api 是一个 pnpm 单体仓库（monorepo），由 2 个独立可发布的子包组成。

## 子包

| 包 | 说明 | 最新版本 |
| :-- | :-- | :-- |
| `amap-web-react` | 基于 React 封装的高德地图组件（APILoader + 40+ 地图组件） | [![npm version](https://img.shields.io/npm/v/amap-web-react.svg)](https://www.npmjs.com/package/amap-web-react) |
| `amap-web-types` | AMap / AMapUI / Loca 的 TypeScript 类型声明 | [![npm version](https://img.shields.io/npm/v/amap-web-types.svg)](https://www.npmjs.com/package/amap-web-types) |

## 安装

```bash
pnpm add amap-web-react
pnpm add -D amap-web-types
```

<blockquote style="background: rgba(191, 135, 16, 0.05); border-left: 4px solid #bf870f; border-radius: 6px; padding: 12px 16px;">
  <b>⚠️ 警告</b>：<code>react</code> / <code>react-dom</code> 为 peer 依赖：使用前需自行安装（>=19.0.0）。
</blockquote>

## 快速开始

```jsx
import { APILoader } from "amap-web-react";
import { Map, Marker } from "amap-web-react/amap";

createRoot(document.getElementById("root")).render(
  <APILoader aKey="您的密钥">
    <Map style={{ height: 300 }}>
      <Marker
        title="北京市"
        position={[116.405285, 39.904989]}
      />
    </Map>
  </APILoader>,
);
```

类型声明在 `tsconfig.json` 中引入：

```json
{
  "compilerOptions": {
    "types": ["amap-web-types"]
  }
}
```

## 环境要求

- Node.js >= 22.20.0
- pnpm >= 11

## 开发

```bash
git clone https://github.com/pawover/amap-web-api.git
cd amap-web-api
pnpm install
```

常用命令：

| 命令 | 说明 |
| :--- | :--- |
| `pnpm test` | vitest 全量运行（双项目 node + jsdom） |
| `pnpm test:types` | 测试文件的类型检查 |
| `pnpm test:ci` | 完整 CI 流程：类型检查 → 测试 → 构建 → 冒烟 → pack 检查 |
| `pnpm build` | turbo 构建全部子包（tsdown 生成 ESM/CJS 双格式与类型声明） |
| `pnpm check` | 并行运行 types / eslint / format 检查 |
| `pnpm docs:dev` | 本地预览文档站（VitePress，源码见 `site/`） |
| `pnpm docs:gen` | 从源码 JSDoc 重新生成 API 参考页（改源码注释后需重新生成） |

## 发布

由 Changesets v3 + GitHub Actions 驱动的**双通道发布模型**（完整细节见 [.changeset/README.md](./.changeset/README.md)）：

- **feature = alpha 预发布通道**：push feature 全自动——CI 守卫（`verifyReleasePlan.ts`）→ select-mode → version PR → version job 等 CI 绿后合并 → dispatch 触发 publish，发布 `alpha` dist-tag
- **main = 正式版通道**：只通过**发布合并**收代码——`pnpm release:merge` → **人工合并 PR**（正式版发布的人工确认节点）→ 发布 `latest` → CI 自动把稳定版版本号回推 feature（基线同步）
- **核心设计**：alpha → 正式版之间必须经过人工确认节点，任何自动化都不会越过它

## License

[MIT](https://github.com/pawover/amap-web-api/blob/main/LICENSE)

Copyright (c) 2023-present, pawover

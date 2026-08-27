# amap-web-api

pnpm 单体仓库（pnpm 11 / Node >= 22）。Turborepo 构建。2 个发布包 + 1 个内部包在 `packages/*` 下。

## 命令

| 命令                                     | 说明                                                                                      |
| :--------------------------------------- | :---------------------------------------------------------------------------------------- |
| `pnpm test`                              | `vitest run` — 双项目（node 覆盖 types / jsdom 覆盖 react）                               |
| `pnpm test:types`                        | `tsc -p test/tsconfig.json --noEmit` — 仅类型检查测试文件                                 |
| `pnpm test:smoke`                        | 构建后验证所有 dist 产物可正常导入                                                        |
| `pnpm test:ci`                           | `test:types && test && build && test:smoke && check:pack` (串行失败则停止)                |
| `pnpm build`                             | `turbo build` — tsdown (build:source) 生成 ESM/CJS 双格式 + 类型声明                      |
| `pnpm check`                             | 并行运行 `check:types & check:eslint & check:format`（用 `&` 不是 `&&`）                  |
| `pnpm check:types`                       | `tsc --noEmit`（根 tsconfig 聚合检查：packages src + scripts + 根配置文件）               |
| `pnpm check:eslint`                      | eslint 带 `--fix` 和缓存                                                                  |
| `pnpm check:format`                      | prettier（仅 HTML/JSON）带缓存                                                            |
| `pnpm changeset`                         | 交互式生成 changeset 变更说明（`.changeset/*.md`，随 PR 提交）                            |
| `pnpm ci:version`                        | 消费 changeset：`changeset version && bumpRoot && verifyRelease && pnpm install`（CI 用）  |
| `pnpm pre:enter-alpha` / `pnpm pre:exit` | 进出 alpha pre 模式（`pnpm changeset pre enter/exit alpha`）                              |
| `pnpm sync:main`                          | 非发布内容同步到 main：建 sync-main PR（版本保持 main 侧，不触发发布通道）                  |
| `pnpm docs:dev`                          | 本地预览文档站（VitePress，源码见 `site/`）                                              |
| `pnpm docs:gen`                          | 从源码 JSDoc 重新生成 API 参考页（改源码注释后需重新生成）                                  |

## 发布

由 Changesets v3 + GitHub Actions 驱动的**双通道分支模型**：feature = alpha 预发布通道，main = 正式版通道（人工闸门）。改发布流程后需在 CI 中跑 `pnpm test:ci` 验证。全解见 `.changeset/README.md`。

## 架构

- **`amap-web-react`** (`packages/react/`) — 基于 React 封装的高德地图组件。入口：`src/index.ts`，子路径：`.`（聚合）、`./loader`（APILoader）、`./amap`（地图组件 40+）、`./amapUI`（UI 组件）、`./loca`（可视化组件）。
- **`amap-web-types`** (`packages/types/`) — 纯类型声明包（`declare namespace AMap/AMapUI/Loca/GeoJSON`）。入口：`src/index.ts`，子路径：`.`、`./amap`、`./amapUI`、`./loca`。
- **`amap-web-internal`** (`packages/internal/`) — 内部工具包（`private`，不发布）：`tsdownFixCtsStubs`（tsdown CJS `.d.cts` 存根修复）、`tsdownVisualizerPlugins`（`VISUALIZER=1` 时启用 rollup-plugin-visualizer 构建分析）。**纯源码包**：`exports` 直接指向 `./src/index.ts`（Node 24 type stripping 直跑，无需构建产物）。各包 `tsdown.config.ts` 经包名导入；子包 tsconfig 开 `preserveSymlinks: true` 使 IDE/tsc 以 node_modules 路径直查其源码。**约定：内部包代码不允许出现在消费端**——仅构建期使用，禁止从发布包 `src` 导入 internal。

## 构建流水线

```text
tsdown (build:source) → turbo build
```

- **tsdown** 负责打包与类型声明生成（配置在每个包目录下，如 `packages/react/tsdown.config.ts`）
- **tsc** 仅用于类型检查。tsdown 的 `dts: { cjsReexport: true }` 负责生成声明文件，`tsdownFixCtsStubs` 修复 CJS `.d.cts` 存根。

## TypeScript 严格程度

通过 `tsconfig.base.json` 极度严格：启用了 `verbatimModuleSyntax`、`erasableSyntaxOnly`、`exactOptionalPropertyTypes`、`noUncheckedIndexedAccess`、`noUnusedLocals/Parameters`、`noPropertyAccessFromIndexSignature`。TypeScript v6。

## 工具链特性

- **Prettier**：printWidth 120；`.type.ts` 和 `.test.ts` 文件为 240
- **ESLint**：复用 `@pawover/kit-eslint-rules`（devDependency）。测试文件中所有规则禁用（eslint.config.js）。`antfu/no-import-dist: 0`。
- **Git**：Husky pre-commit 运行 lint-staged。Commitizen 提交（中英双语提示）。
- **Peer 依赖**：react 包的 `react` / `react-dom`（>=19.0.0）；types 包的 `typescript`（^5.9.3 || ^6.0.0）。

## 导入风格

```ts
import { APILoader } from "amap-web-react"; // 聚合
import { Map, Marker } from "amap-web-react/amap"; // 地图组件
import type { AMap } from "amap-web-types"; // 类型声明
```

## 注释规范

- 所有公开 API（组件 / Props 类型 / Hook）必须有中文 JSDoc，结构为：功能描述 → 空行 → `@param` / `@returns` / `@throws` → 空行 → `@example`（含 ` ```tsx ` 代码块）。

## Agent skills

### 议题追踪

本仓库的议题（issues）与规格（specs）统一使用 GitHub Issues 管理（通过 `gh` CLI 操作）。详见 `docs/agents/issue-tracker.md`。

### 领域文档

采用多上下文布局：根目录 `CONTEXT-MAP.md` 指向各子包的 `CONTEXT.md`。详见 `docs/agents/domain.md`。

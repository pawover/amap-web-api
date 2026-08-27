# ADR-0001：参考 pawover-kit 全量重构工程基线

- **状态**：已接受
- **日期**：2026-08-26
- **决策者**：pawover

## 背景

amap-web-api 原工程为半成品：libs/ + packages/ 双目录、unbuild 构建、手工发布、零测试、配置文件从 pawover-kit 抄来但未对齐（cz scopes 是 kit 的、tsconfig 6 份模板与 pawover-kit 两层模式不一致）。pawover-kit 已在工程纪律（changesets 双通道发布、tsdown 构建、vitest 双项目、源码直查、严格 tsconfig）上验证成熟。

## 决策

参考 pawover-kit 完全重构 amap-web-api 的工程基线：

1. **目录统一**：`libs/` + `packages/` 双目录 → 单一 `packages/*`（react / types / internal；tsconfig 合并到根）。
2. **构建工具**：unbuild → tsdown（复用 `@pawover/kit-internal` 的 CTS stub 修复 + visualizer 插件，amap 自有 `amap-web-internal` 包同源模式）。
3. **发布流程**：手工发布 → Changesets v3 双通道（feature=alpha / main=latest + OIDC + 10 脚本 + 分支保护）。
4. **测试骨架**：从零搭建 vitest 双项目（node 覆盖 types + jsdom 覆盖 react）+ `test:types` 类型测试 + `test:smoke` 冒烟 + `test:ci` 串行闸门。覆盖率阈值暂关。
5. **文档站**：`docs/docs/.vitepress/` 三层嵌套 → `site/` + VitePress 1.6 + typedoc 自动生成 API。
6. **tsconfig 严格度**：ES2020 + 半严格 → ES2022 + 全严格（`verbatimModuleSyntax` / `erasableSyntaxOnly` / `exactOptionalPropertyTypes` / `noUncheckedIndexedAccess` 等）。
7. **工具类复用**：删除自产 `@pawover/shared` 工具类，react 包改从 `@pawover/kit-utils` 取（`TypeUtil.isArray` / `TypeUtil.isFunction`）。
8. **领域文档**：建立 `CONTEXT-MAP.md` + 根 `CONTEXT.md` + 各包 `CONTEXT.md` + `docs/adr/`。

## 不变量

- 已发布的包名不变（`amap-web-react` / `amap-web-types`），保护已有用户。
- 不引入根聚合包（amap 3 包语义差异大，根聚合收益小）。
- vue 包暂时移除（`0.0.0` 未发布、组件稀少，未来按需重建）。

## 后果

- 工程基线与 pawover-kit 对齐，跨仓库上下文心智一致。
- 双通道发布带来 alpha 预发布能力，但需建 feature / main 分支保护（CI 配置就绪，仓库设置需人工开）。
- 删除 vue 包与 shared 包是破坏性变更，但均未发布或无用户。

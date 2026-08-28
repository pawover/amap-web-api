# CONTEXT-MAP

本仓库为多上下文（pnpm monorepo）。每个包拥有独立的 `CONTEXT.md` 收录其领域词汇；根 `CONTEXT.md` 收录跨包共享的领域词汇。工程技能在进入代码库探索时应先读本文件，再按需读取相关上下文。

## 上下文

| 上下文     | 包                       | 说明                                       | CONTEXT.md                                              |
| ---------- | ------------------------ | ------------------------------------------ | ------------------------------------------------------- |
| 跨包 / 根  | —                        | 跨发布包共享的领域词汇（构建、包边界等）   | [./CONTEXT.md](./CONTEXT.md)                            |
| react      | `amap-web-react`         | React 封装的高德地图组件                   | [packages/react/CONTEXT.md](packages/react/CONTEXT.md) |
| types      | `amap-web-types`         | 纯类型声明包（AMap / AMapUI / Loca / GeoJSON） | [packages/types/CONTEXT.md](packages/types/CONTEXT.md) |
| internal   | `amap-web-internal` (private) | 内部工具包（仅构建期使用，不发布）         | [packages/internal/CONTEXT.md](packages/internal/CONTEXT.md) |

## ADR 位置

- 全局决策：`docs/adr/`
- 上下文级决策：各包 `packages/<pkg>/docs/adr/`（惰性创建）

消费规则见 `docs/agents/domain.md`。

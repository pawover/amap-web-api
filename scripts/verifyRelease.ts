/**
 * 发布顺序复核脚本：
 * 在 version 通道（changesets/action/version 的 version-script 执行后）运行，
 * 复核「子包版本变化 ⇒ 根包必变」规则，防止 ci:version 被改坏后根包漏发。
 *
 * 用法（在 ci:version 中，bumpRoot 之后运行）：
 *   node scripts/verifyRelease.ts
 *
 * 退出码：
 *   0 校验通过（或无子包版本变化）
 *   1 子包版本变化但根包版本未变
 */

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { SUB_PACKAGE_DIRS } from "./packages.ts";

function gitShowVersion (pkgPath: string) {
  const out = execSync(`git show HEAD:${pkgPath}`, { encoding: "utf8" });

  return JSON.parse(out).version;
}

function worktreeVersion (pkgPath: string) {
  return JSON.parse(readFileSync(pkgPath, "utf8")).version;
}

const rootOld = gitShowVersion("package.json");
const rootNew = worktreeVersion("package.json");
if (rootOld === undefined || rootNew === undefined) {
  console.log("✔ 根包无 version（不发布），跳过发布顺序校验");
  process.exit(0);
}
const changedSubs = SUB_PACKAGE_DIRS.filter((pkgPath) => {
  const file = `${pkgPath}/package.json`;

  return gitShowVersion(file) !== worktreeVersion(file);
});

if (changedSubs.length > 0 && rootOld === rootNew) {
  console.error("❌ 发布顺序校验失败：");
  console.error(`   子包版本已变化：${changedSubs.join(", ")}`);
  console.error(`   但根包 amap-web-api 版本未变化（仍为 ${rootNew}）。`);
  console.error("   根包直接依赖全部子包（workspace:*），子包发布时根包必须同步发布。");
  console.error("   请检查 scripts/bumpRoot.ts 与 ci:version 配置。");
  process.exit(1);
}

const detail = changedSubs.length === 0
  ? "本次无子包版本变化"
  : `子包版本变化：${changedSubs.join(", ")}，根包同步为 ${rootNew}`;
console.log(`✔ 发布顺序校验通过（${detail}）`);

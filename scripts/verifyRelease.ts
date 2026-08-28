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
import { SUB_PACKAGES } from "./packages.ts";

const DIRECT_DEPENDENCY_BUMP_RULES = [
  ["types", "loader"],
  ["types", "react"],
  ["loader", "react"],
] as const;

function gitShowVersion (pkgPath: string) {
  const out = execSync(`git show HEAD:${pkgPath}`, { encoding: "utf8" });

  return JSON.parse(out).version;
}

function worktreeVersion (pkgPath: string) {
  return JSON.parse(readFileSync(pkgPath, "utf8")).version;
}

function worktreePackage (pkgPath: string) {
  return JSON.parse(readFileSync(pkgPath, "utf8")) as {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };
}

const subPackageNameByDir = new Map(SUB_PACKAGES.map(([dir, name]) => [dir, name]));
const oldSubVersionByDir = new Map<string, string>();
const newSubVersionByDir = new Map<string, string>();

for (const [dir] of SUB_PACKAGES) {
  const file = `packages/${dir}/package.json`;
  oldSubVersionByDir.set(dir, gitShowVersion(file));
  newSubVersionByDir.set(dir, worktreeVersion(file));
}

const rootOld = gitShowVersion("package.json");
const rootNew = worktreeVersion("package.json");
const hasRootVersion = rootOld !== undefined && rootNew !== undefined;
const changedSubs = SUB_PACKAGES
  .map(([dir]) => dir)
  .filter((dir) => oldSubVersionByDir.get(dir) !== newSubVersionByDir.get(dir))
  .map((dir) => `packages/${dir}`);

const dependencyDeclarationErrors: string[] = [];
for (const [dependencyDir, dependentDir] of DIRECT_DEPENDENCY_BUMP_RULES) {
  const dependencyName = subPackageNameByDir.get(dependencyDir);
  if (!dependencyName) {
    continue;
  }
  const dependentPkg = worktreePackage(`packages/${dependentDir}/package.json`);
  const dependencyRange = dependentPkg.dependencies?.[dependencyName];
  if (!dependencyRange?.startsWith("workspace:")) {
    dependencyDeclarationErrors.push(
      `packages/${dependentDir} 必须在 dependencies 中声明 ${dependencyName}: workspace:*（当前：${dependencyRange ?? "未声明"}）`,
    );
  }
  if (dependentPkg.devDependencies?.[dependencyName] !== undefined) {
    dependencyDeclarationErrors.push(
      `packages/${dependentDir} 不应在 devDependencies 中声明 ${dependencyName}（应放到 dependencies）`,
    );
  }
}

if (dependencyDeclarationErrors.length > 0) {
  console.error("❌ 依赖声明校验失败：");
  for (const error of dependencyDeclarationErrors) {
    console.error(`   - ${error}`);
  }
  process.exit(1);
}

const dependentNotBumpedErrors = DIRECT_DEPENDENCY_BUMP_RULES
  .filter(([dependencyDir, dependentDir]) => {
    return oldSubVersionByDir.get(dependencyDir) !== newSubVersionByDir.get(dependencyDir)
      && oldSubVersionByDir.get(dependentDir) === newSubVersionByDir.get(dependentDir);
  })
  .map(([dependencyDir, dependentDir]) => {
    const dependencyOld = oldSubVersionByDir.get(dependencyDir);
    const dependencyNew = newSubVersionByDir.get(dependencyDir);

    return `packages/${dependencyDir} ${dependencyOld} -> ${dependencyNew}，但 packages/${dependentDir} 版本未同步递增`;
  });

if (dependentNotBumpedErrors.length > 0) {
  console.error("❌ 直接依赖联动校验失败：");
  for (const error of dependentNotBumpedErrors) {
    console.error(`   - ${error}`);
  }
  console.error("   请检查 changesets 配置与依赖声明，确保依赖包升级会自动带动直接依赖方发版。");
  process.exit(1);
}

if (!hasRootVersion) {
  console.log("✔ 根包无 version（不发布），跳过根包版本联动校验");
}

if (hasRootVersion && changedSubs.length > 0 && rootOld === rootNew) {
  console.error("❌ 发布顺序校验失败：");
  console.error(`   子包版本已变化：${changedSubs.join(", ")}`);
  console.error(`   但根包 amap-web-api 版本未变化（仍为 ${rootNew}）。`);
  console.error("   根包直接依赖全部子包（workspace:*），子包发布时根包必须同步发布。");
  console.error("   请检查 scripts/bumpRoot.ts 与 ci:version 配置。");
  process.exit(1);
}

const detail = changedSubs.length === 0
  ? "本次无子包版本变化"
  : hasRootVersion
    ? `子包版本变化：${changedSubs.join(", ")}，根包同步为 ${rootNew}`
    : `子包版本变化：${changedSubs.join(", ")}（根包无 version，未参与联动）`;
console.log(`✔ 发布顺序校验通过（${detail}）`);

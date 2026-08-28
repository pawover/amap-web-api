/**
 * 根包版本同步脚本：
 * 在 `changeset version` 之后运行，将根包 amap-web-api 的版本与子包同步递增。
 *
 * amap-web-api 根包是 private（不发布），但其 version 仍由 changesets 内部维护
 * （changesets 的 packages 列表不含根包，根包单独放在 rootPackage）。本脚本读取
 * 子包 version 后的新版本，按相同 bump 类型（patch / minor / major）与 pre 计数
 * 同步递增根包版本，并硬校验「子包版本变化 ⇒ 根包必变」，失败时退出码为 1。
 *
 * 用法（在 ci:version 中，changeset version 之后）：
 *   node scripts/bumpRoot.ts
 *
 * 退出码：
 *   0 根包版本已正确同步（或无子包版本变化）
 *   1 子包版本变化但根包未同步 / 根包变化类型不一致
 */

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { SUB_PACKAGE_DIRS, SUB_PACKAGE_NAMES } from "./packages.ts";

const ROOT_PACKAGE = "amap-web-api";

function getVersion (pkgPath: string) {
  return JSON.parse(readFileSync(pkgPath, "utf8")).version;
}

function readGitVersion (pkgPath: string) {
  const out = execSync(`git show HEAD:${pkgPath}`, { encoding: "utf8" });

  return JSON.parse(out).version;
}

function bumpType (oldVersion: string, newVersion: string) {
  const oldParts = oldVersion.split("-")[0] as string;
  const newParts = newVersion.split("-")[0] as string;
  if ((newParts[0] || 0) > (oldParts[0] || 0)) {
    return "major";
  }
  if ((newParts[1] || 0) > (oldParts[1] || 0)) {
    return "minor";
  }
  if ((newParts[2] || 0) > (oldParts[2] || 0)) {
    return "patch";
  }
  if (getPreCount(oldVersion) !== getPreCount(newVersion)) {
    return "patch";
  }

  return "none";
}

function getPreTag (version: string): string | null {
  const pre = version.split("-")[1];

  return pre ? (pre.split(".")[0] ?? null) : null;
}

function getPreCount (version: string) {
  const pre = version.split("-")[1];
  if (!pre) {
    return null;
  }
  const count = Number(pre.split(".")[1]);

  return Number.isNaN(count) ? null : count;
}

function bumpVersion (version: string, type: string, preTag: string | null, preCount: number | null) {
  const main = version.split("-")[0] || "0.0.0";
  const oldPre = version.split("-")[1] ?? null;
  if (oldPre !== null && preTag === null) {
    return main;
  }
  const parts = main.split(".").map(Number) as [number, number, number];
  if (type === "major") {
    parts[0] += 1;
    parts[1] = 0;
    parts[2] = 0;
  } else if (type === "minor") {
    parts[1] += 1;
    parts[2] = 0;
  } else if (oldPre === null || preTag === null) {
    parts[2] += 1;
  }
  let next = parts.join(".");
  if (preTag !== null && preCount !== null) {
    next += `-${preTag}.${preCount}`;
  }

  return next;
}

const rootPackage = JSON.parse(readFileSync("package.json", "utf8"));
if (!rootPackage.version) {
  console.log("✔ 根包 amap-web-api 无 version（不发布），跳过根包版本同步");
  process.exit(0);
}
const rootOld = readGitVersion("package.json");

let changedType = "none";
let preTag: string | null = null;
let preCount: number | null = null;

for (let i = 0; i < SUB_PACKAGE_NAMES.length; i++) {
  const pkgPath = `${SUB_PACKAGE_DIRS[i]}/package.json`;
  const oldVersion = readGitVersion(pkgPath);
  const newVersion = getVersion(pkgPath);
  if (oldVersion === newVersion) {
    continue;
  }
  const type = bumpType(oldVersion, newVersion);
  if (changedType === "none" || type === "major" || (type === "minor" && changedType === "patch")) {
    changedType = type;
  }
  const tag = getPreTag(newVersion);
  const count = getPreCount(newVersion);
  if (tag !== null) {
    preTag = tag;
  }
  if (count !== null) {
    preCount = count;
  }
}

if (changedType === "none") {
  console.log(`✔ 无子包版本变化，根包保持 ${rootPackage.version}`);
  process.exit(0);
}

const expected = bumpVersion(rootOld, changedType, preTag, preCount);

if (rootPackage.version !== expected) {
  rootPackage.version = expected;
  writeFileSync("package.json", `${JSON.stringify(rootPackage, null, 2)}\n`);
  console.log(`✔ 根包版本已同步：${rootOld} -> ${expected}（子包 ${changedType}${preTag ? ` / ${preTag}.${preCount}` : ""}）`);
} else if (rootPackage.version !== rootOld) {
  console.log(`✔ 根包版本已同步：${rootOld} -> ${rootPackage.version}`);
} else {
  console.error("❌ 根包版本同步失败：");
  console.error(`   子包已发布（${changedType}${preTag ? ` / ${preTag}.${preCount}` : ""}），`);
  console.error(`   但根包 ${ROOT_PACKAGE} 版本仍为 ${rootPackage.version}（期望 ${expected}）。`);
  console.error("   请检查 scripts/bumpRoot.ts 或发布流程配置。");
  process.exit(1);
}

/**
 * 直接依赖联动版本同步脚本：
 * 在 `changeset version` 之后运行，若依赖包版本已变化，则自动为直接依赖方补一个版本递增。
 *
 * 当前联动规则见 `scripts/packages.ts` 的 `DIRECT_DEPENDENCY_BUMP_RULES`：
 * - types 变化 -> loader / react 必须变化
 * - loader 变化 -> react 必须变化
 *
 * 用法（在 ci:version 中，changeset version 之后）：
 *   node scripts/bumpDependents.ts
 */

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { DIRECT_DEPENDENCY_BUMP_RULES, SUB_PACKAGES } from "./packages.ts";

type BumpType = "none" | "patch" | "minor" | "major";

interface PendingBump {
  type: BumpType;
  preTag: string | null;
  preCount: number | null;
  reasons: string[];
}

function readVersion (pkgPath: string) {
  return JSON.parse(readFileSync(pkgPath, "utf8")).version as string;
}

function readGitVersion (pkgPath: string) {
  const out = execSync(`git show HEAD:${pkgPath}`, { encoding: "utf8" });

  return JSON.parse(out).version as string;
}

function readMainVersionTuple (version: string): [number, number, number] {
  const [major = "0", minor = "0", patch = "0"] = (version.split("-")[0] || "0.0.0").split(".");

  return [Number(major), Number(minor), Number(patch)];
}

function getPreTag (version: string): string | null {
  const pre = version.split("-")[1];

  return pre ? (pre.split(".")[0] ?? null) : null;
}

function getPreCount (version: string): number | null {
  const pre = version.split("-")[1];
  if (!pre) {
    return null;
  }
  const count = Number(pre.split(".")[1]);

  return Number.isNaN(count) ? null : count;
}

function detectBumpType (oldVersion: string, newVersion: string): BumpType {
  const [oldMajor, oldMinor, oldPatch] = readMainVersionTuple(oldVersion);
  const [newMajor, newMinor, newPatch] = readMainVersionTuple(newVersion);

  if (newMajor > oldMajor) {
    return "major";
  }
  if (newMinor > oldMinor) {
    return "minor";
  }
  if (newPatch > oldPatch) {
    return "patch";
  }
  if (getPreTag(oldVersion) !== getPreTag(newVersion) || getPreCount(oldVersion) !== getPreCount(newVersion)) {
    return "patch";
  }

  return "none";
}

function pickHigherBumpType (current: BumpType, incoming: BumpType): BumpType {
  const rank = { none: 0, patch: 1, minor: 2, major: 3 } as const;

  return rank[incoming] > rank[current] ? incoming : current;
}

function bumpVersion (version: string, type: BumpType, preTag: string | null, preCount: number | null) {
  const main = version.split("-")[0] || "0.0.0";
  const oldPre = version.split("-")[1] ?? null;

  if (oldPre !== null && preTag === null) {
    return main;
  }

  const [major, minor, patch] = readMainVersionTuple(version);
  let nextMajor = major;
  let nextMinor = minor;
  let nextPatch = patch;

  if (type === "major") {
    nextMajor += 1;
    nextMinor = 0;
    nextPatch = 0;
  } else if (type === "minor") {
    nextMinor += 1;
    nextPatch = 0;
  } else if (type === "patch") {
    if (oldPre === null || preTag === null) {
      nextPatch += 1;
    }
  }

  let next = `${nextMajor}.${nextMinor}.${nextPatch}`;
  if (preTag !== null && preCount !== null) {
    next += `-${preTag}.${preCount}`;
  }

  return next;
}

const oldVersionByDir = new Map<string, string>();
const newVersionByDir = new Map<string, string>();

for (const [dir] of SUB_PACKAGES) {
  const file = `packages/${dir}/package.json`;
  oldVersionByDir.set(dir, readGitVersion(file));
  newVersionByDir.set(dir, readVersion(file));
}

const pendingByDependent = new Map<string, PendingBump>();

for (const [dependencyDir, dependentDir] of DIRECT_DEPENDENCY_BUMP_RULES) {
  const dependencyOld = oldVersionByDir.get(dependencyDir);
  const dependencyNew = newVersionByDir.get(dependencyDir);
  if (!dependencyOld || !dependencyNew || dependencyOld === dependencyNew) {
    continue;
  }

  const incomingType = detectBumpType(dependencyOld, dependencyNew);
  if (incomingType === "none") {
    continue;
  }

  const previous = pendingByDependent.get(dependentDir) ?? {
    type: "none",
    preTag: null,
    preCount: null,
    reasons: [],
  };
  previous.type = pickHigherBumpType(previous.type, incomingType);

  const incomingPreTag = getPreTag(dependencyNew);
  const incomingPreCount = getPreCount(dependencyNew);
  if (incomingPreTag !== null) {
    previous.preTag = incomingPreTag;
  }
  if (incomingPreCount !== null) {
    previous.preCount = incomingPreCount;
  }
  previous.reasons.push(`${dependencyDir} ${dependencyOld} -> ${dependencyNew}`);
  pendingByDependent.set(dependentDir, previous);
}

if (pendingByDependent.size === 0) {
  console.log("✔ 无依赖联动版本变化");
  process.exit(0);
}

let updatedCount = 0;
for (const [dependentDir, pending] of pendingByDependent) {
  const dependentOld = oldVersionByDir.get(dependentDir);
  const dependentNew = newVersionByDir.get(dependentDir);
  if (!dependentOld || !dependentNew) {
    continue;
  }

  if (dependentOld !== dependentNew) {
    console.log(`✔ packages/${dependentDir} 已有版本变化（${dependentOld} -> ${dependentNew}），跳过自动联动`);
    continue;
  }

  const nextVersion = bumpVersion(dependentNew, pending.type, pending.preTag, pending.preCount);
  if (nextVersion === dependentNew) {
    continue;
  }

  const pkgPath = `packages/${dependentDir}/package.json`;
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8")) as { version: string };
  pkg.version = nextVersion;
  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

  newVersionByDir.set(dependentDir, nextVersion);
  updatedCount += 1;
  console.log(`✔ packages/${dependentDir} 联动升级：${dependentNew} -> ${nextVersion}（触发：${pending.reasons.join("; ")}）`);
}

if (updatedCount === 0) {
  console.log("✔ 依赖联动检查完成（无需自动升级）");
} else {
  console.log(`✔ 依赖联动检查完成（自动升级 ${updatedCount} 个包）`);
}

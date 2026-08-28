/**
 * 发布流程共享的包清单（单一事实来源）。
 *
 * amap-web-api 的 3 个发布包：
 *  - SUB_PACKAGES：`[目录, 包名]` 数组（目录不带 packages/ 前缀）；
 *  - SUB_PACKAGE_DIRS：`packages/<目录>` 数组；
 *  - SUB_PACKAGE_NAMES：包名数组；
 *  - PACKAGE_FILES：含根 package.json 在内的相对路径数组（amap 根包 private 不发布，
 *    但根 package.json 的 version 仍由 bumpRoot 维护以保持 changesets 内部一致性）；
 *  - VERSION_FILES：版本通道产物的完整文件集合（package.json + CHANGELOG.md）。
 */

export const SUB_PACKAGES = [
  ["react", "amap-web-react"],
  ["types", "amap-web-types"],
  ["loader", "amap-web-loader"],
] as const;

export const SUB_PACKAGE_DIRS = SUB_PACKAGES.map(([dir]) => `packages/${dir}`);

export const SUB_PACKAGE_NAMES = SUB_PACKAGES.map(([, name]) => name);

export const PACKAGE_FILES = ["package.json", ...SUB_PACKAGES.map(([dir]) => `packages/${dir}/package.json`)];

export const VERSION_FILES = new Set([
  ...PACKAGE_FILES,
  ...SUB_PACKAGE_DIRS.map((dir) => `${dir}/CHANGELOG.md`),
]);

/**
 * 从源码 JSDoc 重新生成 API 参考页到 site/api/。
 * 使用 typedoc + typedoc-plugin-markdown。
 * 用法：pnpm docs:gen（改源码注释后需重新生成）
 */

import { execSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const apiDir = resolve(root, "site/api");

if (!existsSync(apiDir)) {
  mkdirSync(apiDir, { recursive: true });
}

const packages = [
  { name: "amap-web-react", entry: "packages/react/src/index.ts", outFile: "amap-web-react.md" },
  { name: "amap-web-types", entry: "packages/types/src/index.ts", outFile: "amap-web-types.md" },
];

for (const pkg of packages) {
  console.log(` generating ${pkg.name}...`);
  execSync(
    `pnpm exec typedoc --entryPoints ${pkg.entry} --out ${apiDir} --name ${pkg.name} --plugin typedoc-plugin-markdown --readme none --filename ${pkg.outFile}`,
    { stdio: "inherit", cwd: root },
  );
}

console.log("✔ API docs generated to site/api/");

/**
 * 冒烟测试：构建后验证所有 dist 产物可正常导入。
 * 用法：node test/scripts/smoke.ts（由 test:smoke 调用，需先 pnpm build）
 */

import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const targets = [
  { label: "amap-web-types/index", path: "packages/types/dist/index.js" },
  { label: "amap-web-types/amap", path: "packages/types/dist/index.js" },
  { label: "amap-web-types/amapUI", path: "packages/types/dist/index.js" },
  { label: "amap-web-types/loca", path: "packages/types/dist/index.js" },
  { label: "amap-web-loader/index", path: "packages/loader/dist/index.js" },
  { label: "amap-web-react/index", path: "packages/react/dist/index.js" },
  { label: "amap-web-react/loader", path: "packages/react/dist/loader.js" },
  { label: "amap-web-react/amap", path: "packages/react/dist/amap.js" },
  { label: "amap-web-react/amapUI", path: "packages/react/dist/amapUI.js" },
  { label: "amap-web-react/loca", path: "packages/react/dist/loca.js" },
];

let failures = 0;
for (const target of targets) {
  try {
    await import(pathToFileURL(resolve(target.path)).href);
    console.log(`✔ ${target.label}`);
  } catch (err) {
    failures += 1;
    console.error(`✗ ${target.label}: ${String((err as Error).message ?? err).slice(0, 200)}`);
  }
}

if (failures > 0) {
  console.error(`\n❌ ${failures} smoke test(s) failed`);
  process.exit(1);
}
console.log(`\n✔ all smoke tests passed (${targets.length} targets)`);

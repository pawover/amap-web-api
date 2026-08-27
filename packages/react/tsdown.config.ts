import { tsdownFixCtsStubs, tsdownVisualizerPlugins } from "amap-web-internal";
import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    loader: "src/loader/index.ts",
    amap: "src/amap/index.ts",
    amapUI: "src/amapUI/index.ts",
    loca: "src/loca/index.ts",
  },
  format: ["esm", "cjs"],
  dts: { cjsReexport: true },
  target: "es2022",
  platform: "neutral",
  deps: { neverBundle: ["amap-web-types"] },
  tsconfig: true,
  plugins: tsdownVisualizerPlugins(),
  hooks: {
    "build:done": tsdownFixCtsStubs,
  },
});

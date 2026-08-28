import { tsdownFixCtsStubs, tsdownVisualizerPlugins } from "amap-web-internal";
import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
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

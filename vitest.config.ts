import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "amap-web-react/loader", replacement: resolve("packages/react/src/loader/index.ts") },
      { find: "amap-web-react/amap", replacement: resolve("packages/react/src/amap/index.ts") },
      { find: "amap-web-react/amapUI", replacement: resolve("packages/react/src/amapUI/index.ts") },
      { find: "amap-web-react/loca", replacement: resolve("packages/react/src/loca/index.ts") },
      { find: "amap-web-react", replacement: resolve("packages/react/src/index.ts") },
      { find: "amap-web-types/amap", replacement: resolve("packages/types/src/amap-api/index.ts") },
      { find: "amap-web-types/amapUI", replacement: resolve("packages/types/src/amapUI-api/index.ts") },
      { find: "amap-web-types/loca", replacement: resolve("packages/types/src/loca-api/index.ts") },
      { find: "amap-web-types", replacement: resolve("packages/types/src/index.ts") },
      { find: "amap-web-internal", replacement: resolve("packages/internal/src/index.ts") },
    ],
  },
  test: {
    clearMocks: true,
    coverage: {
      enabled: false,
      reportsDirectory: ".cache/coverage",
      provider: "v8",
      include: ["packages/**/src/**/*.ts", "packages/**/src/**/*.tsx"],
      thresholds: {
        lines: 90,
        branches: 90,
        functions: 90,
        statements: 90,
      },
    },
    projects: [
      {
        extends: true,
        test: {
          name: "node",
          environment: "node",
          include: ["test/unit/types/**/*.test.ts", "test/integration/**/*.test.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: "dom",
          environment: "jsdom",
          include: ["test/unit/react/**/*.test.{ts,tsx}"],
        },
      },
    ],
  },
});

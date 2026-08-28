import { describe, expect, it } from "vitest";

describe("amap-web-types smoke", () => {
  it("should re-export without throwing", async () => {
    const mod = await import("amap-web-types");
    expect(Object.keys(mod).length).toBeGreaterThanOrEqual(0);
  });
});

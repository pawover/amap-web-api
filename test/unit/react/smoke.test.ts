import { describe, expect, it } from "vitest";

describe("amap-web-react smoke", () => {
  it("should re-export APILoader without throwing", async () => {
    const mod = await import("amap-web-react");
    expect(mod).toBeDefined();
  });
});

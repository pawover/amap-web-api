import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Loader, resetLoader } from "amap-web-react";

describe("Loader 单例", () => {
  beforeEach(() => {
    resetLoader();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete (window as { AMap?: unknown }).AMap;
    delete (window as { ___onAPILoaded?: unknown }).___onAPILoaded;
  });

  it("load 注入 script 并以 callback=___onAPILoaded 就绪", async () => {
    const appended: HTMLScriptElement[] = [];
    vi.spyOn(document.head, "appendChild").mockImplementation((node) => {
      appended.push(node as HTMLScriptElement);
      return node;
    });
    const promise = Loader.load({ aKey: "test-key" });
    expect(appended).toHaveLength(1);
    expect(appended[0]!.src).toContain("callback=___onAPILoaded");
    expect(typeof window.___onAPILoaded).toBe("function");
    window.___onAPILoaded!();
    await promise;
    expect(Loader.isLoaded).toBe(true);
    expect(Loader.status).toBe("loaded");
  });

  it("重复 load 去重，不重复注入 script", async () => {
    const spy = vi.spyOn(document.head, "appendChild");
    const p1 = Loader.load({ aKey: "test-key" });
    const p2 = Loader.load({ aKey: "test-key" });
    expect(spy).toHaveBeenCalledTimes(1);
    window.___onAPILoaded!();
    await Promise.all([p1, p2]);
    expect(Loader.isLoaded).toBe(true);
  });

  it("不一致 key 时 reject", async () => {
    Loader.load({ aKey: "first-key" });
    window.___onAPILoaded!();
    await expect(Loader.load({ aKey: "second-key" })).rejects.toThrow(/key/);
  });

  it("reset 清理状态", async () => {
    Loader.load({ aKey: "test-key" });
    window.___onAPILoaded!();
    expect(Loader.isLoaded).toBe(true);
    resetLoader();
    expect(Loader.isLoaded).toBe(false);
    expect(Loader.status).toBe("notload");
  });
});

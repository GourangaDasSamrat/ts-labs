import { beforeEach, describe, expect, it } from "bun:test";
import { WindowRegistry } from "../src/client/windowRegistry";
import type { WindowInfo } from "../src/types/index";

describe("WindowRegistry", () => {
  beforeEach(() => {
    (globalThis as any).window = { addEventListener() {} };
    (globalThis as any).document = { addEventListener() {}, visibilityState: "visible" };
    (globalThis as any).localStorage = {
      getItem: () => null,
      setItem() {},
    };
  });

  it("should filter hidden windows and elect host", () => {
    const registry = new WindowRegistry();
    (registry as any).windows = {
      a: {
        id: "a",
        visible: false,
        lastSeen: Date.now(),
        x: 0,
        y: 0,
        w: 300,
        h: 200,
      } as WindowInfo,
      b: {
        id: "b",
        visible: true,
        lastSeen: Date.now(),
        x: 0,
        y: 0,
        w: 300,
        h: 200,
      } as WindowInfo,
    };

    expect(registry.aliveWindows().length).toBe(1);
    expect(registry.hostId()).toBe("b");
  });
});

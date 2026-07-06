import { beforeEach, describe, expect, it } from "bun:test";
import { viewportRect } from "../src/client/viewport";

describe("Viewport", () => {
  beforeEach(() => {
    (globalThis as any).window = {
      screenX: 100,
      screenY: 50,
      outerWidth: 820,
      outerHeight: 700,
      innerWidth: 800,
      innerHeight: 600,
    };
  });

  it("should return correct viewport rectangle", () => {
    const rect = viewportRect();
    expect(rect).toEqual({ x: 100, y: 50, w: 800, h: 600 });
  });
});

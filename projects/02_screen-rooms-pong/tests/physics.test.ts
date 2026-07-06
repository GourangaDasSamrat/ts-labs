import { beforeEach, describe, expect, it } from "bun:test";
import { Physics } from "../src/client/physics";
import type { BallState, ViewportRect } from "../src/types/index";

describe("Physics", () => {
  let store: Map<string, string>;

  beforeEach(() => {
    store = new Map();
    (globalThis as any).window = { addEventListener() {} };
    (globalThis as any).performance = { now: () => 16 };
    Math.random = () => 0;
    (globalThis as any).localStorage = {
      getItem: (key: string) => store.get(key) || null,
      setItem: (key: string, value: string) => store.set(key, value),
    };
  });

  const tick = (ball: BallState, rects: ViewportRect[]): BallState | null => {
    const physics = new Physics();
    (physics as any).ball = ball;
    return physics.tick(rects, 50);
  };

  it("should move ball across touching windows", () => {
    const touching = tick({ x: 90, y: 50, vx: 300, vy: 0, t: 0 }, [
      { id: "a", x: 0, y: 0, w: 100, h: 100, visible: true, lastSeen: Date.now() } as any,
      { id: "b", x: 100, y: 0, w: 100, h: 100, visible: true, lastSeen: Date.now() } as any,
    ]);
    expect(touching?.x).toBe(105);
    expect(touching?.vx).toBe(300);
  });

  it("should bounce at gaps between windows", () => {
    const gap = tick({ x: 90, y: 50, vx: 300, vy: 0, t: 0 }, [
      { id: "a", x: 0, y: 0, w: 100, h: 100, visible: true, lastSeen: Date.now() } as any,
      { id: "b", x: 200, y: 0, w: 100, h: 100, visible: true, lastSeen: Date.now() } as any,
    ]);
    expect(gap?.x).toBe(90);
    expect(gap?.vx).toBe(-300);
  });

  it("should bounce at edge", () => {
    const edge = tick({ x: 90, y: 50, vx: 300, vy: 0, t: 0 }, [
      { id: "only", x: 0, y: 0, w: 100, h: 100, visible: true, lastSeen: Date.now() } as any,
    ]);
    expect(edge?.x).toBe(90);
    expect(edge?.vx).toBe(-300);
  });

  it("should reseed if ball goes out of bounds", () => {
    const reseeded = tick({ x: 490, y: 100, vx: 100, vy: 0, t: 0 }, [
      { id: "only", x: 0, y: 0, w: 300, h: 200, visible: true, lastSeen: Date.now() } as any,
    ]);
    expect(reseeded?.x).toBe(150);
    expect(reseeded?.y).toBe(100);
  });
});

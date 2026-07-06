import { BallState, ViewportRect } from "../types/index.js";

const BALL_KEY = "pong:ball";
const RADIUS = 8;

const readJson = (key: string, fallback: any): any => {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") || fallback;
  } catch {
    return fallback;
  }
};

const coveredAt = (rects: ViewportRect[], x: number, y: number): boolean =>
  rects.some((r) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h);

const seedBall = (rects: ViewportRect[]): BallState => {
  const b = rects[0];
  const angle = Math.random() * Math.PI * 2;
  return {
    x: b.x + b.w / 2,
    y: b.y + b.h / 2,
    vx: Math.cos(angle) * 420,
    vy: Math.sin(angle) * 420,
    t: performance.now(),
  };
};

export class Physics {
  private ball: BallState | null = null;
  private lastWrite: number = 0;

  constructor() {
    window.addEventListener("storage", (event: StorageEvent) => {
      if (event.key === BALL_KEY) {
        this.ball = readJson(BALL_KEY, this.ball);
      }
    });
  }

  currentBall(): BallState | null {
    this.ball ||= readJson(BALL_KEY, null);
    return this.ball;
  }

  tick(rects: ViewportRect[], now: number): BallState | null {
    if (!rects.length) return null;
    this.ball ||= readJson(BALL_KEY, null) || seedBall(rects);

    const dt = Math.min((now - this.ball.t) / 1000, 0.05);
    let { x, y, vx, vy } = this.ball;

    let nx = x + vx * dt;
    if (vx !== 0) {
      const edgeX = vx > 0 ? nx + RADIUS : nx - RADIUS;
      if (!coveredAt(rects, edgeX, y)) {
        nx = x;
        vx = -vx;
      }
    }

    let ny = y + vy * dt;
    if (vy !== 0) {
      const edgeY = vy > 0 ? ny + RADIUS : ny - RADIUS;
      if (!coveredAt(rects, nx, edgeY)) {
        ny = y;
        vy = -vy;
      }
    }

    let next: BallState = { x: nx, y: ny, vx, vy, t: now };

    if (!Number.isFinite(next.x) || !Number.isFinite(next.y) || !coveredAt(rects, next.x, next.y)) {
      next = seedBall(rects);
    }

    this.ball = next;
    if (now - this.lastWrite > 16) {
      localStorage.setItem(BALL_KEY, JSON.stringify(next));
      this.lastWrite = now;
    }
    return next;
  }
}

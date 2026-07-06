import { BallState, Point } from "../types/index.js";
import { viewportRect } from "./viewport.js";

const TRAIL = 56;

export class Renderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private points: Point[] = [];

  constructor(canvasElement: HTMLElement | null) {
    if (!(canvasElement instanceof HTMLCanvasElement)) {
      throw new Error("Invalid canvas element");
    }
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext("2d")!;
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  private resize(): void {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.floor(window.innerWidth * dpr);
    this.canvas.height = Math.floor(window.innerHeight * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  draw(ball: BallState | null, now: number): void {
    const ctx = this.ctx;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.strokeRect(0.5, 0.5, window.innerWidth - 1, window.innerHeight - 1);

    if (!ball) return;

    const viewport = viewportRect();
    const p: Point = {
      x: ball.x - viewport.x,
      y: ball.y - viewport.y,
      hue: now / 28,
    };
    const last = this.points.at(-1);
    if (!last || Math.hypot(last.x - p.x, last.y - p.y) > 0.5) {
      this.points.push(p);
    }
    this.points = this.points.slice(-TRAIL);

    ctx.globalCompositeOperation = "lighter";
    this.points.forEach((point, i) => {
      const age = i / Math.max(this.points.length - 1, 1);
      const ease = 1 - Math.pow(1 - age, 3);
      const r = 1 + ease * 13;
      const a = ease * ease;
      const color = `hsla(${(point.hue + i * 4) % 360},100%,60%,${a})`;
      ctx.fillStyle = color;
      ctx.shadowBlur = i > this.points.length - 5 ? 20 : 0;
      ctx.shadowColor = color;
      ctx.beginPath();
      ctx.arc(point.x, point.y, r, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}

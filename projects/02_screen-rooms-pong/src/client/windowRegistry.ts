import { WindowInfo } from "../types/index.js";
import { viewportRect } from "./viewport.js";

const WINDOWS_KEY = "pong:windows";

const readJson = (key: string, fallback: any): any => {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") || fallback;
  } catch {
    return fallback;
  }
};

export class WindowRegistry {
  private id: string;
  private windows: Record<string, WindowInfo> = {};
  private listeners: Set<() => void> = new Set();
  private lastRect: string = "";
  private timer: number | null = null;
  private moveTimer: number | null = null;

  constructor() {
    this.id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

    window.addEventListener("storage", (event: StorageEvent) => {
      if (event.key === WINDOWS_KEY) this.refresh();
    });
    window.addEventListener("resize", () => this.writeSelf());
    document.addEventListener("visibilitychange", () => this.writeSelf());
    window.addEventListener("beforeunload", () => this.removeSelf());
  }

  start(): void {
    this.writeSelf();
    this.timer = window.setInterval(() => this.writeSelf(), 500);
    this.moveTimer = window.setInterval(() => this.writeIfMoved(), 100);
    this.refresh();
  }

  onChange(listener: () => void): void {
    this.listeners.add(listener);
  }

  aliveWindows(now: number = Date.now()): WindowInfo[] {
    return Object.values(this.windows)
      .filter((win) => now - win.lastSeen <= 2000)
      .filter((win) => win.visible !== false)
      .sort((a, b) => a.id.localeCompare(b.id));
  }

  hostId(): string {
    return this.aliveWindows()[0]?.id || this.id;
  }

  isHost(): boolean {
    return this.hostId() === this.id;
  }

  private writeSelf(): void {
    const now = Date.now();
    const all = readJson(WINDOWS_KEY, {} as Record<string, WindowInfo>);
    for (const [id, win] of Object.entries(all)) {
      if (now - win.lastSeen > 2000) delete all[id];
    }

    const viewport = viewportRect();
    const rect: WindowInfo = {
      id: this.id,
      ...viewport,
      visible: document.visibilityState !== "hidden",
      lastSeen: now,
    };
    all[this.id] = rect;
    localStorage.setItem(WINDOWS_KEY, JSON.stringify(all));
    this.windows = all;
    this.emit();

    this.lastRect = this.rectKey();
  }

  private rectKey(): string {
    const rect = viewportRect();
    return `${rect.x},${rect.y},${rect.w},${rect.h}`;
  }

  private writeIfMoved(): void {
    if (this.rectKey() !== this.lastRect) this.writeSelf();
  }

  private refresh(): void {
    const now = Date.now();
    const all = readJson(WINDOWS_KEY, {} as Record<string, WindowInfo>);
    let changed = false;
    for (const [id, win] of Object.entries(all)) {
      if (now - win.lastSeen > 2000) {
        delete all[id];
        changed = true;
      }
    }
    if (changed) localStorage.setItem(WINDOWS_KEY, JSON.stringify(all));
    this.windows = all;
    this.emit();
  }

  private removeSelf(): void {
    const all = readJson(WINDOWS_KEY, {} as Record<string, WindowInfo>);
    delete all[this.id];
    localStorage.setItem(WINDOWS_KEY, JSON.stringify(all));
  }

  private emit(): void {
    this.listeners.forEach((listener) => listener());
  }

  destroy(): void {
    if (this.timer) clearInterval(this.timer);
    if (this.moveTimer) clearInterval(this.moveTimer);
  }
}

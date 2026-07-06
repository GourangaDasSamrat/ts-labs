export interface ViewportRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface BallState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  t: number;
}

export interface WindowInfo extends ViewportRect {
  id: string;
  visible: boolean;
  lastSeen: number;
}

export interface Point {
  x: number;
  y: number;
  hue: number;
}

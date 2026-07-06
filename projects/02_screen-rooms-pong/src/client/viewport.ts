import { ViewportRect } from "../types/index.js";

export const viewportRect = (): ViewportRect => {
  return {
    x: window.screenX,
    y: window.screenY,
    w: window.innerWidth,
    h: window.innerHeight,
  };
};

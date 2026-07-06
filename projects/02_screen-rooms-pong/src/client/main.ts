import { Physics } from "./physics.js";
import { Renderer } from "./renderer.js";
import { WindowRegistry } from "./windowRegistry.js";

const registry = new WindowRegistry();
const physics = new Physics();
const renderer = new Renderer(document.querySelector("#game"));

registry.start();

function frame(now: number) {
  const windows = registry.aliveWindows();
  const ball = registry.isHost() ? physics.tick(windows, now) : physics.currentBall();
  renderer.draw(ball, now);
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

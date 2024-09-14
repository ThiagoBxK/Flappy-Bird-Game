import Ground from "./Ground";
import Scenario from "./Scenario";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ground = new Ground(canvas);
const scenario = new Scenario(canvas);

function clear() {
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  context.clearRect(0, 0, canvas.width, canvas.height);
}

setInterval(() => {
  scenario.updateFrame();
  ground.updateFrame();
}, 1000 / 60);

import Bird from "./Bird";
import { createImage } from "./functions";
import Scenario from "./Scenario";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game") as HTMLCanvasElement;
  const background = new Scenario(canvas);
  const bird = new Bird(canvas);

  setTimeout(() => {
    background.render();
    bird.render();
  }, 20);

  bird.loop();
});

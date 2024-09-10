import Bird from "./Bird";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const bird = new Bird(canvas);

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => bird.render(), 10);
  bird.start();
});

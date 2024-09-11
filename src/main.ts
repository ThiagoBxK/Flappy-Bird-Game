import Bird from "./Bird";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game") as HTMLCanvasElement;
  const bird = new Bird(canvas);

  setTimeout(() => bird.render(), 10);
  bird.start();
});

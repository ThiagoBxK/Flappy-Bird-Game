import Game from "./Game";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const game = new Game(canvas, {
  speed: 1,
  fps: 60,
});

game.render();
game.start();

setTimeout(() => {
  game.lose();
}, 1000);

// function clear() {
//   const context = canvas.getContext("2d") as CanvasRenderingContext2D;
//   context.clearRect(0, 0, canvas.width, canvas.height);
// }

// setInterval(() => {
//   scenario.updateFrame();
//   ground.updateFrame();
// }, 1000 / 60);

import Game from "./Game";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const game = new Game(canvas);

game.render();
game.start();

canvas.addEventListener("click", (event) => {
  game.handleClick(event);
});

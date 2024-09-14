// import Bird from "./Bird";
// import { createImage } from "./functions";
// import Scenario from "./Scenario";

import Bird from "./Bird";
import Scenario from "./Scenario";

// enum GameStatus {
//   Playing = "playing",
//   GameOver = "gameover",
// }

// interface GameState {
//   scenarioName: string;
// }

// class Game {
//   private canvas: HTMLCanvasElement;
//   readonly status: GameStatus | undefined;
//   private static instance: Game | null;
//   private bird: Bird;
//   readonly scenario: Scenario;

//   constructor(canvas: HTMLCanvasElement) {
//     this.canvas = canvas;
//     this.status = undefined;

//     this.bird = new Bird(canvas);
//     this.scenario = new Scenario(canvas);
//   }

//   start() {}

//   render() {
//     this.scenario.render();
//     //this.bird.render();
//   }
// }

// const canvas = document.getElementById("game") as HTMLCanvasElement;
// const game = new Game(canvas);

// document.addEventListener("DOMContentLoaded", () => {
//   game.render();

//   // const canvas = document.getElementById("game") as HTMLCanvasElement;
//   // const background = new Scenario(canvas);
//   // const bird = new Bird(canvas);
//   // setTimeout(() => {
//   //   background.render();
//   //   bird.render();
//   // }, 20);
//   // bird.loop();
// });

const canvas = document.getElementById("game") as HTMLCanvasElement;

import Ground from "./Ground";

const ground = new Ground(canvas);

ground.render();

setInterval(() => {
  ground.updateFrame();
}, 1000 / 60);

// const scenario = new Scenario(canvas);
// const bird = new Bird(canvas);

// scenario.render();
// scenario.loop();
// bird.start();

// clearInterval(scenario.interval);
// const bird = new Bird(canvas);

// scenario.render();
// scenario.loop();

// bird.loop();

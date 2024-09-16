import Ground from "./Ground";
import Background from "./Scenario";
import { GameState } from "./types";

export default class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private background: Background;
  private ground: Ground;
  private interval: any;
  private state: GameState;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.state = {
      fps: 60,
      speed: 1,
    };

    this.background = new Background(canvas, this.state);
    this.ground = new Ground(canvas, this.state);
    this.interval = undefined;
  }

  updateFrame() {
    this.background.updateFrame();
    this.ground.updateFrame();
  }

  start() {
    this.interval = setInterval(() => {
      this.updateFrame();
    }, 1000 / this.state.fps);
  }

  over() {
    clearInterval(this.interval);
  }

  render() {
    // Temporariamente
    setTimeout(() => {
      this.background.render();
      this.ground.render();
    }, 100);
  }
}

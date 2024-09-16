import Bird from "./Bird";
import Ground from "./Ground";
import Background from "./Scenario";
import { GameState } from "./types";

export default class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private interval: any;
  private state: GameState;
  private background: Background;
  private ground: Ground;
  private bird: Bird;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.interval = undefined;
    this.state = {
      status: "home",
      fps: 60,
      speed: 1,
    };
    this.background = new Background(canvas, this.state);
    this.ground = new Ground(canvas, this.state);
    this.bird = new Bird(canvas, this.state);
  }

  updateFrame() {
    if (this.ground.checkColision(this.bird.state)) return this.over();

    this.background.updateFrame();
    this.ground.updateFrame();
    this.bird.updateFrame();
  }

  private changeStatus(newStatus: string) {
    this.state.status = newStatus;
  }

  over() {
    this.changeStatus("gameover");
    clearInterval(this.interval);
  }

  handleClick(event: MouseEvent) {
    if (this.state.status === "playing") this.bird.handleClick(event);
  }

  start() {
    this.changeStatus("playing");

    this.interval = setInterval(
      () => this.updateFrame(),
      1000 / this.state.fps
    );
  }

  render() {
    // Temporariamente
    setTimeout(() => {
      this.background.render();
      this.ground.render();
      this.bird.render();
    }, 100);
  }
}

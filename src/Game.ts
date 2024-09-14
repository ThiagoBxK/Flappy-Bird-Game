import Bird from "./Bird";
import Ground from "./Ground";
import Scenario from "./Scenario";
import { GameState } from "./types";

export default class Game {
  private canvas: HTMLCanvasElement;
  private scenario: Scenario;
  private ground: Ground;
  private bird: Bird;
  private state: GameState;
  private interval: any;

  constructor(canvas: HTMLCanvasElement, state: GameState) {
    this.canvas = canvas;
    this.scenario = new Scenario(canvas, state);
    this.ground = new Ground(canvas, state);
    this.bird = new Bird(canvas, state);
    this.interval = undefined;
    this.state = {
      fps: state.fps,
      speed: state.speed,
    };
  }

  private checkGroundColision(): boolean {
    return (
      this.bird.state.posY >=
      this.canvas.height -
        this.ground.groundSize * 0.8 -
        this.bird.state.size.height
    );
  }

  private loop() {
    // Temporary
    if (this.checkGroundColision()) {
      this.bird.state.posY = this.canvas.height - this.ground.groundSize - 4;
      this.lose();
    }

    this.scenario.updateFrame();
    this.ground.updateFrame();
    this.bird.updateFrame();
  }

  start() {
    this.interval = setInterval(() => this.loop(), 1000 / this.state.fps);
  }

  lose() {
    clearInterval(this.interval);
  }

  render() {
    this.scenario.render();
    this.ground.render();
    this.bird.render();
  }
}

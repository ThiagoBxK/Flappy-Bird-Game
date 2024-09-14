import Ground from "./Ground";
import Scenario from "./Scenario";
import { GameState } from "./types";

export default class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private scenario: Scenario;
  private ground: Ground;
  private state: GameState;
  private interval: any;

  constructor(canvas: HTMLCanvasElement, state: GameState) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.scenario = new Scenario(canvas, state);
    this.ground = new Ground(canvas, state);
    this.interval = undefined;
    this.state = {
      fps: state.fps,
      speed: state.speed,
    };
  }

  private loop() {
    this.scenario.updateFrame();
    this.ground.updateFrame();
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
  }
}

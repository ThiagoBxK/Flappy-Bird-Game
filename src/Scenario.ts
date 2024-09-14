import { createImage } from "./functions";

interface ScenarioState {
  scenarioName: string;
  posX: Array<number>;
  scenarioSpeed: number;
}

export default class Scenario {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private sprite: HTMLImageElement;
  private state: ScenarioState;
  public loopInterval: number | undefined;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.state = {
      scenarioName: "default-day",
      scenarioSpeed: 1,
      posX: [0, canvas.width],
    };
    this.sprite = createImage(
      `./images/scenarios/${this.state.scenarioName}.png`
    );
    this.loopInterval = undefined;
  }

  private clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private draw() {
    this.state.posX.forEach((pos) => {
      this.context.drawImage(
        this.sprite,
        pos,
        0,
        this.canvas.width,
        this.canvas.height
      );
    });
  }

  private updateScenario() {
    this.state.posX[0] -= this.state.scenarioSpeed;
    this.state.posX[1] -= this.state.scenarioSpeed;

    if (Math.abs(this.state.posX[0]) >= this.canvas.width) {
      this.state.posX[0] = this.canvas.width;
    } else if (Math.abs(this.state.posX[1]) >= this.canvas.width) {
      this.state.posX[1] = this.canvas.width;
    }

    this.clearCanvas();
    this.draw();
  }

  render() {
    this.sprite.onload = () => this.draw();
  }

  loop() {
    this.loopInterval = setInterval(() => this.updateScenario(), 1000 / 60);
  }
}

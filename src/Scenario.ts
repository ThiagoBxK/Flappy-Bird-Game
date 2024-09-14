import { createImage } from "./functions";

export default class Scenario {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private sprite: HTMLImageElement;
  private state: {
    scenarioName: string;
    posX: Array<number>;
    scenarioSpeed: number;
  };

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
  }

  private draw() {
    this.state.posX.forEach((posX, index) => {
      this.context.drawImage(
        this.sprite,
        posX,
        0,
        this.canvas.width,
        this.canvas.height
      );
    });
  }

  updateFrame() {
    this.state.posX[0] -= this.state.scenarioSpeed;
    this.state.posX[1] -= this.state.scenarioSpeed;

    if (Math.abs(this.state.posX[0]) >= this.canvas.width)
      this.state.posX[0] = this.canvas.width;
    else if (Math.abs(this.state.posX[1]) >= this.canvas.width)
      this.state.posX[1] = this.canvas.width;

    //this.clear();
    this.draw();
  }

  render() {
    this.sprite.onload = () => this.draw();
  }
}

import { createImage } from "./functions";

export default class Scenario {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private scenario: HTMLImageElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.scenario = createImage("./images/scenarios/default-day.png");
  }

  setScenario(name: string) {
    this.scenario = createImage(`.images/scenarios/${name}.png`);
    this.scenario.onload = () => this.render();
  }

  private draw(context: CanvasRenderingContext2D, image: HTMLImageElement) {
    context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
  }

  render() {
    this.draw(this.context, this.scenario);
  }
}

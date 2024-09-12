import { createImage } from "./functions";

export default class Scenario {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private scenario: HTMLImageElement | undefined;
  private state: { scenarioName: string };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.state = {
      scenarioName: "default-day",
    };
    this.scenario = undefined;
  }

  private draw(context: CanvasRenderingContext2D, image: HTMLImageElement) {
    context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
  }

  setScenario(name: string) {
    this.state.scenarioName = name;
    this.scenario = createImage(
      `./images/scenarios/${this.state.scenarioName}.png`
    );

    this.scenario.onload = () => this.render();
  }

  render(): void {
    if (this.scenario) return this.draw(this.context, this.scenario);

    this.setScenario(this.state.scenarioName);
  }
}

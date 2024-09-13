import { createImage } from "./functions";

interface ScenarioState {
  fps: number;
  scenarioName: string;
  posX: Array<number>;
}

export default class Scenario {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private state: ScenarioState;
  private sprite: HTMLImageElement;
  private interval: any;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.state = {
      fps: 60,
      scenarioName: "default-day",
      posX: [0, canvas.width],
    };
    this.sprite = createImage(
      `./images/scenarios/${this.state.scenarioName}.png`
    );
  }

  private draw(context: CanvasRenderingContext2D, image: HTMLImageElement) {
    this.state.posX.forEach((pos) => {
      context.drawImage(image, pos, 0, this.canvas.width, this.canvas.height);
    });
  }

  setScenario(name: string, callback?: (sprite: HTMLImageElement) => void) {
    this.state.scenarioName = name;
    const sprite = createImage(`./images/scenarios/${name}.png`);

    sprite.onload = () => callback && callback(sprite);
  }

  private clearRect() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  infiniteScenarioLoop(call?: () => void) {
    this.state.posX[0]--;
    this.state.posX[1]--;

    if (!(this.state.posX[0] * -1 <= this.canvas.width))
      this.state.posX[0] = this.canvas.width;

    if (this.state.posX[1] <= this.canvas.width * -1)
      this.state.posX[1] = this.canvas.width;

    this.draw(this.context, this.sprite);
    call && call();
  }

  loop() {
    this.interval = setInterval(
      () => this.infiniteScenarioLoop(),
      1000 / this.state.fps
    );
  }

  render() {
    this.sprite.onload = () => this.draw(this.context, this.sprite);
  }
}

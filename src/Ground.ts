import { createImage } from "./functions";

export default class Ground {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private sprite: HTMLImageElement;
  private floorSize: number;
  private state: {
    posX: Array<number>;
    posY: Array<number>;
    speed: number;
  };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.sprite = createImage(`./images/floor.png`);
    this.floorSize = 128;
    this.state = {
      posX: [0, canvas.width],
      posY: [
        canvas.height - this.floorSize * 0.8,
        canvas.height - this.floorSize * 0.8,
      ],
      speed: 2,
    };
  }

  private draw() {
    this.state.posX.forEach((posX: number, index: number) => {
      this.context.drawImage(
        this.sprite,
        posX,
        this.state.posY[index],
        this.canvas.width,
        this.floorSize
      );
    });
  }

  private clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  updateFrame() {
    this.state.posX[0] -= this.state.speed;
    this.state.posX[1] -= this.state.speed;

    if (Math.abs(this.state.posX[0]) >= this.canvas.width)
      this.state.posX[0] = this.canvas.width;
    else if (Math.abs(this.state.posX[1]) >= this.canvas.width)
      this.state.posX[1] = this.canvas.width;

    this.clear();
    this.draw();
  }

  render() {
    this.sprite.onload = () => this.draw();
  }
}

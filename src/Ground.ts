import { createImage } from "./functions";

export default class Ground {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private sprite: HTMLImageElement;
  private groundSize: number;
  private state: {
    posX: Array<number>;
    posY: Array<number>;
    groundSpeed: number;
  };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.groundSize = 128;
    this.state = {
      groundSpeed: 1,
      posX: [0, canvas.width],
      posY: [
        canvas.height - this.groundSize * 0.8,
        canvas.height - this.groundSize * 0.8,
      ],
    };
    this.sprite = createImage(`./images/ground.png`);
  }

  private draw() {
    this.state.posX.forEach((posX, index) => {
      this.context.drawImage(
        this.sprite,
        posX,
        this.state.posY[index],
        this.canvas.width,
        this.groundSize
      );
    });
  }

  updateFrame() {
    this.state.posX[0] -= this.state.groundSpeed;
    this.state.posX[1] -= this.state.groundSpeed;

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

import { createImage } from "./functions";
import { GameState } from "./types";

export default class Ground {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private sprite: HTMLImageElement;
  readonly groundSize: number;
  private state: {
    posX: Array<number>;
    posY: Array<number>;
    groundSpeed: number;
  };

  constructor(canvas: HTMLCanvasElement, gameState: GameState) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.groundSize = 128;
    this.state = {
      groundSpeed: gameState.speed,
      posX: [0, canvas.width],
      posY: [
        canvas.height - this.groundSize * 0.8,
        canvas.height - this.groundSize * 0.8,
      ],
    };
    this.sprite = createImage(`./images/sprites/ground.png`);
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

    this.draw();
  }

  render() {
    this.sprite.onload = () => this.draw();
  }
}

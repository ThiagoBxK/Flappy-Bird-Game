import { createImage } from "./functions";
import { BirdState, GameState, ISprite } from "./types";

export default class Pipe {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private sprite: HTMLImageElement;
  private pipes: Array<any>;
  private state: {
    frames: number;
    height: number;
    width: number;
    createPipeInterval: number;
  } & GameState;

  constructor(canvas: HTMLCanvasElement, gameState: GameState) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.sprite = createImage(`./images/sprites/pipe.png`);
    this.state = {
      frames: 0,
      status: gameState.status,
      fps: gameState.fps,
      speed: gameState.speed,
      height: 2000,
      width: 48,
      createPipeInterval: 200,
    };
    this.pipes = [
      {
        posX: canvas.width - 10,
        posY: [0, canvas.width + 0],
      },
    ];
  }

  draw() {
    this.pipes.forEach((pipe) => {
      this.context.drawImage(
        this.sprite,
        pipe.posX,
        pipe.posY,
        this.state.width,
        this.canvas.height
      );
    });
  }

  checkColision(birdState: BirdState) {}

  createPipe() {
    this.pipes.push({
      posX: this.canvas.width - 10,
      posY: Math.random() * 90 * -1,
    });
  }

  updateFrame() {
    this.state.frames++;

    if (this.state.frames % this.state.createPipeInterval === 0) {
      this.createPipe();
    }

    this.pipes.forEach(
      (pipe, index) => (this.pipes[index].posX -= this.state.speed)
    );

    this.render();
  }

  render() {
    this.draw();
  }
}

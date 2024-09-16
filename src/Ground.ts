import { createImage } from "./functions";
import { GameState, ISprite } from "./types";

export default class Ground {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private sprites: Array<ISprite>;
  private state: {
    height: number;
    width: number;
  } & GameState;

  constructor(canvas: HTMLCanvasElement, defaultState: GameState) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.state = {
      height: 96,
      width: canvas.width,
      ...defaultState,
    };
    this.sprites = [
      {
        image: createImage(`./images/sprites/ground.png`),
        posX: 0,
        posY: canvas.height - this.state.height,
      },
      {
        image: createImage(`./images/sprites/ground.png`),
        posX: canvas.width,
        posY: canvas.height - this.state.height,
      },
    ];
  }

  draw() {
    this.sprites.forEach((sprite) => {
      this.context.drawImage(
        sprite.image,
        sprite.posX,
        sprite.posY,
        this.state.width,
        this.state.height
      );
    });
  }

  updateFrame() {
    this.sprites[0].posX -= this.state.speed;
    this.sprites[1].posX -= this.state.speed;

    if (Math.abs(this.sprites[0].posX) >= this.canvas.width)
      this.sprites[0].posX = this.canvas.width;
    else if (Math.abs(this.sprites[1].posX) >= this.canvas.width)
      this.sprites[1].posX = this.canvas.width;

    this.render();
  }

  render() {
    this.draw();
  }
}

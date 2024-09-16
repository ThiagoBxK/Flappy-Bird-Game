import { createImage } from "./functions";
import { GameState, ISprite } from "./types";

export default class Background {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private sprites: Array<ISprite>;
  private state: {} & GameState;

  constructor(canvas: HTMLCanvasElement, defaultState: GameState) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.state = {
      ...defaultState,
    };
    this.sprites = [
      {
        image: createImage(`./images/sprites/scenarios/default-day.png`),
        posX: 0,
        posY: 0,
      },
      {
        image: createImage(`./images/sprites/scenarios/default-day.png`),
        posX: canvas.width,
        posY: 0,
      },
    ];
  }

  draw() {
    this.sprites.forEach((sprite) => {
      this.context.drawImage(
        sprite.image,
        sprite.posX,
        sprite.posY,
        this.canvas.width,
        this.canvas.height
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

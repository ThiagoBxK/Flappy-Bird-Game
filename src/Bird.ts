import { createImage } from "./functions";

interface BirdState {
  fps: number;
  frames: number;
  gravity: number;
  gravitySpeed: number;
  posY: number;
  scale: number;
  spriteIndex: number;
}

class Bird {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private sprites: Array<HTMLImageElement>;
  private state: BirdState;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.state = {
      frames: 0,
      gravity: 0.3,
      gravitySpeed: -2,
      posY: 0,
      scale: 1.25,
      spriteIndex: 0,
      fps: 60,
    };

    this.sprites = [
      createImage("./images/upflap.png"),
      createImage("./images/midflap.png"),
      createImage("./images/downflap.png"),
    ];
  }

  draw(context: CanvasRenderingContext2D, image: HTMLImageElement) {
    context.drawImage(
      image,
      0,
      this.state.posY,
      image.width * this.state.scale,
      image.height * this.state.scale
    );
  }

  render() {
    this.draw(this.context, this.sprites[this.state.spriteIndex]);
  }

  clearRect() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  updateSpriteIndex(frameInterval: number) {
    if (this.state.frames % frameInterval === 0) {
      this.state.spriteIndex =
        (this.state.spriteIndex + 1) % this.sprites.length;

      console.log(this.state.spriteIndex);
    }
  }

  update() {
    this.state.frames++;

    this.updateSpriteIndex(8);

    this.clearRect();
    this.draw(this.context, this.sprites[this.state.spriteIndex]);

    this.state.gravitySpeed += this.state.gravity;
    this.state.posY += this.state.gravitySpeed;

    // if (this.state.posY >= 300) {
    //   this.state.gravity = 0.5;
    //   this.state.gravitySpeed = -5;
    //   this.state.posY = 0;
    // }

    setTimeout(() => {
      this.update();
    }, 1000 / this.state.fps);
  }
}

export default Bird;

import { createImage } from "./functions";

interface BirdState {
  fps: number;
  frames: number;
  gravity: number;
  gravitySpeed: number;
  posY: number;
  posX: number;
  scale: number;
  spriteIndex: number;
  size: {
    heigth: number;
    width: number;
  };
}

class Bird {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private sprites: Array<HTMLImageElement>;
  private state: BirdState;
  private interval: any;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.interval = null;
    this.state = {
      frames: 0,
      gravity: 0.3,
      gravitySpeed: -2,
      posY: 100,
      posX: 20,
      scale: 1.25,
      spriteIndex: 0,
      fps: 60,
      size: {
        width: 0,
        heigth: 0,
      },
    };

    this.sprites = [
      createImage("./images/upflap.png"),
      createImage("./images/midflap.png"),
      createImage("./images/downflap.png"),
    ];

    this.canvas.addEventListener("click", (event) => this.handleClick(event));
  }

  private draw(context: CanvasRenderingContext2D, image: HTMLImageElement) {
    this.clearRect();

    this.state.size = {
      width: image.width * this.state.scale,
      heigth: image.height * this.state.scale,
    };

    context.drawImage(
      image,
      this.state.posX,
      this.state.posY,
      this.state.size.width,
      this.state.size.heigth
    );
  }

  private clearRect() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private updateSpriteIndex(frameInterval: number) {
    if (this.state.frames % frameInterval === 0) {
      this.state.spriteIndex =
        (this.state.spriteIndex + 1) % this.sprites.length;
    }
  }

  private checkGroundCollision() {
    return !(this.state.posY <= this.canvas.height - this.state.size.heigth);
  }

  private simulateColision() {
    this.state.gravitySpeed += this.state.gravity;
    this.state.posY += this.state.gravitySpeed;
  }

  gameOver() {
    this.state.posY = this.canvas.height - this.state.size.heigth;
    clearInterval(this.interval);

    this.updateFrame();
  }

  private updateFrame() {
    this.state.frames++;

    this.updateSpriteIndex(8);
    this.draw(this.context, this.sprites[this.state.spriteIndex]);

    !this.checkGroundCollision() ? this.simulateColision() : this.gameOver();
  }

  private handleClick(event: MouseEvent) {
    this.state.gravitySpeed = -7;
  }

  loop() {
    this.interval = setInterval(
      () => this.updateFrame(),
      1000 / this.state.fps
    );
  }

  render() {
    this.draw(this.context, this.sprites[this.state.spriteIndex]);
  }

  start() {
    this.loop();
  }
}

export default Bird;

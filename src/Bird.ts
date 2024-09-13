import { AudioStatus, AudioEffects } from "./AudioEffects";
import { createImage } from "./functions";

interface BirdState {
  fps: number;
  frames: number;
  gravity: number;
  gravitySpeed: number;
  posY: number;
  posX: number;
  spriteIndex: number;
  size: {
    height: number;
    width: number;
  };
}

class Bird {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private sprites: Array<HTMLImageElement>;
  private state: BirdState;
  private interval: any;
  private hitbox: boolean;
  private scale: number;
  private audios: { [key: string]: AudioEffects };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.interval = null;
    this.scale = 1.25;
    this.hitbox = false;
    this.state = {
      frames: 0,
      gravity: 0.3,
      gravitySpeed: -2,
      posY: 100,
      posX: 20,
      spriteIndex: 0,
      fps: 60,
      size: {
        width: 34 * this.scale,
        height: 24 * this.scale,
      },
    };
    this.sprites = [
      createImage("./images/upflap.png"),
      createImage("./images/midflap.png"),
      createImage("./images/downflap.png"),
    ];
    this.audios = {
      wing: new AudioEffects("./audios/wing.wav"),
    };

    this.canvas.addEventListener("click", (event) => this.handleClick(event));
  }

  private showHitBox(context: CanvasRenderingContext2D) {
    context.strokeStyle = "red";
    context.strokeRect(
      this.state.posX,
      this.state.posY,
      this.state.size.width,
      this.state.size.height
    );
  }

  private draw(context: CanvasRenderingContext2D, image: HTMLImageElement) {
    this.hitbox && this.showHitBox(context);

    context.drawImage(
      image,
      this.state.posX,
      this.state.posY,
      this.state.size.width,
      this.state.size.height
    );
  }

  private clearRect() {
    this.context.clearRect(
      this.state.posX,
      this.state.posY,
      this.state.size.width,
      this.state.size.height
    );
  }

  private updateSpriteIndex(frameInterval: number) {
    if (this.state.frames % frameInterval === 0) {
      this.state.spriteIndex =
        (this.state.spriteIndex + 1) % this.sprites.length;
    }
  }

  private checkGroundCollision() {
    return !(this.state.posY <= this.canvas.height - this.state.size.height);
  }

  private simulateGravity() {
    this.state.gravitySpeed += this.state.gravity;
    this.state.posY += this.state.gravitySpeed;
  }

  private gameOver() {
    this.state.posY = this.canvas.height - this.state.size.height;
    clearInterval(this.interval);

    this.updateFrame();
  }

  updateFrame() {
    this.state.frames++;

    this.updateSpriteIndex(8);
    //this.clearRect();
    this.draw(this.context, this.sprites[this.state.spriteIndex]);

    !this.checkGroundCollision() ? this.simulateGravity() : this.gameOver();
  }

  private handleClick(event: MouseEvent) {
    if (this.state.posY <= 0 - this.state.size.height) return;

    this.audios.wing.setStatus(AudioStatus.Play);
    this.state.gravitySpeed = -7;
  }

  loop() {
    this.interval = setInterval(
      () => this.updateFrame(),
      1000 / this.state.fps
    );
  }

  render() {}

  start() {
    this.loop();
  }
}

export default Bird;

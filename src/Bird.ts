import { AudioStatus, AudioEffects } from "./AudioEffects";
import { createImage } from "./functions";
import { GameState } from "./types";

class Bird {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private sprites: Array<HTMLImageElement>;
  public state: {
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
  };
  private scale: number;
  private audios: { [key: string]: AudioEffects };

  constructor(canvas: HTMLCanvasElement, gameState: GameState) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.scale = 1.25;
    this.state = {
      frames: 0,
      gravity: 0.3,
      gravitySpeed: -2,
      posY: 100,
      posX: 20,
      spriteIndex: 0,
      fps: gameState.fps,
      size: {
        width: 34 * this.scale,
        height: 24 * this.scale,
      },
    };
    this.sprites = [
      createImage("./images/sprites/bird/upflap.png"),
      createImage("./images/sprites/bird/midflap.png"),
      createImage("./images/sprites/bird/downflap.png"),
    ];
    this.audios = {
      wing: new AudioEffects("./audios/wing.wav"),
    };

    this.canvas.addEventListener("click", (event) => this.handleClick(event));
  }

  private draw() {
    this.context.drawImage(
      this.sprites[this.state.spriteIndex],
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

  private simulateGravity() {
    this.state.gravitySpeed += this.state.gravity;
    this.state.posY += this.state.gravitySpeed;
  }

  updateFrame() {
    this.state.frames++;

    this.updateSpriteIndex(8);
    this.draw();
    this.simulateGravity();
  }

  setDiePosition() {
    this.state.posY = this.canvas.height - this.state.size.height;
    this.updateFrame();
  }

  private handleClick(event: MouseEvent) {
    this.audios.wing.setStatus(AudioStatus.Play);
    this.state.gravitySpeed = -7;
  }

  render() {
    this.sprites[0].onload = () => this.draw();
  }
}

export default Bird;

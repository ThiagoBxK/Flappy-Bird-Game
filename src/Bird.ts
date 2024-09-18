import { AudioStatus, AudioEffects } from "./AudioEffects";
import { createImage } from "./functions";
import { BirdState, GameState } from "./types";

class Bird {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private sprites: Array<HTMLImageElement>;
  public state: BirdState;

  private audios: { [key: string]: AudioEffects };

  constructor(canvas: HTMLCanvasElement, gameState: GameState) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.state = {
      frames: 0,
      gravity: 0.3,
      gravitySpeed: -2,
      posY: 100,
      posX: 20,
      spriteIndex: 0,
      status: gameState.status,
      fps: gameState.fps,
      size: {
        width: 34 * 1.15,
        height: 24 * 1.15,
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

    this.simulateGravity();
    this.draw();
  }

  handleClick(event: MouseEvent) {
    this.audios.wing.setStatus(AudioStatus.Play);
    this.state.gravitySpeed = -5;
  }

  render() {
    this.draw();
  }
}

export default Bird;

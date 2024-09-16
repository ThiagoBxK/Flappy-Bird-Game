export interface GameState {
  status: string;
  fps: number;
  speed: number;
}

export interface BirdState {
  status: string;
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

export interface ISprite {
  image: HTMLImageElement;
  posX: number;
  posY: number;
}

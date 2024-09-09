class Bird {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private frames: number;
  private gravity: number;
  private gravitySpeed: number;
  private posY: number;
  private scale: number;
  private spriteIndex: number;
  private sprites: Array<HTMLImageElement>;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.frames = 0;
    this.gravity = 0.5;
    this.gravitySpeed = -5;
    this.posY = 0;
    this.scale = 1.25;
    this.spriteIndex = 0;
    this.sprites = [
      this.createImage("./images/upflap.png"),
      this.createImage("./images/midflap.png"),
      this.createImage("./images/downflap.png"),
    ];
  }

  draw(context: CanvasRenderingContext2D, image: HTMLImageElement) {
    context.drawImage(
      image,
      0,
      this.posY,
      image.width * this.scale,
      image.height * this.scale
    );
  }

  createImage(path: string): HTMLImageElement {
    const image = new Image();
    image.src = path;

    return image;
  }

  render() {
    this.draw(this.context, this.sprites[this.spriteIndex]);
  }

  clearRect() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  update() {
    this.frames++;

    if (Boolean(this.frames % 6))
      return requestAnimationFrame(this.update.bind(this));

    if (this.spriteIndex >= this.sprites.length - 1) this.spriteIndex = -1;

    this.gravitySpeed += this.gravity;
    this.posY += this.gravitySpeed;

    this.clearRect();
    this.draw(this.context, this.sprites[++this.spriteIndex]);

    requestAnimationFrame(this.update.bind(this));
  }
}

export default Bird;

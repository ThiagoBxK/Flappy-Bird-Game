export function createImage(path: string): HTMLImageElement {
  const image = new Image();
  image.src = path;

  return image;
}

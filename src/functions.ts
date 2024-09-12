export function createImage(path: string) {
  const image = new Image();
  image.src = path;

  return image;
}

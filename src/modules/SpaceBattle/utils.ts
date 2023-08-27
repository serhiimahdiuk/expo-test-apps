import { Rect } from "./types";

export const randomValueByRange = (a: number, b: number) => {
  let min = a;
  let max = b;
  if (a > b) {
    min = b;
    max = a;
  }
  return min + Math.floor(Math.random() * (max - min + 1));
};

export const detectCollision = (rect1: Rect, rect2: Rect) => {
  if (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y
  )
    return true;
  return false;
};

import { Viewport } from "reactflow";

export const getCenterOnViewPort = ({ x, y }: Viewport) => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const centerX = screenWidth / 2;
  const centerY = screenHeight / 2;

  return {
    x: (x * -1) + centerX,
    y: (y * -1) + centerY
  }
}
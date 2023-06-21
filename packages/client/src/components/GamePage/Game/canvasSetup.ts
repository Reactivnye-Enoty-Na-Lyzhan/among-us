import { CANVAS } from './consts';
export const canvasSetup = (canvas: HTMLCanvasElement) => {
  const dpi = window.devicePixelRatio;
  canvas.width = CANVAS.width;
  canvas.height = CANVAS.height;
  const adaptWidth = canvas.width / dpi;
  const adaptHeight = canvas.height / dpi;
  canvas.style.width = `${adaptWidth}px`;
  canvas.style.height = `${adaptHeight}px`;
  if (dpi >= 2) {
    canvas.style.minWidth = '60vw';
    canvas.style.minHeight = `${
      canvas.height / (canvas.width / (window.innerWidth * 0.6))
    }px`;
  }
};

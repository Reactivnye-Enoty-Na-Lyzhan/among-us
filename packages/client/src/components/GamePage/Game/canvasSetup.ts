import { CANVAS } from './consts';
export const canvasSetup = (canvas: HTMLCanvasElement) => {
  const dpi = window.devicePixelRatio;
  canvas.width = CANVAS.width;
  canvas.height = CANVAS.height;
  const adaptWidth = canvas.width / dpi;
  const adaptHeight = canvas.height / dpi;
  canvas.style.width = `${adaptWidth}px`;
  canvas.style.height = `${adaptHeight}px`;
};

import * as THREE from 'three';

export const LCD_BEZEL_PX = 4;
export const LCD_PIXEL_COLS = 10;
export const LCD_PIXEL_ROWS = 10;

export const SMILEY_PIXELS: [number, number][] = [
  [3, 7],
  [4, 7],
  [6, 7],
  [7, 7],
  [2, 3],
  [7, 3],
  [3, 2],
  [4, 2],
  [5, 2],
  [6, 2],
];

export function drawLcdPanel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  flash: number,
) {
  if (flash > 0) {
    const tone = Math.round(210 + 45 * flash);
    ctx.fillStyle = `rgb(${tone}, ${tone}, 255)`;
    ctx.fillRect(x, y, w, h);
    return;
  }

  const gradient = ctx.createRadialGradient(x + w * 0.5, y + h * 0.48, 0, x + w * 0.5, y + h * 0.5, w * 0.72);
  gradient.addColorStop(0, '#2f6ef2');
  gradient.addColorStop(0.55, '#1a4fd4');
  gradient.addColorStop(1, '#0d2f96');
  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, w, h);
}

export function drawLcdGrid(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  const cellW = w / LCD_PIXEL_COLS;
  const cellH = h / LCD_PIXEL_ROWS;

  ctx.strokeStyle = 'rgba(6, 18, 90, 0.3)';
  ctx.lineWidth = 1;

  for (let col = 1; col < LCD_PIXEL_COLS; col++) {
    const px = x + col * cellW + 0.5;
    ctx.beginPath();
    ctx.moveTo(px, y);
    ctx.lineTo(px, y + h);
    ctx.stroke();
  }

  for (let row = 1; row < LCD_PIXEL_ROWS; row++) {
    const py = y + row * cellH + 0.5;
    ctx.beginPath();
    ctx.moveTo(x, py);
    ctx.lineTo(x + w, py);
    ctx.stroke();
  }
}

export function drawOledFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  bootT: number,
  scrollBoost = 0,
) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#060606';
  ctx.fillRect(0, 0, width, height);

  const panelX = LCD_BEZEL_PX;
  const panelY = LCD_BEZEL_PX;
  const panelW = width - LCD_BEZEL_PX * 2;
  const panelH = height - LCD_BEZEL_PX * 2;
  const pixelW = panelW / LCD_PIXEL_COLS;
  const pixelH = panelH / LCD_PIXEL_ROWS;

  let flash = 0;
  let smileyAlpha = 0;

  if (bootT < 0.18) {
    ctx.fillStyle = '#010308';
    ctx.fillRect(panelX, panelY, panelW, panelH);
    return;
  }
  if (bootT < 0.34) {
    flash = 1;
  } else if (bootT < 0.44) {
    flash = 0;
  } else if (bootT < 0.54) {
    flash = 0.6;
  } else if (bootT < 0.64) {
    flash = 0;
  } else if (bootT < 1.05) {
    smileyAlpha = THREE.MathUtils.smoothstep(0.64, 1.05, bootT);
  } else {
    smileyAlpha = 1;
  }

  drawLcdPanel(ctx, panelX, panelY, panelW, panelH, flash);

  if (flash === 0) {
    drawLcdGrid(ctx, panelX, panelY, panelW, panelH);
  }

  if (smileyAlpha > 0) {
    const glow = 0.88 + scrollBoost * 0.12;
    ctx.fillStyle = `rgba(238, 246, 255, ${smileyAlpha * glow})`;
    for (const [col, row] of SMILEY_PIXELS) {
      const px = panelX + col * pixelW + 1;
      const py = panelY + (LCD_PIXEL_ROWS - 1 - row) * pixelH + 1;
      ctx.fillRect(px, py, pixelW - 2, pixelH - 2);
    }
  }
}

export function progressToBootT(progress: number) {
  const eased = progress / 100;
  return eased * eased * (3 - 2 * eased) * 1.12;
}

export function createLcdTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 96;
  canvas.height = 96;
  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    drawOledFrame(ctx, canvas.width, canvas.height, 0, 0);
    texture.needsUpdate = true;
  }
  return { canvas, texture };
}

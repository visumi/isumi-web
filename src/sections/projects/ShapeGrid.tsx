import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

function ShapeGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const cellSize = 42;
    const pointer = { x: -1000, y: -1000 };
    const gridTile = document.createElement('canvas');
    gridTile.width = cellSize;
    gridTile.height = cellSize;
    const tileContext = gridTile.getContext('2d');
    if (!tileContext) return;
    tileContext.strokeStyle = 'rgba(63, 63, 70, 0.58)';
    tileContext.lineWidth = 1;
    tileContext.strokeRect(0.5, 0.5, cellSize, cellSize);
    const gridPattern = context.createPattern(gridTile, 'repeat');
    if (!gridPattern) return;
    let frame = 0;
    let animationFrame = 0;
    let bounds = canvas.getBoundingClientRect();

    const resize = () => {
      bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.ceil(bounds.width * ratio);
      canvas.height = Math.ceil(bounds.height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      context.clearRect(0, 0, bounds.width, bounds.height);
      const drift = reduced ? 0 : (frame * 0.12) % cellSize;
      context.save();
      context.translate(drift, drift);
      context.fillStyle = gridPattern;
      context.fillRect(-cellSize, -cellSize, bounds.width + cellSize * 2, bounds.height + cellSize * 2);
      context.restore();

      const hoveredColumn = Math.floor((pointer.x - drift) / cellSize);
      const hoveredRow = Math.floor((pointer.y - drift) / cellSize);
      for (let offsetX = -2; offsetX <= 2; offsetX += 1) {
        for (let offsetY = -2; offsetY <= 2; offsetY += 1) {
          const x = (hoveredColumn + offsetX) * cellSize + drift;
          const y = (hoveredRow + offsetY) * cellSize + drift;
          const distance = Math.hypot(pointer.x - (x + cellSize / 2), pointer.y - (y + cellSize / 2));
          const intensity = Math.max(0, 1 - distance / 150);
          if (intensity <= 0.02) continue;

          context.fillStyle = `rgba(244, 244, 245, ${intensity * 0.12})`;
          context.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
          context.strokeStyle = `rgba(244, 244, 245, ${0.12 + intensity * 0.55})`;
          context.strokeRect(Math.round(x) + 0.5, Math.round(y) + 0.5, cellSize, cellSize);
        }
      }

      if (!reduced) {
        frame += 1;
        animationFrame = requestAnimationFrame(draw);
      }
    };

    const move = (event: PointerEvent) => {
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
    };
    const leave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerleave', leave);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerleave', leave);
      cancelAnimationFrame(animationFrame);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="h-full w-full [contain:paint]" aria-hidden="true" />;
}

export { ShapeGrid };

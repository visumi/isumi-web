import { useEffect, useRef } from 'react';

type ShapeGridProps = {
  animated?: boolean;
  borderColor?: string;
  hoverFillColor?: string;
  hoverTrailAmount?: number;
  speed?: number;
  squareSize?: number;
};

export default function ShapeGrid({
  animated = true,
  borderColor = '#3f3f46',
  hoverFillColor = '#27272a',
  hoverTrailAmount = 4,
  speed = 0.16,
  squareSize = 44,
}: ShapeGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let frame = 0;
    let offset = 0;
    let hovered: { x: number; y: number } | null = null;
    let trail: { x: number; y: number }[] = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.offsetWidth * ratio);
      canvas.height = Math.round(canvas.offsetHeight * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      context.clearRect(0, 0, width, height);
      const start = -squareSize + (offset % squareSize);

      for (let x = start; x < width + squareSize; x += squareSize) {
        for (let y = start; y < height + squareSize; y += squareSize) {
          const cellX = Math.floor((x - start) / squareSize);
          const cellY = Math.floor((y - start) / squareSize);
          const isHovered = hovered?.x === cellX && hovered?.y === cellY;
          const trailIndex = trail.findIndex((cell) => cell.x === cellX && cell.y === cellY);

          if (isHovered || trailIndex >= 0) {
            context.globalAlpha = isHovered ? 0.8 : (trail.length - trailIndex) / (trail.length + 2);
            context.fillStyle = hoverFillColor;
            context.fillRect(x, y, squareSize, squareSize);
            context.globalAlpha = 1;
          }

          context.strokeStyle = borderColor;
          context.lineWidth = 1;
          context.strokeRect(x + 0.5, y + 0.5, squareSize, squareSize);
        }
      }

      const vignette = context.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) * 0.72);
      vignette.addColorStop(0, 'rgba(9, 9, 11, 0)');
      vignette.addColorStop(1, 'rgba(9, 9, 11, 0.92)');
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);
    };

    const animate = () => {
      offset = (offset + speed) % squareSize;
      draw();
      frame = window.requestAnimationFrame(animate);
    };

    const updateHover = (event: MouseEvent) => {
      const bounds = canvas.getBoundingClientRect();
      const x = Math.floor((event.clientX - bounds.left - (offset % squareSize)) / squareSize);
      const y = Math.floor((event.clientY - bounds.top - (offset % squareSize)) / squareSize);
      if (hovered?.x !== x || hovered?.y !== y) {
        if (hovered) trail = [hovered, ...trail].slice(0, hoverTrailAmount);
        hovered = { x, y };
      }
    };

    const clearHover = () => {
      if (hovered) trail = [hovered, ...trail].slice(0, hoverTrailAmount);
      hovered = null;
      draw();
    };

    resize();
    draw();
    if (animated) frame = window.requestAnimationFrame(animate);
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', updateHover);
    canvas.addEventListener('mouseleave', clearHover);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', updateHover);
      canvas.removeEventListener('mouseleave', clearHover);
    };
  }, [animated, borderColor, hoverFillColor, hoverTrailAmount, speed, squareSize]);

  return <canvas ref={canvasRef} className="block size-full" aria-hidden="true" />;
}

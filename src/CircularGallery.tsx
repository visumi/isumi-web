import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';

type GalleryProject = {
  description: string;
  meta: string;
  title: string;
};

type CircularGalleryProps = {
  items: readonly GalleryProject[];
  reducedMotion?: boolean;
};

type GalleryViewport = { height: number; width: number };

const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;

function drawLines(context: CanvasRenderingContext2D, value: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = value.split(' ');
  let line = '';
  let lineY = y;

  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (context.measureText(candidate).width > maxWidth && line) {
      context.fillText(line, x, lineY);
      line = word;
      lineY += lineHeight;
      return;
    }
    line = candidate;
  });

  if (line) context.fillText(line, x, lineY);
}

function createCardTexture(gl: Renderer['gl'], project: GalleryProject, index: number) {
  const canvas = document.createElement('canvas');
  canvas.width = 760;
  canvas.height = 940;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Não foi possível criar o cartão da galeria.');

  context.fillStyle = '#18181b';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = '#a1a1aa';
  context.lineWidth = 3;
  context.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
  context.fillStyle = '#f4f4f5';
  context.fillRect(46, 46, 20, 20);
  context.fillStyle = '#71717a';
  context.font = '700 22px "Space Mono", monospace';
  context.fillText(`0${index + 1} / SELECTED WORK`, 92, 65);
  context.fillStyle = '#f4f4f5';
  context.font = '700 56px "Space Mono", monospace';
  drawLines(context, project.title.toUpperCase(), 46, 205, 668, 68);
  context.fillStyle = '#d4d4d8';
  context.font = '400 28px "Space Mono", monospace';
  drawLines(context, project.description, 46, 468, 668, 42);
  context.fillStyle = '#52525b';
  context.fillRect(46, 788, 668, 2);
  context.fillStyle = '#a1a1aa';
  context.font = '700 20px "Space Mono", monospace';
  drawLines(context, project.meta.toUpperCase(), 46, 844, 668, 30);

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return texture;
}

class GalleryCard {
  private extra = 0;
  private readonly mesh: Mesh;
  private readonly program: Program;
  private readonly index: number;
  private readonly length: number;
  private readonly scene: Transform;
  private viewport: GalleryViewport;
  private screen: GalleryViewport;
  private width = 0;
  private widthTotal = 0;
  private x = 0;

  constructor(
    gl: Renderer['gl'],
    scene: Transform,
    project: GalleryProject,
    index: number,
    displayIndex: number,
    length: number,
    screen: GalleryViewport,
    viewport: GalleryViewport,
  ) {
    this.index = index;
    this.length = length;
    this.scene = scene;
    this.screen = screen;
    this.viewport = viewport;
    const texture = createCardTexture(gl, project, displayIndex);
    this.program = new Program(gl, {
      depthTest: false,
      depthWrite: false,
      transparent: true,
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
    });
    this.mesh = new Mesh(gl, { geometry: new Plane(gl), program: this.program });
    this.mesh.setParent(scene);
    this.resize(screen, viewport);
  }

  resize(screen: GalleryViewport, viewport: GalleryViewport) {
    this.screen = screen;
    this.viewport = viewport;
    const height = viewport.height * 0.76;
    this.mesh.scale.y = height;
    this.mesh.scale.x = height * 0.74;
    this.width = this.mesh.scale.x + viewport.width * 0.1;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }

  update(current: number, last: number) {
    this.mesh.position.x = this.x - current - this.extra;
    const halfViewport = this.viewport.width / 2;
    const x = this.mesh.position.x;
    const radius = (halfViewport * halfViewport + 1.55 * 1.55) / (2 * 1.55);
    const effectiveX = Math.min(Math.abs(x), halfViewport);
    const arc = radius - Math.sqrt(radius * radius - effectiveX * effectiveX);
    this.mesh.position.y = -arc;
    this.mesh.rotation.z = -Math.sign(x) * Math.asin(effectiveX / radius);

    const halfCard = this.mesh.scale.x / 2;
    if (current > last && this.mesh.position.x + halfCard < -halfViewport) this.extra -= this.widthTotal;
    if (current < last && this.mesh.position.x - halfCard > halfViewport) this.extra += this.widthTotal;
  }
}

class GalleryApp {
  private readonly camera: Camera;
  private readonly cards: GalleryCard[];
  private readonly container: HTMLElement;
  private readonly renderer: Renderer;
  private readonly scene = new Transform();
  private readonly reducedMotion: boolean;
  private frame = 0;
  private isPointerDown = false;
  private pointerStart = 0;
  private pointerScrollStart = 0;
  private scroll = { current: 0, last: 0, target: 0 };
  private screen: GalleryViewport = { height: 0, width: 0 };
  private viewport: GalleryViewport = { height: 0, width: 0 };

  constructor(container: HTMLElement, items: readonly GalleryProject[], reducedMotion: boolean) {
    this.container = container;
    this.reducedMotion = reducedMotion;
    this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) });
    this.camera = new Camera(this.renderer.gl, { fov: 45 });
    this.camera.position.z = 20;
    container.appendChild(this.renderer.gl.canvas as HTMLCanvasElement);
    this.resize();
    this.cards = items
      .concat(items)
      .map((project, index, all) => new GalleryCard(this.renderer.gl, this.scene, project, index, index % items.length, all.length, this.screen, this.viewport));
    this.addListeners();
    this.render();
  }

  private resize = () => {
    this.screen = { height: this.container.clientHeight, width: this.container.clientWidth };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });
    const fov = (this.camera.fov * Math.PI) / 180;
    this.viewport = { height: 2 * Math.tan(fov / 2) * this.camera.position.z, width: 0 };
    this.viewport.width = this.viewport.height * this.camera.aspect;
    this.cards?.forEach((card) => card.resize(this.screen, this.viewport));
  };

  private wheel = (event: WheelEvent) => {
    event.preventDefault();
    event.stopPropagation();
    this.scroll.target += event.deltaY * 0.008;
  };

  private pointerDown = (event: PointerEvent) => {
    this.isPointerDown = true;
    this.pointerStart = event.clientX;
    this.pointerScrollStart = this.scroll.current;
    this.container.setPointerCapture?.(event.pointerId);
  };

  private pointerMove = (event: PointerEvent) => {
    if (!this.isPointerDown) return;
    event.preventDefault();
    event.stopPropagation();
    this.scroll.target = this.pointerScrollStart + (this.pointerStart - event.clientX) * 0.018;
  };

  private pointerUp = () => {
    this.isPointerDown = false;
  };

  private keyDown = (event: KeyboardEvent) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    event.stopPropagation();
    this.scroll.target += event.key === 'ArrowRight' ? 1.5 : -1.5;
  };

  private addListeners() {
    window.addEventListener('resize', this.resize);
    this.container.addEventListener('wheel', this.wheel, { passive: false });
    this.container.addEventListener('pointerdown', this.pointerDown);
    this.container.addEventListener('pointermove', this.pointerMove);
    this.container.addEventListener('pointerup', this.pointerUp);
    this.container.addEventListener('pointercancel', this.pointerUp);
    this.container.addEventListener('keydown', this.keyDown);
  }

  private render = () => {
    this.scroll.current = this.reducedMotion ? this.scroll.target : lerp(this.scroll.current, this.scroll.target, 0.09);
    this.cards.forEach((card) => card.update(this.scroll.current, this.scroll.last));
    this.renderer.render({ camera: this.camera, scene: this.scene });
    this.scroll.last = this.scroll.current;
    if (!this.reducedMotion) this.frame = window.requestAnimationFrame(this.render);
  };

  destroy() {
    window.cancelAnimationFrame(this.frame);
    window.removeEventListener('resize', this.resize);
    this.container.removeEventListener('wheel', this.wheel);
    this.container.removeEventListener('pointerdown', this.pointerDown);
    this.container.removeEventListener('pointermove', this.pointerMove);
    this.container.removeEventListener('pointerup', this.pointerUp);
    this.container.removeEventListener('pointercancel', this.pointerUp);
    this.container.removeEventListener('keydown', this.keyDown);
    this.renderer.gl.canvas.remove();
  }
}

export default function CircularGallery({ items, reducedMotion = false }: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const app = new GalleryApp(containerRef.current, items, reducedMotion);
    return () => app.destroy();
  }, [items, reducedMotion]);

  return <div ref={containerRef} className="size-full cursor-grab touch-pan-y overflow-hidden active:cursor-grabbing" role="region" tabIndex={0} aria-label="Galeria circular de projetos. Use as setas esquerda e direita para navegar." />;
}

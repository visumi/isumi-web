import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
uniform float uTime;
uniform float uEnableWaves;

void main() {
  vUv = uv;
  float time = uTime * 5.0;
  float waveFactor = uEnableWaves;
  vec3 transformed = position;

  transformed.x += sin(time + position.y) * 0.5 * waveFactor;
  transformed.y += cos(time + position.z) * 0.15 * waveFactor;
  transformed.z += sin(time + position.x) * waveFactor;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform float uTime;
uniform sampler2D uTexture;

void main() {
  float time = uTime;
  vec2 pos = vUv;
  float r = texture2D(uTexture, pos + cos(time + pos.x) * 0.008).r;
  float g = texture2D(uTexture, pos + sin(time * 0.7 + pos.x) * 0.006).g;
  float b = texture2D(uTexture, pos - cos(time + pos.y) * 0.008).b;
  float a = texture2D(uTexture, pos).a;
  gl_FragColor = vec4(r, g, b, a);
}
`;

function mapRange(n: number, start: number, stop: number, start2: number, stop2: number) {
  return ((n - start) / (stop - start)) * (stop2 - start2) + start2;
}

interface AsciiFilterOptions {
  fontSize: number;
  fontFamily: string;
  charset: string;
  invert: boolean;
}

class AsciiFilter {
  renderer: THREE.WebGLRenderer;
  domElement: HTMLDivElement;
  pre: HTMLPreElement;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
  fontSize: number;
  fontFamily: string;
  charset: string;
  invert: boolean;
  width = 0;
  height = 0;
  cols = 0;
  rows = 0;

  constructor(renderer: THREE.WebGLRenderer, { fontSize, fontFamily, charset, invert }: AsciiFilterOptions) {
    this.renderer = renderer;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.charset = charset;
    this.invert = invert;

    this.domElement = document.createElement('div');
    this.domElement.className = 'ascii-text-layer';
    this.domElement.style.position = 'absolute';
    this.domElement.style.inset = '0';
    this.domElement.style.overflow = 'hidden';

    this.pre = document.createElement('pre');
    this.domElement.appendChild(this.pre);

    this.canvas = document.createElement('canvas');
    this.canvas.style.display = 'none';
    this.context = this.canvas.getContext('2d', { willReadFrequently: true });
    this.domElement.appendChild(this.canvas);

    if (this.context) {
      this.context.imageSmoothingEnabled = false;
    }
  }

  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.renderer.setSize(width, height);
    this.reset();
  }

  reset() {
    if (!this.context) return;

    this.context.font = `${this.fontSize}px ${this.fontFamily}`;
    const charWidth = Math.max(this.context.measureText('A').width, 1);

    this.cols = Math.max(1, Math.floor(this.width / charWidth));
    this.rows = Math.max(1, Math.floor(this.height / this.fontSize));
    this.canvas.width = this.cols;
    this.canvas.height = this.rows;

    this.pre.style.position = 'absolute';
    this.pre.style.left = '50%';
    this.pre.style.top = '50%';
    this.pre.style.transform = 'translate(-50%, -50%)';
    this.pre.style.margin = '0';
    this.pre.style.padding = '0';
    this.pre.style.fontFamily = this.fontFamily;
    this.pre.style.fontSize = `${this.fontSize}px`;
    this.pre.style.lineHeight = '1em';
    this.pre.style.letterSpacing = '0';
    this.pre.style.color = '#f4f4f5';
    this.pre.style.background = 'transparent';
    this.pre.style.userSelect = 'none';
    this.pre.style.pointerEvents = 'none';
    this.pre.style.textAlign = 'left';
    this.pre.style.whiteSpace = 'pre';
  }

  render(scene: THREE.Scene, camera: THREE.Camera) {
    this.renderer.render(scene, camera);
    const w = this.canvas.width;
    const h = this.canvas.height;

    if (!this.context || !w || !h) return;

    this.context.clearRect(0, 0, w, h);
    this.context.drawImage(this.renderer.domElement, 0, 0, w, h);
    this.asciify(this.context, w, h);
  }

  asciify(ctx: CanvasRenderingContext2D, w: number, h: number) {
    const imgData = ctx.getImageData(0, 0, w, h).data;
    let output = '';

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const index = x * 4 + y * 4 * w;
        const [r, g, b, a] = [imgData[index], imgData[index + 1], imgData[index + 2], imgData[index + 3]];

        if (a === 0) {
          output += ' ';
          continue;
        }

        const gray = (0.3 * r + 0.6 * g + 0.1 * b) / 255;
        let charIndex = Math.floor((1 - gray) * (this.charset.length - 1));
        if (this.invert) charIndex = this.charset.length - charIndex - 1;
        output += this.charset[charIndex];
      }
      output += '\n';
    }

    this.pre.textContent = output;
  }
}

class CanvasText {
  canvas = document.createElement('canvas');
  context = this.canvas.getContext('2d');

  constructor(
    private text: string,
    private fontSize: number,
    private fontFamily: string,
    private color: string,
  ) {}

  resize() {
    if (!this.context) return;

    this.context.font = `700 ${this.fontSize}px ${this.fontFamily}`;
    const metrics = this.context.measureText(this.text);
    this.canvas.width = Math.ceil(metrics.width) + 40;
    this.canvas.height = Math.ceil(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) + 40;
  }

  render() {
    if (!this.context) return;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = this.color;
    this.context.font = `700 ${this.fontSize}px ${this.fontFamily}`;
    this.context.textBaseline = 'alphabetic';

    const metrics = this.context.measureText(this.text);
    this.context.fillText(this.text, 20, 20 + metrics.actualBoundingBoxAscent);
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }
}

interface CanvAsciiOptions {
  text: string;
  asciiFontSize: number;
  textFontSize: number;
  textColor: string;
  planeBaseHeight: number;
  enableWaves: boolean;
}

class CanvAscii {
  camera: THREE.PerspectiveCamera;
  scene = new THREE.Scene();
  mouse: { x: number; y: number };
  center: { x: number; y: number };
  textCanvas!: CanvasText;
  texture!: THREE.CanvasTexture;
  geometry!: THREE.PlaneGeometry;
  material!: THREE.ShaderMaterial;
  mesh!: THREE.Mesh;
  renderer!: THREE.WebGLRenderer;
  filter!: AsciiFilter;
  animationFrameId = 0;

  constructor(
    private options: CanvAsciiOptions,
    private container: HTMLElement,
    private width: number,
    private height: number,
  ) {
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    this.camera.position.z = 30;
    this.mouse = { x: width / 2, y: height / 2 };
    this.center = { x: width / 2, y: height / 2 };
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  async init() {
    await document.fonts.ready;
    this.setMesh();
    this.setRenderer();
  }

  setMesh() {
    this.textCanvas = new CanvasText(
      this.options.text,
      this.options.textFontSize,
      '"Space Mono", "Noto Sans CJK JP", "Segoe UI Symbol", monospace',
      this.options.textColor,
    );
    this.textCanvas.resize();
    this.textCanvas.render();

    this.texture = new THREE.CanvasTexture(this.textCanvas.canvas);
    this.texture.minFilter = THREE.NearestFilter;

    const textAspect = this.textCanvas.width / this.textCanvas.height;
    const planeH = this.options.planeBaseHeight;
    const planeW = planeH * textAspect;

    this.geometry = new THREE.PlaneGeometry(planeW, planeH, 36, 36);
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: this.texture },
        uEnableWaves: { value: this.options.enableWaves ? 1 : 0 },
      },
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    this.renderer.setPixelRatio(1);
    this.renderer.setClearColor(0x000000, 0);

    this.filter = new AsciiFilter(this.renderer, {
      fontFamily: '"Space Mono", Consolas, monospace',
      fontSize: this.options.asciiFontSize,
      charset: ' .:-=+*#%@',
      invert: true,
    });

    this.container.appendChild(this.filter.domElement);
    this.container.addEventListener('mousemove', this.onMouseMove);
    this.container.addEventListener('touchmove', this.onMouseMove);
    this.setSize(this.width, this.height);
  }

  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.center = { x: width / 2, y: height / 2 };
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.filter.setSize(width, height);
  }

  load() {
    this.animate();
  }

  onMouseMove(event: MouseEvent | TouchEvent) {
    const pointer = 'touches' in event ? event.touches[0] : event;
    if (!pointer) return;

    const bounds = this.container.getBoundingClientRect();
    this.mouse = {
      x: pointer.clientX - bounds.left,
      y: pointer.clientY - bounds.top,
    };
  }

  animate() {
    const animateFrame = () => {
      this.animationFrameId = requestAnimationFrame(animateFrame);
      this.render();
    };
    animateFrame();
  }

  render() {
    const time = Date.now() * 0.001;

    this.textCanvas.render();
    this.texture.needsUpdate = true;
    this.material.uniforms.uTime.value = Math.sin(time);
    this.updateRotation();
    this.filter.render(this.scene, this.camera);
  }

  updateRotation() {
    const x = mapRange(this.mouse.y, 0, this.height, 0.45, -0.45);
    const y = mapRange(this.mouse.x, 0, this.width, -0.45, 0.45);
    this.mesh.rotation.x += (x - this.mesh.rotation.x) * 0.05;
    this.mesh.rotation.y += (y - this.mesh.rotation.y) * 0.05;
  }

  dispose() {
    cancelAnimationFrame(this.animationFrameId);
    this.container.removeEventListener('mousemove', this.onMouseMove);
    this.container.removeEventListener('touchmove', this.onMouseMove);

    if (this.filter?.domElement.parentNode) {
      this.container.removeChild(this.filter.domElement);
    }

    this.geometry?.dispose();
    this.material?.dispose();
    this.texture?.dispose();
    this.renderer?.dispose();
    this.renderer?.forceContextLoss();
  }
}

interface ASCIITextProps {
  text?: string;
  asciiFontSize?: number;
  textFontSize?: number;
  textColor?: string;
  planeBaseHeight?: number;
  enableWaves?: boolean;
  className?: string;
}

export default function ASCIIText({
  text = String.fromCharCode(0x6cc9),
  asciiFontSize = 7,
  textFontSize = 260,
  textColor = '#f4f4f5',
  planeBaseHeight = 9,
  enableWaves = true,
  className = '',
}: ASCIITextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const asciiRef = useRef<CanvAscii | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;

    const setup = async () => {
      const container = containerRef.current;
      if (!container) return;

      const { width, height } = container.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      const instance = new CanvAscii(
        { text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves },
        container,
        width,
        height,
      );

      await instance.init();
      if (cancelled) {
        instance.dispose();
        return;
      }

      asciiRef.current = instance;
      instance.load();

      resizeObserver = new ResizeObserver(([entry]) => {
        if (!entry || !asciiRef.current) return;
        const { width: nextWidth, height: nextHeight } = entry.contentRect;
        if (nextWidth > 0 && nextHeight > 0) {
          asciiRef.current.setSize(nextWidth, nextHeight);
        }
      });
      resizeObserver.observe(container);
    };

    setup();

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      asciiRef.current?.dispose();
      asciiRef.current = null;
    };
  }, [text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves]);

  return (
    <div
      ref={containerRef}
      className={`relative h-[min(64vh,560px)] w-[clamp(300px,31vw,420px)] ${className}`}
    />
  );
}

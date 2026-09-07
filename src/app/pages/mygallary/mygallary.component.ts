// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-mygallary',
//   imports: [],
//   templateUrl: './mygallary.component.html',
//   styleUrl: './mygallary.component.css'
// })
// export class MygallaryComponent {

// }


import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';

export const GALLERY_IMAGES: string[] = [
'https://images.unsplash.com/photo-1788765443020-d220dd0d7fb6?w=100', 
'https://images.unsplash.com/photo-1788765443042-f6733db71867?w=100', 
'https://images.unsplash.com/photo-1788765595930-e641446105ae?w=100', 
'https://images.unsplash.com/photo-1788765442179-294dae4a4a70?w=100', 
'https://images.unsplash.com/photo-1788765442456-4eb909e384a8?w=100', 
'https://images.unsplash.com/photo-1788765442127-7052aef918c9?w=100', 
'https://images.unsplash.com/photo-1788765518350-036f8eb054d8?w=100', 
'https://images.unsplash.com/photo-1788765442711-b248a11b37b5?w=100', 
'https://images.unsplash.com/photo-1788765443218-4054064e9357?w=100', 
'https://images.unsplash.com/photo-1788765652681-e7e2eb2ae3b3?w=100', 
'https://images.unsplash.com/photo-1788765442246-e1dcfefd8f98?w=100', 
'https://images.unsplash.com/photo-1788765551090-1c9db36de09d?w=100', 
'https://images.unsplash.com/photo-1788765125754-946a1a5c7e56?w=100', 
'https://images.unsplash.com/photo-1788765126297-cee477af35ce?w=100', 
'https://images.unsplash.com/photo-1788765126734-595ab9c5acea?w=100', 
'https://images.unsplash.com/photo-1788765125283-931a460bcb0e?w=100', 
'https://images.unsplash.com/photo-1788765127711-f0e1b35c2213?w=100', 
'https://images.unsplash.com/photo-1788765125289-697b01da3083?w=100', 
'https://images.unsplash.com/photo-1788765125672-02307575ada0?w=100', 
'https://images.unsplash.com/photo-1788765127107-04db0d830f64?w=100', 
'https://images.unsplash.com/photo-1788765126043-dc7bb57d5dc3?w=100', 
'https://images.unsplash.com/photo-1788765125357-67754ba3cdbb?w=100', 
'https://images.unsplash.com/photo-1788765126200-a5aa8e302826?w=100', 
'https://images.unsplash.com/photo-1788765126463-ec9930337433?w=100', 
'https://images.unsplash.com/photo-1788765125317-2c84d28ea15f?w=100', 
'https://images.unsplash.com/photo-1788765126940-bf4301492f90?w=100', 
'https://images.unsplash.com/photo-1788765127802-dc48e954fcd3?w=100', 
'https://images.unsplash.com/photo-1788765125963-0c44c3b5cd1d?w=100', 
'https://images.unsplash.com/photo-1788765125741-7f19f18c321a?w=100', 
'https://images.unsplash.com/photo-1788765125964-74d7667fcd9a?w=100', 
'https://images.unsplash.com/photo-1788765126495-9afb17148b92?w=100', 
'https://images.unsplash.com/photo-1788765126393-4a22e8b98ec3?w=100', 
'https://images.unsplash.com/photo-1788765125330-092bb06bdf03?w=100', 
'https://images.unsplash.com/photo-1788765125808-f6adcfc197e1?w=100', 
'https://images.unsplash.com/photo-1788765125898-17a81818a9dd?w=100', 
'https://images.unsplash.com/photo-1788765126074-96f1f00b2a83?w=100', 
'https://images.unsplash.com/photo-1788765126380-411f92f9e3ee?w=100', 
'https://images.unsplash.com/photo-1788765126374-4063742b7a52?w=100', 
'https://images.unsplash.com/photo-1788765126134-f8fe7ca7c1f8?w=100', 
'https://images.unsplash.com/photo-1788765125535-23454714ade9?w=100', 
'https://images.unsplash.com/photo-1788765126072-888166e45937?w=100', 
'https://images.unsplash.com/photo-1788765126411-de89dbad9236?w=100',
'https://images.unsplash.com/photo-1788773549344-59f857e74f3e?w=100',
'https://images.unsplash.com/photo-1788773845432-2ff2f660a6c3?w=100',
'https://images.unsplash.com/photo-1788773977236-169f8230084a?w=100',
'https://images.unsplash.com/photo-1788773845092-3b601ad7335c?w=100',
'https://images.unsplash.com/photo-1788773845734-c506f9d2021d?w=100',
'https://images.unsplash.com/photo-1788773977141-23c96b32696b?w=100',
'https://images.unsplash.com/photo-1788773845028-4795dfb4b8a2?w=100',
'https://images.unsplash.com/photo-1788773845219-dfcead9108b3?w=100',
'https://images.unsplash.com/photo-1788773549782-6674802baa16?w=100',
'https://images.unsplash.com/photo-1788773845199-92a8e330b736?w=100',
'https://images.unsplash.com/photo-1788773845137-7a7d6aad9e5a?w=100',
'https://images.unsplash.com/photo-1788773845048-ee3875db0652?w=100',
'https://images.unsplash.com/photo-1788773977205-f90b330cb9d2?w=100',
];

export interface InfiniteGalleryOptions {
  canvas: HTMLCanvasElement;
  images: string[];
  onProgress?: (percent: number) => void;
  onReady?: () => void;
}

/**
 * Ported 1:1 from the original script.js `InfinitePortraitGallery` class.
 * Only structural changes: the canvas is now passed in (owned by the Angular
 * template) instead of being created/appended by this class, and every
 * addEventListener has a matching removeEventListener wired up through
 * destroy() so Angular can tear it down cleanly in ngOnDestroy.
 */
export class InfiniteGalleryRenderer {
  private gl: WebGLRenderingContext | null;
  private canvas: HTMLCanvasElement;

  private images: HTMLImageElement[] = [];
  private textures: WebGLTexture[] = [];
  private imageMetaData: { width: number; height: number; aspectRatio: number }[] = [];
  private layoutPositions: { x: number; y: number; width: number; height: number }[] = [];

  private targetRowWidth = 800;
  private itemsPerRow = 5;

  private gridWidth = 0;
  private gridHeight = 0;

  private autoSpeedX = 0.6;
  private autoSpeedY = 0.4;

  private viewOffset = { x: 0, y: 0 };
  private drag = {
    isDragging: false,
    lastX: 0,
    lastY: 0,
    velocityX: 0,
    velocityY: 0
  };

  private inertia = 0.95;
  private bulgeStrength = 0.6;
  private bulgeRadius = 1.5;
  private adjustedBulgeRadius = this.bulgeRadius;

  private program: WebGLProgram | null = null;
  private indexCount = 0;
  private positionBuffer: WebGLBuffer | null = null;
  private texCoordBuffer: WebGLBuffer | null = null;
  private indexBuffer: WebGLBuffer | null = null;

  private rafId: number | null = null;
  private destroyed = false;

  // bound handlers, stored so they can be removed in destroy()
  private onResize = () => this.resizeCanvas();
  private onMouseDown = (e: MouseEvent) => {
    this.drag.isDragging = true;
    this.drag.lastX = e.clientX;
    this.drag.lastY = e.clientY;
  };
  private onMouseMove = (e: MouseEvent) => {
    if (!this.drag.isDragging) return;
    const deltaX = e.clientX - this.drag.lastX;
    const deltaY = e.clientY - this.drag.lastY;
    this.drag.velocityX = 0.3 * deltaX + 0.7 * this.drag.velocityX;
    this.drag.velocityY = 0.3 * deltaY + 0.7 * this.drag.velocityY;
    this.viewOffset.x -= this.drag.velocityX;
    this.viewOffset.y -= this.drag.velocityY;
    this.drag.lastX = e.clientX;
    this.drag.lastY = e.clientY;
  };
  private onMouseUp = () => { this.drag.isDragging = false; };
  private onTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    this.drag.isDragging = true;
    this.drag.lastX = e.touches[0].clientX;
    this.drag.lastY = e.touches[0].clientY;
  };
  private onTouchMove = (e: TouchEvent) => {
    if (!this.drag.isDragging) return;
    e.preventDefault();
    const deltaX = e.touches[0].clientX - this.drag.lastX;
    const deltaY = e.touches[0].clientY - this.drag.lastY;
    this.drag.velocityX = 0.3 * deltaX + 0.7 * this.drag.velocityX;
    this.drag.velocityY = 0.3 * deltaY + 0.7 * this.drag.velocityY;
    this.viewOffset.x -= this.drag.velocityX;
    this.viewOffset.y -= this.drag.velocityY;
    this.drag.lastX = e.touches[0].clientX;
    this.drag.lastY = e.touches[0].clientY;
  };
  private onTouchEnd = () => { this.drag.isDragging = false; };
  private onClick = (e: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    this.handleClick(e.clientX - rect.left, e.clientY - rect.top);
  };
  private onWheel = (e: WheelEvent) => {
    e.preventDefault();
    this.drag.velocityX += 0.3 * e.deltaX;
    this.drag.velocityY += 0.3 * e.deltaY;
  };
  private onKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case '+':
      case '=':
        this.bulgeStrength = Math.min(1, this.bulgeStrength + 0.1);
        break;
      case '-':
      case '_':
        this.bulgeStrength = Math.max(0.48, this.bulgeStrength - 0.1);
        break;
      case 'ArrowLeft':
        this.bulgeRadius = Math.max(0.1, this.bulgeRadius - 0.05);
        this.resizeCanvas();
        break;
      case 'ArrowRight':
        this.bulgeRadius = Math.min(3, this.bulgeRadius + 0.05);
        this.resizeCanvas();
        break;
    }
  };

  constructor(private options: InfiniteGalleryOptions) {
    this.canvas = options.canvas;
    this.gl = this.canvas.getContext('webgl');

    if (!this.gl) {
      console.error('WebGL not supported');
      return;
    }

    this.resizeCanvas();
    window.addEventListener('resize', this.onResize);
    this.init();
    this.loadPortraitImages();
    this.setupEventListeners();
    this.animate();
  }

  private resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    const t = Math.sqrt(
      Math.pow(this.canvas.width / Math.min(this.canvas.width, this.canvas.height), 2) +
      Math.pow(this.canvas.height / Math.min(this.canvas.width, this.canvas.height), 2)
    );
    this.adjustedBulgeRadius = Math.max(this.bulgeRadius, 0.6 * t * 1.2);
    if (this.gl) this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  private init() {
    const vsSource = `
    attribute vec2 aPosition;
    attribute vec2 aTexCoord;
    varying vec2 vTexCoord;

    uniform vec2 uResolution;
    uniform vec2 uOffset;
    uniform float uRotation;
    uniform vec2 uImagePosition;
    uniform vec2 uImageSize;
    uniform float uBulgeStrength;
    uniform float uBulgeRadius;

    vec2 applyBulgeEffect(vec2 pos){
        vec2 normalizedPos = pos / uResolution;
        vec2 center = vec2(0.5, 0.5);
        vec2 delta = normalizedPos - center;

        float aspect = uResolution.x / uResolution.y;
        delta.x *= aspect;

        float dist = length(delta);

        if(dist < uBulgeRadius){
            float t = dist / uBulgeRadius;
            float z = sqrt(1.5 - t*t);
            delta *= 0.35 + uBulgeStrength * z;
            delta.x /= aspect;

            normalizedPos = center + delta;
            pos = normalizedPos * uResolution;
        }
        return pos;
    }

    void main(){
        vec2 pos = aPosition * uImageSize;
        pos += uImagePosition;
        pos -= uOffset;

        vec2 center = uImagePosition + (uImageSize * 0.5) - uOffset;
        pos -= center;
        float cosR = cos(uRotation);
        float sinR = sin(uRotation);
        pos = vec2(pos.x * cosR - pos.y * sinR, pos.x * sinR + pos.y * cosR);
        pos += center;

        pos = applyBulgeEffect(pos);

        vec2 clip = pos / uResolution * 2.0 - 1.0;
        gl_Position = vec4(clip, 0.0, 1.0);
        vTexCoord = aTexCoord;
    }
    `;

    const fsSource = `
    precision mediump float;
    varying vec2 vTexCoord;
    uniform sampler2D uSampler;
    void main(){
        vec2 uv = vec2(vTexCoord.x, 1.0 - vTexCoord.y);
        vec4 color = texture2D(uSampler, uv);
        if(color.a < 0.01) discard;
        gl_FragColor = color;
    }
    `;

    this.program = this.createProgram(vsSource, fsSource);

    const SUBDIV = 24;
    const positions: number[] = [];
    const texCoords: number[] = [];
    const indices: number[] = [];

    for (let y = 0; y <= SUBDIV; y++) {
      for (let x = 0; x <= SUBDIV; x++) {
        positions.push(x / SUBDIV, y / SUBDIV);
        texCoords.push(x / SUBDIV, y / SUBDIV);
      }
    }

    for (let y = 0; y < SUBDIV; y++) {
      for (let x = 0; x < SUBDIV; x++) {
        const i = y * (SUBDIV + 1) + x;
        indices.push(i, i + 1, i + SUBDIV + 1, i + 1, i + SUBDIV + 2, i + SUBDIV + 1);
      }
    }

    this.indexCount = indices.length;

    const gl = this.gl!;
    this.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    this.texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);

    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  }

  private async loadPortraitImages() {
    const imagesToLoad = this.options.images?.length ? this.options.images : this.getDefaultImages();
    const loadPromises: Promise<void>[] = [];
    let loaded = 0;

    for (let i = 0; i < imagesToLoad.length; i++) {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      const promise = new Promise<void>((resolve) => {
        img.onload = () => {
          this.images.push(img);
          this.textures.push(this.createTexture(img)!);
          this.imageMetaData.push({
            width: img.naturalWidth || 100,
            height: img.naturalHeight || 100,
            aspectRatio: (img.naturalWidth || 1) / (img.naturalHeight || 1)
          });
          loaded++;
          this.options.onProgress?.(Math.round((loaded / imagesToLoad.length) * 100));
          resolve();
        };
        img.onerror = () => resolve();
        img.src = imagesToLoad[i];
      });

      loadPromises.push(promise);
    }

    await Promise.all(loadPromises);
    if (this.destroyed) return;
    this.computeLayout();
    this.options.onReady?.();
  }

  private computeLayout() {
    this.layoutPositions = [];
    let currentY = 0;

    for (let i = 0; i < this.images.length; i += this.itemsPerRow) {
      const rowItems: number[] = [];
      let rowAspectSum = 0;

      for (let j = 0; j < this.itemsPerRow && (i + j) < this.images.length; j++) {
        const index = i + j;
        const meta = this.imageMetaData[index];
        rowItems.push(index);
        rowAspectSum += meta.aspectRatio;
      }

      const rowHeight = this.targetRowWidth / rowAspectSum;
      let currentX = 0;

      for (const index of rowItems) {
        const meta = this.imageMetaData[index];
        const width = rowHeight * meta.aspectRatio;

        this.layoutPositions[index] = { x: currentX, y: currentY, width, height: rowHeight };
        currentX += width;
      }

      currentY += rowHeight;
    }

    this.gridWidth = this.targetRowWidth;
    this.gridHeight = currentY;
  }

  private getDefaultImages(): string[] {
    return [1011, 1015, 1018, 1020, 1023, 1025, 1029, 1031, 1033, 1035].map(
      (t) => `https://picsum.photos/id/${t}/100/100`
    );
  }

  private createTexture(t: HTMLImageElement): WebGLTexture | null {
    const gl = this.gl!;
    const s = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, s);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    return s;
  }

  private getVisibleTiles() {
    if (!this.gridWidth || !this.gridHeight) return [];

    const tiles: { x: number; y: number; width: number; height: number; imageIndex: number }[] = [];
    const minX = this.viewOffset.x - this.canvas.width;
    const maxX = this.viewOffset.x + 2 * this.canvas.width;
    const minY = this.viewOffset.y - this.canvas.height;
    const maxY = this.viewOffset.y + 2 * this.canvas.height;

    const startCol = Math.floor(minX / this.gridWidth) - 1;
    const endCol = Math.ceil(maxX / this.gridWidth) + 1;
    const startRow = Math.floor(minY / this.gridHeight) - 1;
    const endRow = Math.ceil(maxY / this.gridHeight) + 1;

    for (let gy = startRow; gy <= endRow; gy++) {
      for (let gx = startCol; gx <= endCol; gx++) {
        for (let i = 0; i < this.images.length; i++) {
          const item = this.layoutPositions[i];
          const posX = gx * this.gridWidth + item.x;
          const posY = gy * this.gridHeight + item.y;

          if (posX + item.width >= minX && posX <= maxX &&
              posY + item.height >= minY && posY <= maxY) {
            tiles.push({ x: posX, y: posY, width: item.width, height: item.height, imageIndex: i });
          }
        }
      }
    }
    return tiles;
  }

  private render() {
    const gl = this.gl;
    if (!gl || !this.program || this.images.length === 0) return;

    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.clearColor(0.08, 0.08, 0.1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(this.program);

    const aPosition = gl.getAttribLocation(this.program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const aTexCoord = gl.getAttribLocation(this.program, 'aTexCoord');
    gl.enableVertexAttribArray(aTexCoord);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
    gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

    const uResolution = gl.getUniformLocation(this.program, 'uResolution');
    gl.uniform2f(uResolution, this.canvas.width, this.canvas.height);

    const uOffset = gl.getUniformLocation(this.program, 'uOffset');
    const uImagePosition = gl.getUniformLocation(this.program, 'uImagePosition');
    const uImageSize = gl.getUniformLocation(this.program, 'uImageSize');
    const uSampler = gl.getUniformLocation(this.program, 'uSampler');
    const uBulgeStrength = gl.getUniformLocation(this.program, 'uBulgeStrength');
    const uBulgeRadius = gl.getUniformLocation(this.program, 'uBulgeRadius');

    gl.uniform1f(uBulgeStrength, this.bulgeStrength);
    gl.uniform1f(uBulgeRadius, this.adjustedBulgeRadius);

    const visibleTiles = this.getVisibleTiles();

    for (const tile of visibleTiles) {
      gl.uniform2f(uOffset, this.viewOffset.x, this.viewOffset.y);
      gl.uniform2f(uImagePosition, tile.x, tile.y);
      gl.uniform2f(uImageSize, tile.width, tile.height);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.textures[tile.imageIndex]);
      gl.uniform1i(uSampler, 0);

      gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);
    }
  }

  private handleClick(clientX: number, clientY: number) {
    const worldX = clientX + this.viewOffset.x;
    const worldY = clientY + this.viewOffset.y;
    const visibleTiles = this.getVisibleTiles();

    for (const tile of visibleTiles) {
      if (worldX >= tile.x && worldX <= tile.x + tile.width &&
          worldY >= tile.y && worldY <= tile.y + tile.height) {
        console.log('📸 Image clicked', tile.imageIndex, tile.x, tile.y);
        return;
      }
    }
  }

  private setupEventListeners() {
    this.canvas.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);

    this.canvas.addEventListener('touchstart', this.onTouchStart);
    window.addEventListener('touchmove', this.onTouchMove);
    window.addEventListener('touchend', this.onTouchEnd);

    this.canvas.addEventListener('click', this.onClick);
    this.canvas.addEventListener('wheel', this.onWheel);
    window.addEventListener('keydown', this.onKeyDown);
  }

  private teardownEventListeners() {
    this.canvas.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);

    this.canvas.removeEventListener('touchstart', this.onTouchStart);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchEnd);

    this.canvas.removeEventListener('click', this.onClick);
    this.canvas.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('resize', this.onResize);
  }

  private animate = () => {
    if (this.destroyed) return;

    if (!this.drag.isDragging) {
      this.viewOffset.x += this.autoSpeedX;
      this.viewOffset.y += this.autoSpeedY;

      this.viewOffset.x -= this.drag.velocityX;
      this.viewOffset.y -= this.drag.velocityY;
      this.drag.velocityX *= this.inertia;
      this.drag.velocityY *= this.inertia;

      if (Math.abs(this.drag.velocityX) < 0.1) this.drag.velocityX = 0;
      if (Math.abs(this.drag.velocityY) < 0.1) this.drag.velocityY = 0;
    }

    if (this.gridWidth > 0) this.viewOffset.x %= this.gridWidth;
    if (this.gridHeight > 0) this.viewOffset.y %= this.gridHeight;

    this.render();
    this.rafId = requestAnimationFrame(this.animate);
  };

  private createProgram(vsSource: string, fsSource: string): WebGLProgram | null {
    const gl = this.gl!;
    const vs = this.loadShader(gl.VERTEX_SHADER, vsSource);
    const fs = this.loadShader(gl.FRAGMENT_SHADER, fsSource);
    const program = gl.createProgram()!;

    gl.attachShader(program, vs!);
    gl.attachShader(program, fs!);
    gl.linkProgram(program);

    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return program;
    }
    console.error('Program Link Error:', gl.getProgramInfoLog(program));
    return null;
  }

  private loadShader(type: number, source: string): WebGLShader | null {
    const gl = this.gl!;
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      return shader;
    }
    console.error('Shader Compile Error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  /** Call from ngOnDestroy to stop the render loop and remove all listeners. */
  destroy() {
    this.destroyed = true;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.teardownEventListeners();
  }
}


@Component({
  selector: 'app-mygallary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mygallary.component.html',
  styleUrl: './mygallary.component.css'
})
export class MygallaryComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasRef', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('cardRef', { static: true }) cardRef!: ElementRef<HTMLDivElement>;

  loading = true;
  loadingPercent = 0;
  isFullscreen = false;

  // ---- featured center card state ----
  slides: { bg: string; fg: string }[] = [];
  activeIndex = 0;
  dragging = false;

  private renderer!: InfiniteGalleryRenderer;

  private autoplayTimer: any = null;
  private readonly autoplayMs = 3200;

  // card drag-to-move state
  private startX = 0;
  private startY = 0;
  private dragBaseX = 0;
  private dragBaseY = 0;
  dragOffsetX = 0;
  dragOffsetY = 0;

  // background scroll/drag -> slide advance state
  private readonly scrollStep = 90;
  private scrollAccum = 0;
  private bgDragging = false;
  private bgLastX = 0;
  private bgLastY = 0;

  // bound handlers kept as fields so they can be removed in ngOnDestroy
  private onCardMoveBound = (e: MouseEvent | TouchEvent) => this.onCardMove(e);
  private onCardUpBound = () => this.onCardUp();
  private onBgMoveBound = (e: MouseEvent | TouchEvent) => this.onBgMove(e);
  private onBgUpBound = () => this.onBgUp();
  private onWheelBound = (e: WheelEvent) => this.onWheel(e);

  ngAfterViewInit(): void {
    // Full-resolution copies of the same images the background gallery uses,
    // so the two stay visually in sync without duplicating the asset list.
    this.slides = GALLERY_IMAGES.map((src) => {
      const big = src.replace(/w=\d+/, 'w=1000&q=80&auto=format&fit=crop');
      return { bg: big, fg: big };
    });

    this.renderer = new InfiniteGalleryRenderer({
      canvas: this.canvasRef.nativeElement,
      images: GALLERY_IMAGES,
      onProgress: (percent) => (this.loadingPercent = percent),
      onReady: () => (this.loading = false)
    });

    this.startAutoplay();
    this.setupBackgroundSync();

    document.addEventListener('fullscreenchange', this.onFullscreenChange);
  }

  ngOnDestroy(): void {
    this.renderer?.destroy();
    this.stopAutoplay();
    this.teardownBackgroundSync();
    document.removeEventListener('fullscreenchange', this.onFullscreenChange);
  }

  // ---------------------------------------------------------------------
  // Slideshow
  // ---------------------------------------------------------------------

  private showSlide(index: number): void {
    const len = this.slides.length;
    this.activeIndex = ((index % len) + len) % len;
  }

  goNext(): void {
    this.showSlide(this.activeIndex + 1);
    this.startAutoplay();
  }

  goPrev(): void {
    this.showSlide(this.activeIndex - 1);
    this.startAutoplay();
  }

  private startAutoplay(): void {
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => this.showSlide(this.activeIndex + 1), this.autoplayMs);
  }

  private stopAutoplay(): void {
    if (this.autoplayTimer) clearInterval(this.autoplayTimer);
  }

  // ---------------------------------------------------------------------
  // Card drag-to-move (grabbing the card itself repositions it, then it
  // eases back to center on release)
  // ---------------------------------------------------------------------

  onCardDown(e: MouseEvent | TouchEvent): void {
    this.dragging = true;
    const point = 'touches' in e ? e.touches[0] : e;
    this.startX = point.clientX;
    this.startY = point.clientY;
    this.dragBaseX = this.dragOffsetX;
    this.dragBaseY = this.dragOffsetY;

    window.addEventListener('mousemove', this.onCardMoveBound);
    window.addEventListener('mouseup', this.onCardUpBound);
    window.addEventListener('touchmove', this.onCardMoveBound, { passive: true });
    window.addEventListener('touchend', this.onCardUpBound);
  }

  private onCardMove(e: MouseEvent | TouchEvent): void {
    if (!this.dragging) return;
    const point = 'touches' in e ? e.touches[0] : e;
    this.dragOffsetX = this.dragBaseX + (point.clientX - this.startX);
    this.dragOffsetY = this.dragBaseY + (point.clientY - this.startY);
  }

  private onCardUp(): void {
    if (!this.dragging) return;
    this.dragging = false;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;

    window.removeEventListener('mousemove', this.onCardMoveBound);
    window.removeEventListener('mouseup', this.onCardUpBound);
    window.removeEventListener('touchmove', this.onCardMoveBound);
    window.removeEventListener('touchend', this.onCardUpBound);
  }

  get cardTransform(): string {
    return `translate(calc(-50% + ${this.dragOffsetX}px), calc(-50% + ${this.dragOffsetY}px))`;
  }

  // ---------------------------------------------------------------------
  // Background scroll/drag -> advances the card's slide too. Read-only
  // listeners on the canvas; never touches the renderer's own drag/pan logic.
  // ---------------------------------------------------------------------

  private setupBackgroundSync(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.addEventListener('mousedown', this.onBgDown);
    canvas.addEventListener('touchstart', this.onBgDown, { passive: true });
    canvas.addEventListener('wheel', this.onWheelBound, { passive: true });
  }

  private teardownBackgroundSync(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.removeEventListener('mousedown', this.onBgDown);
    canvas.removeEventListener('touchstart', this.onBgDown);
    canvas.removeEventListener('wheel', this.onWheelBound);
    window.removeEventListener('mousemove', this.onBgMoveBound);
    window.removeEventListener('mouseup', this.onBgUpBound);
    window.removeEventListener('touchmove', this.onBgMoveBound);
    window.removeEventListener('touchend', this.onBgUpBound);
  }

  private onBgDown = (e: MouseEvent | TouchEvent) => {
    this.bgDragging = true;
    const point = 'touches' in e ? e.touches[0] : e;
    this.bgLastX = point.clientX;
    this.bgLastY = point.clientY;

    window.addEventListener('mousemove', this.onBgMoveBound);
    window.addEventListener('mouseup', this.onBgUpBound);
    window.addEventListener('touchmove', this.onBgMoveBound, { passive: true });
    window.addEventListener('touchend', this.onBgUpBound);
  };

  private onBgMove(e: MouseEvent | TouchEvent): void {
    if (!this.bgDragging) return;
    const point = 'touches' in e ? e.touches[0] : e;
    this.onBgMovement(point.clientX - this.bgLastX, point.clientY - this.bgLastY);
    this.bgLastX = point.clientX;
    this.bgLastY = point.clientY;
  }

  private onBgUp(): void {
    this.bgDragging = false;
    window.removeEventListener('mousemove', this.onBgMoveBound);
    window.removeEventListener('mouseup', this.onBgUpBound);
    window.removeEventListener('touchmove', this.onBgMoveBound);
    window.removeEventListener('touchend', this.onBgUpBound);
  }

  private onWheel(e: WheelEvent): void {
    this.onBgMovement(-e.deltaX, -e.deltaY);
  }

  private onBgMovement(deltaX: number, deltaY: number): void {
    this.scrollAccum += deltaX + deltaY;
    while (this.scrollAccum >= this.scrollStep) {
      this.goNext();
      this.scrollAccum -= this.scrollStep;
    }
    while (this.scrollAccum <= -this.scrollStep) {
      this.goPrev();
      this.scrollAccum += this.scrollStep;
    }
  }

  // ---------------------------------------------------------------------
  // Fullscreen toggle button
  // ---------------------------------------------------------------------

  toggleFullscreen(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) =>
        console.error(`Fullscreen error: ${err.message}`)
      );
    } else {
      document.exitFullscreen().catch((err) =>
        console.error(`Exit fullscreen error: ${err.message}`)
      );
    }
  }

  private onFullscreenChange = () => {
    this.isFullscreen = !!document.fullscreenElement;
  };
}
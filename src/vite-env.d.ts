/// <reference types="vite/client" />

declare module '*.glsl' {
  const content: string
  export default content
}

declare module '@mkkellogg/gaussian-splats-3d' {
  import * as THREE from 'three';

  export class Viewer {
    constructor(options?: {
      selfDrivenMode?: boolean;
      useBuiltInControls?: boolean;
      renderer?: THREE.WebGLRenderer;
      camera?: THREE.Camera;
      sharedMemoryForWorkers?: boolean;
    });
    addSplatScene(path: string, options?: { showLoadingUI?: boolean }): Promise<void>;
    getSplatMesh(): THREE.Object3D;
    update?(): void;
    dispose?(): void;
  }

  export class DropInViewer extends THREE.Object3D {
    constructor(options?: any);
    addSplatScenes(scenes: any[], showLoadingUI?: boolean): Promise<void>;
    dispose?(): Promise<void>;
  }
}


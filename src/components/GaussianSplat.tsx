import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import * as GaussianSplats3D from "@mkkellogg/gaussian-splats-3d";

function fitCameraToObject(camera: THREE.Camera, object: THREE.Object3D) {
  const box = new THREE.Box3().setFromObject(object);
  const sphere = box.getBoundingSphere(new THREE.Sphere());
  const perspCamera = camera as THREE.PerspectiveCamera;
  
  const fov = perspCamera.fov * (Math.PI / 180);
  const distance = sphere.radius / Math.tan(fov * 0.5) * 1.2;
  
  camera.position.copy(sphere.center.clone().add(new THREE.Vector3(0, 0, distance)));
  camera.lookAt(sphere.center);
  perspCamera.updateProjectionMatrix();
}

export function GaussianSplat({ url }: { url: string }) {
  const { scene, gl, camera } = useThree();
  const viewerRef = useRef<any>(null);
  const meshRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    let cancelled = false;

    const viewer = new GaussianSplats3D.Viewer({
      selfDrivenMode: false,
      useBuiltInControls: false,
      renderer: gl,
      camera,
      sharedMemoryForWorkers: false,
    });

    viewerRef.current = viewer;

    (async () => {
      try {
        await viewer.addSplatScene(url, { showLoadingUI: true });
        if (cancelled) return;

        const mesh = viewer.getSplatMesh();
        meshRef.current = mesh;
        scene.add(mesh);
        fitCameraToObject(camera, mesh);
      } catch (e) {
        console.error("[GaussianSplat] load failed:", e);
      }
    })();

    return () => {
      cancelled = true;
      if (meshRef.current) scene.remove(meshRef.current);
      viewerRef.current = null;
      viewer.dispose?.();
    };
  }, [scene, gl, camera, url]);

  useFrame(() => {
    viewerRef.current?.update?.();
  });

  return null;
}

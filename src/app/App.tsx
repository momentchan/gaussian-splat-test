import { AdaptiveDpr, CameraControls } from "@react-three/drei";
import { CanvasCapture } from "@packages/r3f-gist/components/utility";
import BasicMesh from '../components/BasicMesh'
import { LevaWrapper } from "@packages/r3f-gist/components";
import { Canvas } from "@react-three/fiber";
import { GaussianSplat } from "../components/GaussianSplat";

export default function App() {
    return <>
        <LevaWrapper />

        <Canvas
            shadows
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [0, 0, 5]
            }}
            gl={{ preserveDrawingBuffer: true }}
            dpr={[1, 2]}
            performance={{ min: 0.5, max: 1 }}
        >
            <color attach="background" args={['#000000']} />
            <AdaptiveDpr pixelated />
            
            <GaussianSplat url="/splats/camo_jacket.ply" />

            <CameraControls makeDefault />
            <BasicMesh />
            <CanvasCapture />
            <directionalLight position={[1, 1, 1]} intensity={1} />
        </Canvas>
    </>
}

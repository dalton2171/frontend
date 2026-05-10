import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function CyberScene() {
  return (
    <Canvas className="h-screen w-full">
      <ambientLight intensity={0.5} />

      <mesh rotation={[0.5, 0.5, 0]}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshStandardMaterial color="cyan" wireframe />
      </mesh>

      <OrbitControls />
    </Canvas>
  );
}

export default CyberScene;
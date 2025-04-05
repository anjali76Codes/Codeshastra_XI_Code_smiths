import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function WhaleModel() {
  const { scene } = useGLTF("/models/cute_whale.glb");
  return <primitive object={scene} scale={2} />;
}

export default function WhaleViewer() {
  return (
    <div className="w-full h-[500px] bg-gray-900 rounded-2xl overflow-hidden shadow-lg">
      <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <WhaleModel />
        </Suspense>
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}

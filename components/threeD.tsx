"use client";
import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Mesh } from "three";
import { OrbitControls } from "@react-three/drei";
import { STLLoader } from "three-stdlib";
import { TextureLoader } from "three";

interface ModelProps {
  fileUrl: string;
  textureUrl: string;
}

function MeshComponent({ fileUrl, textureUrl }: ModelProps) {
  const mesh = useRef<Mesh>(null!);
  const geometry = useLoader(STLLoader, fileUrl);
  const texture = useLoader(TextureLoader, textureUrl);

  useFrame(() => {
    mesh.current.rotation.y += 0.001;
  });

  return (
    <mesh ref={mesh} geometry={geometry}>
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

const models = [
  { fileUrl: "/3d.STL", textureUrl: "/3d.png" },
];

export default function ThreeD() {
  return (
    <div className="  ">
      {models.map((model, index) => (
        <div  className="w-full h-full">
          <Canvas className="h-full w-full shadow-md rounded-md">
            <OrbitControls />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <MeshComponent fileUrl={model.fileUrl} textureUrl={model.textureUrl} />
          </Canvas>
        </div>
      ))}
    </div>
  );
}

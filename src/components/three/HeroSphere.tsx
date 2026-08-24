import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function TechSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.2;
      const scale = 1 + Math.sin(t * 0.8) * 0.05;
      meshRef.current.scale.setScalar(scale);
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -t * 0.1;
      wireRef.current.rotation.y = -t * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.3;
      ringRef.current.rotation.x = Math.PI / 3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.2;
      ring2Ref.current.rotation.y = Math.PI / 4;
    }
  });

  return (
    <group>
      {/* Inner glowing sphere */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.8, 3]} />
        <meshStandardMaterial
          color={0x00dcff}
          emissive={0x00dcff}
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.6}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe shell */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial
          color={0x00dcff}
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Orbital ring 1 */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.8, 0.015, 16, 100]} />
        <meshBasicMaterial color={0x1e5aff} transparent opacity={0.5} />
      </mesh>

      {/* Orbital ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.2, 0.01, 16, 100]} />
        <meshBasicMaterial color={0x00aaff} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export default function HeroSphere() {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <TechSphere />
        <pointLight position={[5, 5, 5]} intensity={1} color={0x00dcff} />
        <pointLight position={[-5, -3, 3]} intensity={0.5} color={0x1e5aff} />
        <ambientLight intensity={0.15} />
      </Canvas>
    </div>
  );
}

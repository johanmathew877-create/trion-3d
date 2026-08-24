import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Scroll progress 0→1 over 3 viewport heights.
 * The sphere traces a figure-8 / figure-curve:
 *   X: oscillates sin(progress * 4π)  →  edge, middle, other edge, repeat
 *   Y: oscillates cos(progress * 4π)  →  sweeps down, back up, repeats
 * This gives ~2 full loops across the scroll range.
 */
function TechSphere({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  // Smooth interpolation targets
  const targetPos = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // --- Scroll-driven curved path ---
    // 2 full oscillations across the scroll range
    const angle = scrollProgress * Math.PI * 4;
    targetPos.current.x = Math.sin(angle) * 3.8;   // left → right → left …
    targetPos.current.y = -Math.abs(Math.cos(angle)) * 3; // dips down, returns

    if (groupRef.current) {
      groupRef.current.position.x +=
        (targetPos.current.x - groupRef.current.position.x) * 0.06;
      groupRef.current.position.y +=
        (targetPos.current.y - groupRef.current.position.y) * 0.06;
    }

    // --- Self-rotation (time-driven) ---
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
    <group ref={groupRef}>
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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = window.innerHeight * 2.5;
      const progress = Math.min(window.scrollY / maxScroll, 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <TechSphere scrollProgress={scrollProgress} />
        <pointLight position={[5, 5, 5]} intensity={1} color={0x00dcff} />
        <pointLight position={[-5, -3, 3]} intensity={0.5} color={0x1e5aff} />
        <ambientLight intensity={0.15} />
      </Canvas>
    </div>
  );
}

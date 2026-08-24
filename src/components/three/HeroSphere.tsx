import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Sphere starts at the TOP of the screen.
 * As scroll progress goes 0→1 it DESCENDS to the bottom,
 * curving left→right→left→right in a smooth sine wave.
 */
function TechSphere({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  const targetPos = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // ── Scroll-driven descent with sine curves ──
    // Y: starts at +6 (top of screen), descends to -8 (bottom)
    const y = 6 - scrollProgress * 14;
    // X: sin wave → oscillates left/right as it descends
    // ~3 full left-right cycles over the scroll range
    const x = Math.sin(scrollProgress * Math.PI * 6) * 4;

    targetPos.current.x = x;
    targetPos.current.y = y;

    if (groupRef.current) {
      groupRef.current.position.x +=
        (targetPos.current.x - groupRef.current.position.x) * 0.07;
      groupRef.current.position.y +=
        (targetPos.current.y - groupRef.current.position.y) * 0.07;
    }

    // ── Self-rotation ──
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
      const scale = 1 + Math.sin(t * 0.8) * 0.05;
      meshRef.current.scale.setScalar(scale);
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -t * 0.12;
      wireRef.current.rotation.y = -t * 0.18;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.35;
      ringRef.current.rotation.x = Math.PI / 3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.25;
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
          emissiveIntensity={0.8}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Wireframe shell */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial
          color={0x00dcff}
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Orbital ring 1 */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.8, 0.02, 16, 100]} />
        <meshBasicMaterial color={0x1e5aff} transparent opacity={0.6} />
      </mesh>

      {/* Orbital ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.2, 0.015, 16, 100]} />
        <meshBasicMaterial color={0x00aaff} transparent opacity={0.4} />
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
        <pointLight position={[5, 5, 5]} intensity={1.5} color={0x00dcff} />
        <pointLight position={[-5, -3, 3]} intensity={0.8} color={0x1e5aff} />
        <pointLight position={[0, -2, 2]} intensity={0.5} color={0x00ffff} />
        <ambientLight intensity={0.2} />
      </Canvas>
    </div>
  );
}

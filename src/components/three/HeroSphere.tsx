import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function TechSphere({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<any>(null!);
  const wireRef = useRef<any>(null!);
  const ring1Ref = useRef<any>(null!);
  const ring2Ref = useRef<any>(null!);
  const groupRef = useRef<any>(null!);

  const tx = useRef(0);
  const ty = useRef(0);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    const targetX = Math.sin(scrollProgress * Math.PI * 8) * 3.2;
    const targetY = Math.sin(scrollProgress * Math.PI * 4) * 2;

    // Ultra-smooth lerp — catches up gently with no jitter
    tx.current += (targetX - tx.current) * 0.035;
    ty.current += (targetY - ty.current) * 0.035;

    if (groupRef.current) {
      groupRef.current.position.x = tx.current;
      groupRef.current.position.y = ty.current;
    }

    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.18;
      meshRef.current.rotation.y = t * 0.25;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -t * 0.1;
      wireRef.current.rotation.y = -t * 0.15;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.3;
      ring1Ref.current.rotation.x = Math.PI / 3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.2;
      ring2Ref.current.rotation.y = Math.PI / 4;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.8, 3]} />
        <meshStandardMaterial
          color={0x00dcff}
          emissive={0x00dcff}
          emissiveIntensity={1.2}
          metalness={0.7}
          roughness={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>

      <mesh ref={wireRef}>
        <icosahedronGeometry args={[2.4, 1]} />
        <meshBasicMaterial
          color={0x00dcff}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      <mesh ref={ring1Ref}>
        <torusGeometry args={[3.0, 0.025, 16, 100]} />
        <meshBasicMaterial color={0x1e5aff} transparent opacity={0.6} />
      </mesh>

      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.5, 0.02, 16, 100]} />
        <meshBasicMaterial color={0x00aaff} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

export default function HeroSphere() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScrollProgress(Math.min(window.scrollY / maxScroll, 1));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        frameloop="always"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
      >
        <TechSphere scrollProgress={scrollProgress} />
        <pointLight position={[5, 5, 5]} intensity={2.5} color={0x00dcff} />
        <pointLight position={[-5, -3, 3]} intensity={1.2} color={0x1e5aff} />
        <pointLight position={[0, 0, 4]} intensity={1} color={0x00ffff} />
        <ambientLight intensity={0.35} />
      </Canvas>
    </div>
  );
}

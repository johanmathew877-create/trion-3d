import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const meshRef = useRef<THREE.Points>(null!);
  const mouseRef = useRef({ x: 0, y: 0 });

  const count = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color(0x00dcff);
    const blue = new THREE.Color(0x1e5aff);
    const white = new THREE.Color(0xffffff);
    for (let i = 0; i < count; i++) {
      const t = Math.random();
      const c = t < 0.5 ? cyan.clone().lerp(blue, t * 2) : blue.clone().lerp(white, (t - 0.5) * 2);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return col;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.02 + mouseRef.current.x * 0.05;
    meshRef.current.rotation.x = t * 0.01 + mouseRef.current.y * 0.03;

    const posArr = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArr[i3 + 1] += Math.sin(t * 0.5 + i * 0.01) * 0.002;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function WireframeMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.08;
    meshRef.current.rotation.y = t * 0.12;
  });
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[6, 1]} />
      <meshBasicMaterial
        color={0x00dcff}
        wireframe
        transparent
        opacity={0.04}
      />
    </mesh>
  );
}

function GlowOrbs() {
  const groupRef = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z = state.clock.elapsedTime * 0.03;
  });

  const orbs = useMemo(() => [
    { pos: [8, 4, -10] as [number, number, number], scale: 2.5, color: 0x00dcff },
    { pos: [-10, -3, -12] as [number, number, number], scale: 3, color: 0x1e5aff },
    { pos: [5, -6, -8] as [number, number, number], scale: 1.8, color: 0x0088cc },
  ], []);

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.pos}>
          <sphereGeometry args={[orb.scale, 16, 16]} />
          <meshBasicMaterial
            color={orb.color}
            transparent
            opacity={0.03}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ParticleField() {
  return (
    <div className="fixed inset-0 -z-10" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles />
        <WireframeMesh />
        <GlowOrbs />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  );
}

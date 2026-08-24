import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

/* ── Particles (existing) ────────────────────────────────────────── */

function Particles() {
  const meshRef = useRef<THREE.Points>(null!);

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
      const c =
        t < 0.5
          ? cyan.clone().lerp(blue, t * 2)
          : blue.clone().lerp(white, (t - 0.5) * 2);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return col;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.02;
    meshRef.current.rotation.x = t * 0.01;

    const posArr = meshRef.current.geometry.attributes.position
      .array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArr[i3 + 1] += Math.sin(t * 0.5 + i * 0.01) * 0.002;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
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

/* ── Scroll-reactive flowing curves ──────────────────────────────── */

const LINE_COUNT = 40;
const SEGMENTS = 60;

interface LineConfig {
  baseX: number;
  speed: number;
  amplitude: number;
  phase: number;
  opacity: number;
  color: string;
}

function FlowLines({ scrollY }: { scrollY: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  const configs = useMemo<LineConfig[]>(() => {
    return Array.from({ length: LINE_COUNT }, (_, i) => {
      const rand = () => Math.random();
      const hue = rand() > 0.5 ? "#00dcff" : "#1e5aff";
      return {
        baseX: (i / LINE_COUNT) * 30 - 15, // spread across scene
        speed: 0.3 + rand() * 0.6,
        amplitude: 1.5 + rand() * 3,
        phase: rand() * Math.PI * 2,
        opacity: 0.08 + rand() * 0.18,
        color: hue,
      };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Gentle drift so lines feel alive even without scrolling
    groupRef.current.position.y =
      state.clock.elapsedTime * -0.3 + scrollY * 0.012;
  });

  return (
    <group ref={groupRef}>
      {configs.map((cfg, idx) => {
        // Build the curved line points
        const pts: [number, number, number][] = [];
        for (let s = 0; s <= SEGMENTS; s++) {
          const t = s / SEGMENTS;
          const y = 15 - t * 30; // top to bottom of visible area
          // Horizontal offset increases with scroll, creating deeper curves
          const scrollCurve = scrollY * 0.006;
          const x =
            cfg.baseX +
            Math.sin(t * Math.PI * 2 + cfg.phase + scrollCurve * cfg.speed) *
              cfg.amplitude;
          pts.push([x, y, -5 - idx * 0.3]); // stagger depth
        }
        return (
          <Line
            key={idx}
            points={pts}
            color={cfg.color}
            lineWidth={0.6}
            transparent
            opacity={cfg.opacity}
          />
        );
      })}
    </group>
  );
}

/* ── Wireframe mesh (existing) ──────────────────────────────────── */

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
      <meshBasicMaterial color={0x00dcff} wireframe transparent opacity={0.04} />
    </mesh>
  );
}

/* ── Glow orbs (existing) ───────────────────────────────────────── */

function GlowOrbs() {
  const groupRef = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z = state.clock.elapsedTime * 0.03;
  });

  const orbs = useMemo(
    () => [
      {
        pos: [8, 4, -10] as [number, number, number],
        scale: 2.5,
        color: 0x00dcff,
      },
      {
        pos: [-10, -3, -12] as [number, number, number],
        scale: 3,
        color: 0x1e5aff,
      },
      {
        pos: [5, -6, -8] as [number, number, number],
        scale: 1.8,
        color: 0x0088cc,
      },
    ],
    [],
  );

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.pos}>
          <sphereGeometry args={[orb.scale, 16, 16]} />
          <meshBasicMaterial color={orb.color} transparent opacity={0.03} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Export ──────────────────────────────────────────────────────── */

export default function ParticleField() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <FlowLines scrollY={scrollY} />
        <Particles />
        <WireframeMesh />
        <GlowOrbs />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  );
}

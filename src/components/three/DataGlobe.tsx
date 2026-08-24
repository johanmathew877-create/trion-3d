import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";


function GlobeWireframe() {
  const groupRef = useRef<THREE.Group>(null!);
  const globeRef = useRef<THREE.Mesh>(null!);

  // Latitude rings
  const latRings = useMemo(() => {
    const rings: { y: number; radius: number; opacity: number }[] = [];
    for (let i = 1; i <= 8; i++) {
      const angle = (i / 9) * Math.PI - Math.PI / 2;
      const y = Math.sin(angle) * 2.5;
      const r = Math.cos(angle) * 2.5;
      rings.push({ y, radius: r, opacity: 0.15 + Math.abs(Math.cos(angle)) * 0.15 });
    }
    return rings;
  }, []);

  // Longitude meridians
  const lonCount = 12;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.15;
    groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Inner glowing sphere */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[2.48, 32, 32]} />
        <meshStandardMaterial
          color={0x001020}
          emissive={0x003355}
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Latitude rings */}
      {latRings.map((ring, i) => (
        <mesh key={`lat-${i}`} position={[0, ring.y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[ring.radius, 0.008, 8, 64]} />
          <meshBasicMaterial
            color={0x00dcff}
            transparent
            opacity={ring.opacity}
          />
        </mesh>
      ))}

      {/* Longitude meridians */}
      {Array.from({ length: lonCount }).map((_, i) => {
        const angle = (i / lonCount) * Math.PI;
        return (
          <mesh
            key={`lon-${i}`}
            rotation={[0, angle, 0]}
          >
            <torusGeometry args={[2.5, 0.008, 8, 64]} />
            <meshBasicMaterial
              color={0x1e5aff}
              transparent
              opacity={0.12}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function GlobeNodes() {
  const groupRef = useRef<THREE.Group>(null!);

  // Generate random node positions on the sphere surface
  const nodes = useMemo(() => {
    const result: { pos: [number, number, number]; scale: number; speed: number }[] = [];
    for (let i = 0; i < 60; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const r = 2.52;
      result.push({
        pos: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ],
        scale: 0.03 + Math.random() * 0.04,
        speed: 0.5 + Math.random() * 1.5,
      });
    }
    return result;
  }, []);

  // Connections between nearby nodes
  const connections = useMemo(() => {
    const lines: { from: [number, number, number]; to: [number, number, number]; opacity: number }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].pos[0] - nodes[j].pos[0];
        const dy = nodes[i].pos[1] - nodes[j].pos[1];
        const dz = nodes[i].pos[2] - nodes[j].pos[2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 1.8 && Math.random() > 0.6) {
          lines.push({ from: nodes[i].pos, to: nodes[j].pos, opacity: 0.1 + Math.random() * 0.2 });
        }
      }
    }
    return lines;
  }, [nodes]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.15;
    groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map((node, i) => (
        <mesh key={`node-${i}`} position={node.pos}>
          <sphereGeometry args={[node.scale, 8, 8]} />
          <meshBasicMaterial color={0x00dcff} transparent opacity={0.9} />
        </mesh>
      ))}

      {/* Data connection lines */}
      {connections.map((conn, i) => (
        <Line
          key={`conn-${i}`}
          points={[conn.from, conn.to]}
          color="#00dcff"
          lineWidth={0.5}
          transparent
          opacity={conn.opacity}
        />
      ))}

      {/* Pulsing data packets along some connections */}
      {connections.slice(0, 20).map((conn, i) => {
        const mid: [number, number, number] = [
          (conn.from[0] + conn.to[0]) / 2,
          (conn.from[1] + conn.to[1]) / 2,
          (conn.from[2] + conn.to[2]) / 2,
        ];
        return (
          <mesh key={`packet-${i}`} position={mid}>
            <sphereGeometry args={[0.02, 6, 6]} />
            <meshBasicMaterial color={0x00ffff} transparent opacity={0.5} />
          </mesh>
        );
      })}
    </group>
  );
}

function GlobeScene({ scrollY }: { scrollY: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (!groupRef.current) return;
    // Move globe down based on scroll
    const targetY = -scrollY * 0.004;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <GlobeWireframe />
      <GlobeNodes />
    </group>
  );
}

export default function DataGlobe() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none" style={{ height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <GlobeScene scrollY={scrollY} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color={0x00dcff} />
        <pointLight position={[-5, -3, 3]} intensity={0.4} color={0x1e5aff} />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  );
}

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function Nebula() {
  const nebula = useRef();

  const particles = useMemo(() => {
    const count = 2500;

    const positions = new Float32Array(
      count * 3
    );

    const colors = new Float32Array(
      count * 3
    );

    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const radius =
        Math.random() * 9;

      const angle =
        Math.random() * Math.PI * 2;

      const x =
        Math.cos(angle) *
        radius *
        (0.7 + Math.random() * 0.5);

      const y =
        (Math.random() - 0.5) *
        3;

      const z =
        Math.sin(angle) *
        radius *
        (0.35 + Math.random() * 0.5);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      color.setHSL(
        0.6 + Math.random() * 0.15,
        0.5,
        0.35 + Math.random() * 0.3
      );

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return {
      positions,
      colors,
    };
  }, []);

  useFrame((_, delta) => {
    if (!nebula.current) return;

    nebula.current.rotation.y -=
      delta * 0.02;
  });

  return (
    <points ref={nebula}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={
            particles.positions.length / 3
          }
          array={particles.positions}
          itemSize={3}
        />

        <bufferAttribute
          attach="attributes-color"
          count={
            particles.colors.length / 3
          }
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.09}
        vertexColors
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function Galaxy() {
  const galaxy = useRef();

  const particles = useMemo(() => {
    const count = 7000;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 12;

      const arms = 4;

      const arm =
        Math.floor(Math.random() * arms) *
        ((Math.PI * 2) / arms);

      const angle =
        arm +
        radius * 0.45 +
        (Math.random() - 0.5) * 0.8;

      const spread = radius * 0.08;

      positions[i * 3] =
        Math.cos(angle) * radius +
        (Math.random() - 0.5) * spread;

      positions[i * 3 + 1] =
        (Math.random() - 0.5) *
        (0.25 + radius * 0.025);

      positions[i * 3 + 2] =
        Math.sin(angle) * radius +
        (Math.random() - 0.5) * spread;

      color.setHSL(
        0.58 + Math.random() * 0.1,
        0.7,
        0.55 + Math.random() * 0.4
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
    if (!galaxy.current) return;

    galaxy.current.rotation.y += delta * 0.08;
  });

  return (
    <points ref={galaxy}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />

        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
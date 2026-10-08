import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ProjectNode({
  project,
  position,
  onSelect,
}) {
  const groupRef = useRef();
  const coreRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y +=
      delta * 0.25;

    groupRef.current.rotation.x +=
      delta * 0.08;

    const targetScale = hovered
      ? 1.25
      : 1;

    const currentScale =
      groupRef.current.scale.x;

    const newScale =
      THREE.MathUtils.lerp(
        currentScale,
        targetScale,
        delta * 8
      );

    groupRef.current.scale.set(
      newScale,
      newScale,
      newScale
    );

    if (coreRef.current) {
      const pulse =
        1 +
        Math.sin(
          state.clock.elapsedTime * 2
        ) *
          0.08;

      coreRef.current.scale.set(
        pulse,
        pulse,
        pulse
      );
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(project);
      }}
    >
      {/* Main planet */}

      <mesh ref={coreRef}>
        <sphereGeometry
          args={[
            project.size,
            32,
            32,
          ]}
        />

        <meshStandardMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={
            hovered ? 1.2 : 0.45
          }
          roughness={0.35}
          metalness={0.45}
        />
      </mesh>

      {/* Outer glow */}

      <mesh scale={1.25}>
        <sphereGeometry
          args={[
            project.size,
            24,
            24,
          ]}
        />

        <meshBasicMaterial
          color={project.color}
          transparent
          opacity={
            hovered ? 0.25 : 0.1
          }
          side={THREE.BackSide}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>

      {/* Ring */}

      <mesh
        rotation={[
          Math.PI * 0.45,
          0,
          Math.PI * 0.15,
        ]}
      >
        <torusGeometry
          args={[
            project.size * 1.35,
            0.025,
            8,
            64,
          ]}
        />

        <meshBasicMaterial
          color={project.color}
          transparent
          opacity={
            hovered ? 0.9 : 0.35
          }
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>

      {/* Small orbital particles */}

      <mesh
        position={[
          project.size * 1.7,
          0,
          0,
        ]}
      >
        <sphereGeometry
          args={[0.045, 8, 8]}
        />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}
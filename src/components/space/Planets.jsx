import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Planet({
  position,
  size,
  color,
  speed,
  ring = false,
}) {
  const planet = useRef();
  const ringRef = useRef();

  useFrame((_, delta) => {
    if (planet.current) {
      planet.current.rotation.y += delta * speed;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * speed * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* Planet */}
      <mesh ref={planet}>
        <sphereGeometry
          args={[size, 48, 48]}
        />

        <meshStandardMaterial
          color={color}
          roughness={0.7}
          metalness={0.15}
        />
      </mesh>

      {/* Atmospheric glow */}
      <mesh scale={1.08}>
        <sphereGeometry
          args={[size, 32, 32]}
        />

        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Ring */}
      {ring && (
        <mesh
          ref={ringRef}
          rotation={[
            Math.PI * 0.35,
            0,
            Math.PI * 0.15,
          ]}
        >
          <ringGeometry
            args={[
              size * 1.4,
              size * 1.8,
              64,
            ]}
          />

          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.22}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

export default function Planets() {
  const planets = useMemo(
    () => [
      {
        position: [-18, 7, -35],
        size: 2.4,
        color: "#353a70",
        speed: 0.12,
        ring: true,
      },

      {
        position: [18, -6, -50],
        size: 1.6,
        color: "#59452f",
        speed: 0.18,
        ring: false,
      },

      {
        position: [-15, -8, -70],
        size: 1.2,
        color: "#294b55",
        speed: 0.1,
        ring: false,
      },

      {
        position: [22, 10, -90],
        size: 3,
        color: "#493653",
        speed: 0.08,
        ring: true,
      },
    ],
    []
  );

  return (
    <group>
      {/* Soft space lighting */}
      <ambientLight intensity={0.12} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
      />

      {planets.map((planet, index) => (
        <Planet
          key={index}
          {...planet}
        />
      ))}
    </group>
  );
}
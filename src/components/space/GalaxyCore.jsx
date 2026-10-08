import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function GalaxyCore() {
  const core = useRef();

  useFrame((state) => {
    if (!core.current) return;

    const pulse =
      1 +
      Math.sin(state.clock.elapsedTime * 2) * 0.08;

    core.current.scale.set(
      pulse,
      pulse,
      pulse
    );
  });

  return (
    <mesh ref={core}>
      <sphereGeometry args={[1.6, 64, 64]} />

      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.95}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}
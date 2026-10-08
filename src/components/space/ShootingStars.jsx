import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function createStar() {
  return {
    x: (Math.random() - 0.5) * 60,
    y: (Math.random() - 0.5) * 40,
    z: -60 + Math.random() * 90,
    speed: 4 + Math.random() * 8,
    length: 0.5 + Math.random() * 1.5,
  };
}

export default function ShootingStars() {
  const group = useRef();

  const stars = useMemo(
    () =>
      Array.from({ length: 60 }, () =>
        createStar()
      ),
    []
  );

  useFrame((state, delta) => {
    if (!group.current) return;

    /*
      Read current scroll velocity.
    */
    const scrollVelocity =
      window.__scrollVelocity || 0;

    /*
      Convert scrolling into space speed.
    */
    const acceleration =
      Math.min(
        Math.abs(scrollVelocity) * 0.08,
        18
      );

    group.current.children.forEach(
      (line, index) => {
        const star = stars[index];

        const speed =
          star.speed + acceleration;

        line.position.z +=
          speed * delta;

        /*
          Slight horizontal movement.
        */
        line.position.x -=
          speed * delta * 0.08;

        /*
          Stretch streak when scrolling fast.
        */
        const stretch =
          1 + acceleration * 0.12;

        line.scale.z = stretch;

        /*
          Brighter during fast scrolling.
        */
        line.material.opacity =
          Math.min(
            0.25 + acceleration * 0.04,
            0.95
          );

        /*
          Reset after passing camera.
        */
        if (line.position.z > 35) {
          line.position.z = -60;

          line.position.x =
            (Math.random() - 0.5) * 60;

          line.position.y =
            (Math.random() - 0.5) * 40;

          line.scale.z = 1;
        }
      }
    );
  });

  return (
    <group ref={group}>
      {stars.map((star, index) => (
        <mesh
          key={index}
          position={[
            star.x,
            star.y,
            star.z,
          ]}
          rotation={[0, 0, -0.25]}
        >
          <boxGeometry
            args={[
              0.025,
              0.025,
              star.length,
            ]}
          />

          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function NeuralNetwork() {
  const group = useRef();
  const nodesRef = useRef();
  const linesRef = useRef();

  const { nodes, linePositions } = useMemo(() => {
    const nodeCount = 90;
    const generatedNodes = [];

    for (let i = 0; i < nodeCount; i++) {
      generatedNodes.push({
        x: (Math.random() - 0.5) * 30,
        y: (Math.random() - 0.5) * 18,
        z: -5 - Math.random() * 35,
      });
    }

    const positions = [];

    for (let i = 0; i < generatedNodes.length; i++) {
      const a = generatedNodes[i];
      const nearby = [];

      for (let j = 0; j < generatedNodes.length; j++) {
        if (i === j) continue;

        const b = generatedNodes[j];

        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;

        const distance = Math.sqrt(
          dx * dx +
          dy * dy +
          dz * dz
        );

        if (distance < 5.5) {
          nearby.push({
            node: b,
            distance,
          });
        }
      }

      nearby
        .sort(
          (a, b) =>
            a.distance - b.distance
        )
        .slice(0, 2)
        .forEach(({ node }) => {
          positions.push(
            a.x,
            a.y,
            a.z,
            node.x,
            node.y,
            node.z
          );
        });
    }

    return {
      nodes: generatedNodes,
      linePositions: new Float32Array(
        positions
      ),
    };
  }, []);

  const nodePositions = useMemo(() => {
    const positions = new Float32Array(
      nodes.length * 3
    );

    nodes.forEach((node, i) => {
      positions[i * 3] = node.x;
      positions[i * 3 + 1] = node.y;
      positions[i * 3 + 2] = node.z;
    });

    return positions;
  }, [nodes]);

  useFrame((state, delta) => {
    if (!group.current) return;

    const scrollVelocity =
      window.__scrollVelocity || 0;

    const scrollPower = Math.min(
      scrollVelocity * 0.015,
      1
    );

    // Normal rotation
    const baseRotation = 0.025;

    // Scroll acceleration
    const rotationSpeed =
      baseRotation +
      scrollPower * 0.35;

    group.current.rotation.y +=
      delta * rotationSpeed;

    group.current.rotation.x =
      Math.sin(
        state.clock.elapsedTime * 0.15
      ) * 0.04;

    // Network expands while scrolling
    const targetScale =
      1 + scrollPower * 0.25;

    const currentScale =
      group.current.scale.x;

    const smoothScale =
      THREE.MathUtils.lerp(
        currentScale,
        targetScale,
        delta * 4
      );

    group.current.scale.set(
      smoothScale,
      smoothScale,
      smoothScale
    );

    // Network moves toward camera
    const targetZ =
      scrollPower * 2.5;

    group.current.position.z =
      THREE.MathUtils.lerp(
        group.current.position.z,
        targetZ,
        delta * 3
      );

    // Node glow
    if (nodesRef.current) {
      nodesRef.current.material.opacity =
        0.65 + scrollPower * 0.35;

      nodesRef.current.material.size =
        0.09 + scrollPower * 0.04;
    }

    // Connection glow
    if (linesRef.current) {
      linesRef.current.material.opacity =
        0.12 + scrollPower * 0.25;
    }
  });

  return (
    <group ref={group}>
      {/* Neural connections */}

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>

        <lineBasicMaterial
          color="#6677ff"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Neural nodes */}

      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodePositions.length / 3}
            array={nodePositions}
            itemSize={3}
          />
        </bufferGeometry>

        <pointsMaterial
          color="#ffffff"
          size={0.09}
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
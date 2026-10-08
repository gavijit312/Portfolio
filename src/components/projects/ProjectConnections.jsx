import { useMemo } from "react";
import * as THREE from "three";

export default function ProjectConnections({
  projects,
}) {
  const positions = useMemo(() => {
    const lines = [];

    for (
      let i = 0;
      i < projects.length - 1;
      i++
    ) {
      const a = projects[i].position;
      const b = projects[i + 1].position;

      lines.push(
        a[0],
        a[1],
        a[2],
        b[0],
        b[1],
        b[2]
      );
    }

    return new Float32Array(lines);
  }, [projects]);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <lineBasicMaterial
        color="#7c6cff"
        transparent
        opacity={0.18}
        blending={
          THREE.AdditiveBlending
        }
      />
    </lineSegments>
  );
}
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

/* ================================================================
   GALAXY
================================================================ */

function Galaxy() {
  const galaxyRef = useRef();

  const { positions, colors } = useMemo(() => {
    const count = 9000;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color = new THREE.Color();

    const arms = 4;

    for (let i = 0; i < count; i++) {
      const radius =
        Math.pow(Math.random(), 0.62) * 30;

      const arm =
        Math.floor(Math.random() * arms);

      const armAngle =
        (arm / arms) * Math.PI * 2;

      const spiralAngle =
        armAngle + radius * 0.3;

      const spread =
        0.55 + radius * 0.035;

      const randomAngle =
        (Math.random() - 0.5) * spread;

      const angle =
        spiralAngle + randomAngle;

      positions[i * 3] =
        Math.cos(angle) * radius;

      positions[i * 3 + 1] =
        (Math.random() - 0.5) *
        (0.25 + radius * 0.035);

      positions[i * 3 + 2] =
        Math.sin(angle) * radius;

      const distance = radius / 30;

      if (distance < 0.12) {
        color.setHSL(
          0.10,
          0.95,
          0.85
        );
      } else if (distance < 0.35) {
        color.setHSL(
          0.55 + Math.random() * 0.08,
          0.95,
          0.65 + Math.random() * 0.25
        );
      } else if (distance < 0.7) {
        color.setHSL(
          0.68 + Math.random() * 0.08,
          0.9,
          0.55 + Math.random() * 0.25
        );
      } else {
        color.setHSL(
          0.82 + Math.random() * 0.12,
          0.85,
          0.45 + Math.random() * 0.25
        );
      }

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
    if (!galaxyRef.current) return;

    const scrollVelocity =
      window.__scrollVelocity || 0;

    const mouseX =
      window.__mouseX || 0;

    const mouseY =
      window.__mouseY || 0;

    /*
      Normal rotation + scroll acceleration
    */

    galaxyRef.current.rotation.y +=
      delta *
      (
        0.035 +
        Math.abs(scrollVelocity) * 0.035
      );

    /*
      Mouse bending
    */

    galaxyRef.current.rotation.x =
      THREE.MathUtils.lerp(
        galaxyRef.current.rotation.x,
        mouseY * 0.08,
        delta * 2
      );

    galaxyRef.current.rotation.z =
      THREE.MathUtils.lerp(
        galaxyRef.current.rotation.z,
        mouseX * 0.08,
        delta * 2
      );
  });

  return (
    <points ref={galaxyRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />

        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.085}
        vertexColors
        transparent
        opacity={1}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}


/* ================================================================
   GALAXY CORE
================================================================ */

function GalaxyCore() {
  const coreRef = useRef();

  useFrame((state) => {
    if (!coreRef.current) return;

    const pulse =
      1 +
      Math.sin(
        state.clock.elapsedTime * 2.5
      ) * 0.1;

    coreRef.current.scale.set(
      pulse,
      pulse,
      pulse
    );
  });

  return (
    <>
      <mesh ref={coreRef}>
        <sphereGeometry
          args={[1.7, 48, 48]}
        />

        <meshBasicMaterial
          color="#fff4c7"
        />
      </mesh>

      <mesh scale={1.8}>
        <sphereGeometry
          args={[1.7, 32, 32]}
        />

        <meshBasicMaterial
          color="#ff9d2e"
          transparent
          opacity={0.18}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh scale={3}>
        <sphereGeometry
          args={[1.7, 32, 32]}
        />

        <meshBasicMaterial
          color="#7b5cff"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
}


/* ================================================================
   NEBULA
================================================================ */

function Nebula() {
  const nebulaRef = useRef();

  const { positions, colors } = useMemo(() => {
    const count = 5000;

    const positions =
      new Float32Array(count * 3);

    const colors =
      new Float32Array(count * 3);

    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const radius =
        Math.random() * 38;

      const angle =
        Math.random() * Math.PI * 2;

      const x =
        Math.cos(angle) *
        radius *
        (0.8 + Math.random() * 0.6);

      const y =
        (Math.random() - 0.5) * 14;

      const z =
        Math.sin(angle) *
        radius *
        (0.35 + Math.random() * 0.6);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const type = Math.random();

      if (type < 0.35) {
        color.setHSL(
          0.58,
          0.95,
          0.6
        );
      } else if (type < 0.65) {
        color.setHSL(
          0.72,
          0.9,
          0.55
        );
      } else if (type < 0.85) {
        color.setHSL(
          0.9,
          0.9,
          0.55
        );
      } else {
        color.setHSL(
          0.96,
          0.85,
          0.6
        );
      }

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
    if (!nebulaRef.current) return;

    nebulaRef.current.rotation.y -=
      delta * 0.01;

    nebulaRef.current.rotation.z +=
      delta * 0.002;
  });

  return (
    <points ref={nebulaRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />

        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.2}
        vertexColors
        transparent
        opacity={0.13}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}


/* ================================================================
   PLANET
================================================================ */

function Planet({
  position,
  size,
  color,
  glow,
  speed,
  ring = false,
}) {
  const planetRef = useRef();
  const ringRef = useRef();

  useFrame((_, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y +=
        delta * speed;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z +=
        delta * speed * 0.4;
    }
  });

  return (
    <group position={position}>
      <mesh ref={planetRef}>
        <sphereGeometry
          args={[size, 48, 48]}
        />

        <meshStandardMaterial
          color={color}
          roughness={0.55}
          metalness={0.2}
          emissive={glow}
          emissiveIntensity={0.25}
        />
      </mesh>

      <mesh scale={1.12}>
        <sphereGeometry
          args={[size, 32, 32]}
        />

        <meshBasicMaterial
          color={glow}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

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
              size * 1.35,
              size * 1.8,
              80,
            ]}
          />

          <meshBasicMaterial
            color={glow}
            transparent
            opacity={0.65}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </group>
  );
}


/* ================================================================
   PLANETS
================================================================ */

function Planets() {
  return (
    <>
      <ambientLight
        intensity={0.35}
      />

      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
      />

      <pointLight
        position={[0, 0, 5]}
        color="#7755ff"
        intensity={20}
        distance={80}
      />

      <Planet
        position={[-18, 7, -35]}
        size={2.4}
        color="#243b8f"
        glow="#4f7cff"
        speed={0.12}
        ring
      />

      <Planet
        position={[18, -6, -50]}
        size={1.6}
        color="#713c27"
        glow="#ff733c"
        speed={0.16}
      />

      <Planet
        position={[-15, -8, -70]}
        size={1.2}
        color="#176477"
        glow="#35d9ff"
        speed={0.1}
      />

      <Planet
        position={[22, 10, -90]}
        size={3}
        color="#61347d"
        glow="#c45cff"
        speed={0.08}
        ring
      />
    </>
  );
}


/* ================================================================
   FALLING STAR FIELD
================================================================ */

function FallingStars() {
  const groupRef = useRef();

  const stars = useMemo(() => {
    const count = 1400;

    return Array.from(
      { length: count },
      () => ({
        x:
          (Math.random() - 0.5) * 90,

        y:
          (Math.random() - 0.5) * 60,

        z:
          -Math.random() * 180,

        size:
          0.015 +
          Math.random() * 0.045,

        speed:
          4 +
          Math.random() * 12,

        opacity:
          0.35 +
          Math.random() * 0.5,
      })
    );
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const velocity =
      Math.abs(
        window.__scrollVelocity || 0
      );

    groupRef.current.children.forEach(
      (star, index) => {
        const data = stars[index];

        const movement =
          data.speed +
          velocity * 35;

        star.position.z +=
          movement * delta;

        if (star.position.z > 15) {
          star.position.z =
            -180 -
            Math.random() * 40;

          star.position.x =
            (Math.random() - 0.5) * 90;

          star.position.y =
            (Math.random() - 0.5) * 60;
        }
      }
    );
  });

  return (
    <group ref={groupRef}>
      {stars.map((star, index) => (
        <mesh
          key={index}
          position={[
            star.x,
            star.y,
            star.z,
          ]}
        >
          <sphereGeometry
            args={[
              star.size,
              4,
              4,
            ]}
          />

          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={star.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}


/* ================================================================
   STAR STREAKS
================================================================ */

function StarStreaks() {
  const groupRef = useRef();

  const streaks = useMemo(() => {
    const count = 180;

    return Array.from(
      { length: count },
      () => ({
        x:
          (Math.random() - 0.5) * 80,

        y:
          (Math.random() - 0.5) * 55,

        z:
          -20 -
          Math.random() * 150,

        speed:
          8 +
          Math.random() * 15,

        length:
          0.3 +
          Math.random() * 1.5,
      })
    );
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const velocity =
      Math.abs(
        window.__scrollVelocity || 0
      );

    groupRef.current.children.forEach(
      (streak, index) => {
        const data =
          streaks[index];

        const speed =
          data.speed +
          velocity * 50;

        streak.position.z +=
          speed * delta;

        const targetScale =
          1 +
          velocity * 3;

        streak.scale.z =
          THREE.MathUtils.lerp(
            streak.scale.z,
            targetScale,
            delta * 8
          );

        if (
          streak.position.z >
          20
        ) {
          streak.position.z =
            -170 -
            Math.random() * 50;

          streak.position.x =
            (Math.random() - 0.5) * 80;

          streak.position.y =
            (Math.random() - 0.5) * 55;
        }
      }
    );
  });

  return (
    <group ref={groupRef}>
      {streaks.map(
        (streak, index) => (
          <mesh
            key={index}
            position={[
              streak.x,
              streak.y,
              streak.z,
            ]}
          >
            <boxGeometry
              args={[
                0.018,
                0.018,
                streak.length,
              ]}
            />

            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.75}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        )
      )}
    </group>
  );
}


/* ================================================================
   SHOOTING STARS
================================================================ */

function ShootingStars() {
  const groupRef = useRef();

  const stars = useMemo(() => {
    return Array.from(
      { length: 50 },
      () => ({
        x:
          (Math.random() - 0.5) * 70,

        y:
          (Math.random() - 0.5) * 45,

        z:
          -20 -
          Math.random() * 100,

        speed:
          3 +
          Math.random() * 8,

        length:
          0.5 +
          Math.random() * 2,
      })
    );
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const velocity =
      Math.abs(
        window.__scrollVelocity || 0
      );

    groupRef.current.children.forEach(
      (line, index) => {
        const star =
          stars[index];

        const speed =
          star.speed +
          velocity * 12;

        line.position.z +=
          speed * delta;

        line.position.x -=
          speed * delta * 0.08;

        if (
          line.position.z > 30
        ) {
          line.position.z = -100;

          line.position.x =
            (Math.random() - 0.5) * 70;

          line.position.y =
            (Math.random() - 0.5) * 45;
        }
      }
    );
  });

  return (
    <group ref={groupRef}>
      {stars.map(
        (star, index) => (
          <mesh
            key={index}
            position={[
              star.x,
              star.y,
              star.z,
            ]}
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
              opacity={0.8}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )
      )}
    </group>
  );
}


/* ================================================================
   NEURAL NETWORK
================================================================ */

function NeuralNetwork() {
  const groupRef = useRef();

  const {
    nodes,
    connections,
  } = useMemo(() => {
    const generatedNodes = [];

    const nodeCount = 75;

    for (let i = 0; i < nodeCount; i++) {
      generatedNodes.push({
        x:
          (Math.random() - 0.5) * 30,

        y:
          (Math.random() - 0.5) * 18,

        z:
          -15 -
          Math.random() * 45,
      });
    }

    const generatedConnections = [];

    for (
      let i = 0;
      i < generatedNodes.length;
      i++
    ) {
      const a =
        generatedNodes[i];

      let closest = null;
      let closestDistance = Infinity;

      for (
        let j = 0;
        j < generatedNodes.length;
        j++
      ) {
        if (i === j) continue;

        const b =
          generatedNodes[j];

        const dx =
          a.x - b.x;

        const dy =
          a.y - b.y;

        const dz =
          a.z - b.z;

        const distance =
          Math.sqrt(
            dx * dx +
            dy * dy +
            dz * dz
          );

        if (
          distance <
            closestDistance &&
          distance < 7
        ) {
          closest = b;
          closestDistance = distance;
        }
      }

      if (closest) {
        generatedConnections.push([
          a,
          closest,
        ]);
      }
    }

    return {
      nodes: generatedNodes,
      connections: generatedConnections,
    };
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y +=
      delta * 0.025;

    groupRef.current.rotation.x +=
      delta * 0.004;
  });

  const nodePositions =
    useMemo(() => {
      const array =
        new Float32Array(
          nodes.length * 3
        );

      nodes.forEach(
        (node, index) => {
          array[index * 3] =
            node.x;

          array[index * 3 + 1] =
            node.y;

          array[index * 3 + 2] =
            node.z;
        }
      );

      return array;
    }, [nodes]);

  const linePositions =
    useMemo(() => {
      const array =
        new Float32Array(
          connections.length * 6
        );

      connections.forEach(
        ([a, b], index) => {
          array[index * 6] =
            a.x;

          array[index * 6 + 1] =
            a.y;

          array[index * 6 + 2] =
            a.z;

          array[index * 6 + 3] =
            b.x;

          array[index * 6 + 4] =
            b.y;

          array[index * 6 + 5] =
            b.z;
        }
      );

      return array;
    }, [connections]);

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={linePositions}
            count={linePositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>

        <lineBasicMaterial
          color="#7c6cff"
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={nodePositions}
            count={nodePositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>

        <pointsMaterial
          color="#b9b3ff"
          size={0.13}
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}


/* ================================================================
   CINEMATIC CAMERA
================================================================ */

function CameraController() {
  const mouse = useRef({
    x: 0,
    y: 0,
  });

  const smoothMouse = useRef({
    x: 0,
    y: 0,
  });

  const scrollVelocity = useRef(0);

  const lastScroll = useRef(0);

  useEffect(() => {
    /* ------------------------------------------------------------
       MOUSE
    ------------------------------------------------------------ */

    const handleMouseMove = (event) => {
      const x =
        (event.clientX /
          window.innerWidth) *
          2 -
        1;

      const y =
        (event.clientY /
          window.innerHeight) *
          2 -
        1;

      mouse.current.x = x;
      mouse.current.y = y;

      window.__mouseX = x;
      window.__mouseY = y;
    };

    /* ------------------------------------------------------------
       SCROLL
    ------------------------------------------------------------ */

    const handleScroll = () => {
      const currentScroll =
        window.scrollY;

      const difference =
        currentScroll -
        lastScroll.current;

      scrollVelocity.current =
        THREE.MathUtils.clamp(
          difference * 0.1,
          -3,
          3
        );

      lastScroll.current =
        currentScroll;
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  useFrame((state, delta) => {
    const camera =
      state.camera;

    /* ------------------------------------------------------------
       SCROLL PROGRESS
    ------------------------------------------------------------ */

    const scrollY =
      window.scrollY || 0;

    const vh =
      window.innerHeight || 1;

    const progress =
      scrollY / vh;

    /* ------------------------------------------------------------
       CAMERA DEPTH
    ------------------------------------------------------------ */

    const targetZ =
      8 -
      progress * 28;

    /* ------------------------------------------------------------
       SMOOTH MOUSE
    ------------------------------------------------------------ */

    smoothMouse.current.x =
      THREE.MathUtils.lerp(
        smoothMouse.current.x,
        mouse.current.x,
        delta * 4
      );

    smoothMouse.current.y =
      THREE.MathUtils.lerp(
        smoothMouse.current.y,
        mouse.current.y,
        delta * 4
      );

    const mouseX =
      smoothMouse.current.x *
      1.8;

    const mouseY =
      -smoothMouse.current.y *
      1.2;

    /* ------------------------------------------------------------
       CINEMATIC MOVEMENT
    ------------------------------------------------------------ */

    const cinematicX =
      Math.sin(
        progress * 0.7
      ) * 1.5;

    const cinematicY =
      Math.cos(
        progress * 0.6
      ) * 0.8;

    const targetX =
      cinematicX + mouseX;

    const targetY =
      cinematicY + mouseY;

    /* ------------------------------------------------------------
       CAMERA POSITION
    ------------------------------------------------------------ */

    camera.position.x =
      THREE.MathUtils.lerp(
        camera.position.x,
        targetX,
        delta * 4
      );

    camera.position.y =
      THREE.MathUtils.lerp(
        camera.position.y,
        targetY,
        delta * 4
      );

    camera.position.z =
      THREE.MathUtils.lerp(
        camera.position.z,
        targetZ,
        delta * 5
      );

    /* ------------------------------------------------------------
       CAMERA TILT
    ------------------------------------------------------------ */

    const velocity =
      scrollVelocity.current;

    const targetRotationZ =
      -smoothMouse.current.x * 0.025 +
      velocity * 0.025;

    /* ------------------------------------------------------------
       FIELD OF VIEW
    ------------------------------------------------------------ */

    const baseFov = 60;

    const targetFov =
      baseFov +
      Math.abs(velocity) * 8;

    camera.fov =
      THREE.MathUtils.lerp(
        camera.fov,
        targetFov,
        delta * 5
      );

    camera.updateProjectionMatrix();

    /* ------------------------------------------------------------
       LOOK DIRECTION
    ------------------------------------------------------------ */

    camera.lookAt(
      targetX * 0.2,
      targetY * 0.2,
      targetZ - 20
    );

    /*
      lookAt changes rotation,
      so restore the cinematic roll.
    */

    camera.rotation.z =
      THREE.MathUtils.lerp(
        camera.rotation.z,
        targetRotationZ,
        delta * 3
      );

    /* ------------------------------------------------------------
       VELOCITY DECAY
    ------------------------------------------------------------ */

    scrollVelocity.current =
      THREE.MathUtils.lerp(
        scrollVelocity.current,
        0,
        delta * 2.5
      );

    window.__scrollVelocity =
      scrollVelocity.current;
  });

  return null;
}


/* ================================================================
   MAIN SPACE
================================================================ */

export default function SpaceBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        background: "#000005",
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 60,
          near: 0.1,
          far: 300,
        }}
        dpr={1}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference:
            "high-performance",
        }}
      >
        <color
          attach="background"
          args={["#000005"]}
        />

        <CameraController />

        <Galaxy />

        <GalaxyCore />

        <Nebula />

        <Planets />

        <FallingStars />

        <StarStreaks />

        <ShootingStars />

        <NeuralNetwork />
      </Canvas>
    </div>
  );
}
import {
  useMemo,
  useState,
} from "react";

import {
  Canvas,
  useFrame,
} from "@react-three/fiber";

import {
  OrbitControls,
} from "@react-three/drei";

import * as THREE from "three";

import ProjectNode from "./ProjectNode";
import ProjectConnections from "./ProjectConnections";


/* =========================================================
   PROJECT DATA
========================================================= */

const projects = [
  {
    id: "crag",

    title:
      "Corrective RAG",

    description:
      "An advanced retrieval system combining dense retrieval, BM25 sparse search, CrossEncoder reranking and retrieval quality evaluation.",

    technologies: [
      "Python",
      "FAISS",
      "BM25",
      "CrossEncoder",
      "RAG",
      "FastAPI",
    ],

    color: "#7c6cff",

    size: 1.25,

    position: [
      -5,
      1.5,
      -8,
    ],

    github:
      "https://github.com/gavijit312",
  },

  {
    id: "duediligence",

    title:
      "AI Due Diligence Copilot",

    description:
      "A multi-agent AI system for legal, financial, compliance and risk analysis using LangGraph and RAG.",

    technologies: [
      "LangGraph",
      "LangChain",
      "RAG",
      "FastAPI",
      "Streamlit",
      "LLM",
    ],

    color: "#ff6b9d",

    size: 1.05,

    position: [
      4,
      2,
      -14,
    ],

    github:
      "https://github.com/gavijit312",
  },

  {
    id: "isl",

    title:
      "Indian Sign Language Recognition",

    description:
      "A computer vision system using MediaPipe landmarks and deep learning to recognize Indian Sign Language gestures and sentences.",

    technologies: [
      "Python",
      "MediaPipe",
      "PyTorch",
      "Bi-LSTM",
      "Attention",
      "Computer Vision",
    ],

    color: "#35d9ff",

    size: 1.35,

    position: [
      -4,
      -2,
      -20,
    ],

    github:
      "https://github.com/gavijit312",
  },

  {
    id: "skin",

    title:
      "Skin Cancer Detector",

    description:
      "A deep learning computer vision system trained on dermatology images for multi-class skin lesion classification.",

    technologies: [
      "TensorFlow",
      "Python",
      "CNN",
      "HAM10000",
      "OpenCV",
    ],

    color: "#ff9d4d",

    size: 0.95,

    position: [
      5,
      -1,
      -26,
    ],

    github:
      "https://github.com/gavijit312",
  },

  {
    id: "authenticity",

    title:
      "Image Authenticity Detector",

    description:
      "A deep learning system designed to distinguish AI-generated images from real images using EfficientNet.",

    technologies: [
      "PyTorch",
      "EfficientNet",
      "Computer Vision",
      "Deep Learning",
    ],

    color: "#b56cff",

    size: 1.1,

    position: [
      -2,
      3,
      -32,
    ],

    github:
      "https://github.com/gavijit312",
  },
];


/* =========================================================
   GALAXY PROJECT FIELD
========================================================= */

function ProjectField({
  onSelect,
}) {
  const groupRef = useMemo(
    () => new THREE.Group(),
    []
  );

  useFrame(
    (_, delta) => {
      groupRef.rotation.y +=
        delta * 0.015;
    }
  );

  return (
    <group ref={groupRef}>
      <ProjectConnections
        projects={projects}
      />

      {projects.map(
        (project) => (
          <ProjectNode
            key={project.id}
            project={project}
            position={
              project.position
            }
            onSelect={onSelect}
          />
        )
      )}
    </group>
  );
}


/* =========================================================
   MAIN PROJECT UNIVERSE
========================================================= */

export default function ProjectUniverse() {
  const [selected, setSelected] =
    useState(null);

  return (
    <section
      id="projects"
      style={{
        position: "relative",
        minHeight: "140vh",
        width: "100%",
      }}
    >
      {/* Section heading */}

      <div
        style={{
          position: "absolute",
          top: "15%",
          left: 0,
          right: 0,
          zIndex: 20,
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "10px",
            letterSpacing: "5px",
            color:
              "rgba(255,255,255,0.35)",
          }}
        >
          THE UNIVERSE OF MY WORK
        </p>

        <h2
          style={{
            margin:
              "18px 0 0",
            fontSize:
              "clamp(55px, 9vw, 120px)",
            lineHeight: 0.9,
            letterSpacing:
              "-0.07em",
            color: "#ffffff",
          }}
        >
          PROJECTS
        </h2>
      </div>


      {/* 3D universe */}

      <div
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        <Canvas
          camera={{
            position: [
              0,
              0,
              5,
            ],

            fov: 55,

            near: 0.1,

            far: 200,
          }}
        >
          <color
            attach="background"
            args={[
              "#000005",
            ]}
          />

          <ambientLight
            intensity={0.3}
          />

          <pointLight
            position={[
              0,
              5,
              5,
            ]}
            intensity={25}
            color="#7c6cff"
          />

          <ProjectField
            onSelect={setSelected}
          />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
          />
        </Canvas>
      </div>


      {/* Selected project */}

      {selected && (
        <div
          style={{
            position:
              "absolute",

            left: "50%",

            bottom: "8%",

            transform:
              "translateX(-50%)",

            width:
              "min(90%, 500px)",

            padding:
              "25px",

            border:
              "1px solid rgba(255,255,255,0.12)",

            borderRadius:
              "20px",

            background:
              "rgba(5,5,15,0.75)",

            backdropFilter:
              "blur(20px)",

            zIndex: 30,

            color: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems:
                "center",

              justifyContent:
                "space-between",
            }}
          >
            <h3
              style={{
                margin: 0,

                fontSize:
                  "22px",
              }}
            >
              {selected.title}
            </h3>

            <button
              onClick={() =>
                setSelected(null)
              }
              style={{
                border: "none",

                background:
                  "rgba(255,255,255,0.08)",

                color: "white",

                width: "30px",

                height: "30px",

                borderRadius:
                  "50%",

                cursor:
                  "pointer",
              }}
            >
              ×
            </button>
          </div>

          <p
            style={{
              margin:
                "15px 0",

              fontSize:
                "13px",

              lineHeight: 1.7,

              color:
                "rgba(255,255,255,0.55)",
            }}
          >
            {selected.description}
          </p>

          <div
            style={{
              display: "flex",

              flexWrap:
                "wrap",

              gap: "7px",
            }}
          >
            {selected.technologies.map(
              (tech) => (
                <span
                  key={tech}
                  style={{
                    padding:
                      "6px 9px",

                    borderRadius:
                      "999px",

                    background:
                      "rgba(255,255,255,0.06)",

                    border:
                      "1px solid rgba(255,255,255,0.08)",

                    fontSize:
                      "10px",

                    color:
                      "rgba(255,255,255,0.65)",
                  }}
                >
                  {tech}
                </span>
              )
            )}
          </div>

          <a
            href={
              selected.github
            }
            target="_blank"
            rel="noreferrer"
            style={{
              display:
                "inline-block",

              marginTop:
                "18px",

              padding:
                "10px 16px",

              borderRadius:
                "999px",

              background:
                "white",

              color:
                "black",

              fontSize:
                "11px",

              fontWeight:
                600,
            }}
          >
            View on GitHub ↗
          </a>
        </div>
      )}
    </section>
  );
}
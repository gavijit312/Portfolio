import SpaceBackground from "./components/space/SpaceBackground";
import Hero from "./components/hero/Hero";
import ProjectUniverse from "./components/projects/ProjectUniverse";

function App() {
  return (
    <main
      style={{
        minHeight: "400vh",
        background: "#000005",
        color: "white",
        position: "relative",
      }}
    >
      <SpaceBackground />

      <div
        style={{
          position: "relative",
          zIndex: 10,
        }}
      >
        <Hero />

        <ProjectUniverse />

        <section
          id="contact"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "5px",
                color:
                  "rgba(255,255,255,0.35)",
              }}
            >
              FINAL TRANSMISSION
            </p>

            <h2
              style={{
                marginTop: "20px",
                fontSize:
                  "clamp(50px, 8vw, 110px)",
                letterSpacing:
                  "-0.06em",
              }}
            >
              LET'S BUILD.
            </h2>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
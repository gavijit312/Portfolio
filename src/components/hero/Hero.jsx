import "./Hero.css";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">

        {/* Status */}
        <div className="hero-status">
          <span className="status-dot" />
          <span>AI / ML • GENERATIVE AI</span>
        </div>

        {/* Name */}
        <h1 className="hero-title">
          <span>AVIJIT</span>
          <span className="hero-title-muted">
            GHOSH
          </span>
        </h1>

        {/* Tagline */}
        <p className="hero-tagline">
          BUILDING INTELLIGENCE
        </p>

        {/* Description */}
        <p className="hero-description">
          AI/ML developer focused on Generative AI,
          LLM systems, computer vision and intelligent
          applications.
        </p>

        {/* Buttons */}
        <div className="hero-actions">

          <a
            href="#projects"
            className="hero-button hero-button-primary"
          >
            Explore Work
            <span>↓</span>
          </a>

          <a
            href="https://github.com/gavijit312"
            target="_blank"
            rel="noreferrer"
            className="hero-button hero-button-secondary"
          >
            GitHub
            <span>↗</span>
          </a>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll">
        <span>DESCEND</span>

        <div className="scroll-arrow">
          ↓
        </div>
      </div>
    </section>
  );
}
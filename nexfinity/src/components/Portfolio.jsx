import { useState, useEffect, useRef } from "react";
import Reveal from "./reveal";
import { works, LINKS } from "../data";

const filters = [
  ["all", "All"],
  ["web", "Web"],
  ["brand", "Branding"],
  ["social", "Social"],
];

// muted looping preview: plays when on screen, pauses when off screen
function PreviewVideo({ src, poster }) {
  const ref = useRef(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.5 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="work-img"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}

export default function Portfolio() {
  const [f, setF] = useState("all");
  const [open, setOpen] = useState(null); // work whose video is open
  const shown = works.filter((w) => f === "all" || w.cat === f);

  // close the player with the Escape key
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="work">
      <div className="wrap">
        <span className="tag">Portfolio</span>
        <h2>
          Selected <span className="g">work</span>
        </h2>
        <p className="lead">
          A taste of what we've built. Explore the full archive on Dribbble and
          Google Drive.
        </p>

        <div className="filters">
          {filters.map(([k, l]) => (
            <button
              key={k}
              className={f === k ? "on" : ""}
              onClick={() => setF(k)}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="grid">
          {shown.map((w) => (
            <Reveal
              as="a"
              key={w.title}
              href={w.href}
              className="work"
              style={{ "--bgp": w.bg }}
              onClick={
                w.video
                  ? (e) => {
                      e.preventDefault();
                      setOpen(w);
                    }
                  : undefined
              }
            >
              {w.video ? (
                <>
                  <PreviewVideo src={w.video} poster={w.img} />
                  <span className="play-badge">▶</span>
                </>
              ) : (
                w.img && (
                  <img
                    className="work-img"
                    src={w.img}
                    alt={w.title}
                    loading="lazy"
                  />
                )
              )}
              <div>
                <small>{w.tag}</small>
                <h3>{w.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="cta center">
          <a
            className="btn p"
            href={LINKS.dribbble}
            target="_blank"
            rel="noreferrer"
          >
            Browse Dribbble ↗
          </a>
          <a
            className="btn"
            href={LINKS.drive}
            target="_blank"
            rel="noreferrer"
          >
            Full portfolio on Google Drive ↗
          </a>
        </div>
      </div>

      {open && (
        <div className="lightbox" onClick={() => setOpen(null)}>
          <button className="lb-close" onClick={() => setOpen(null)}>
            ✕
          </button>
          <video
            src={open.video}
            poster={open.img}
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
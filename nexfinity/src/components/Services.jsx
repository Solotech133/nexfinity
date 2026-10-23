import Reveal from "./reveal";
import { services } from "../data";

// Card with a cursor-following spotlight
function Card({ s, i }) {
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <Reveal className={`card ${s.wide ? "w2" : ""}`} delay={i * 70} onPointerMove={move}>
      <div className="ic">{s.icon}</div>
      <h3>{s.title}</h3>
      <p>{s.text}</p>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="services">
      <div className="wrap">
        <span className="tag">What we do</span>
        <h2>Everything your brand needs, <span className="g">one crew.</span></h2>
        <p className="lead">Strategy, design and engineering under one roof — so your idea moves from concept to launch fast.</p>
        <div className="bento">{services.map((s, i) => <Card key={s.title} s={s} i={i} />)}</div>
      </div>
    </section>
  );
}
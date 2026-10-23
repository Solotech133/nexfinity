import { useState } from "react";
import Reveal from "./reveal.jsx";
import { plans } from "../data";

export default function Pricing() {
  const [monthly, setMonthly] = useState(true);
  return (
    <section id="pricing">
      <div className="wrap center-text">
        <span className="tag">Pricing</span>
        <h2>Simple plans, <span className="g">serious results</span></h2>
        <div className="toggle">
          <button className={monthly ? "on" : ""} onClick={() => setMonthly(true)}>Monthly</button>
          <button className={!monthly ? "on" : ""} onClick={() => setMonthly(false)}>Project</button>
        </div>
        <div className="plans">
          {plans.map((p, i) => (
            <Reveal key={p.name} className={`plan ${p.pop ? "pop" : ""}`} delay={i * 80}>
              <h3>{p.name}</h3>
              <div className="price">
                {monthly ? p.monthly : p.project}
                {p.monthly !== "Custom" && <small>{monthly ? " /mo" : " /project"}</small>}
              </div>
              <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
              <a href="#contact" className={`btn ${p.pop ? "p" : ""}`}>{p.cta}</a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
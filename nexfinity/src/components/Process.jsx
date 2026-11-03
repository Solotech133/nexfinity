import Reveal from "./reveal";
import { steps } from "../data";

export default function Process() {
  return (
    <section id="process">
      <div className="wrap">
        <span className="tag">How we work</span>
        <h2>From idea to launch in <span className="g">4 steps</span></h2>
        <div className="steps">
          {steps.map((s, i) => (
            <Reveal key={s.title} className="step" delay={i * 80}>
              <em>0{i + 1}</em>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
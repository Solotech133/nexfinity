import Reveal from "./reveal";
import { quotes } from "../data";

export default function Testimonials() {
  return (
    <section>
      <div className="wrap">
        <span className="tag">Loved by founders</span>
        <h2>What clients <span className="g">say</span></h2>
        <div className="quotes">
          {quotes.map((q, i) => (
            <Reveal key={q.by} className="card" delay={i * 80}>
              <p>“{q.text}”</p>
              <small>— {q.by}</small>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
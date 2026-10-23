import { faqs } from "../data";

export default function FAQ() {
  return (
    <section id="faq">
      <div className="wrap center-text">
        <span className="tag">FAQ</span>
        <h2>Questions? <span className="g">Answered.</span></h2>
        <div className="faq">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
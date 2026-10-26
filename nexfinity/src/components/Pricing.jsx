
import { useState } from "react";
import Reveal from "./reveal.jsx";
import { plans } from "../data";

export default function Pricing() {
  const [monthly, setMonthly] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [message, setMessage] = useState("");

  const handlePlanSelect = (plan) => {
    const billingType = monthly ? "Monthly subscription" : "One-time project";
    const price = monthly ? plan.monthly : plan.project;
    const features = monthly
      ? plan.monthlyFeatures ?? plan.features ?? []
      : plan.projectFeatures ?? plan.features ?? [];

    setSelectedPlan({
      name: plan.name,
      billingType,
      price,
      features,
    });

    setMessage(
      `Hello Nexfinity,\n\nI'm interested in the ${plan.name} plan.\n\n` +
      `Billing type: ${billingType}\nPrice: ${price}\n\n` +
      `Selected features:\n${features.map((f) => `- ${f}`).join("\n")}\n\n` +
      "Please contact me with the next steps."
    );

    document.getElementById("pricing-inquiry")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleSendEmail = (e) => {
    e.preventDefault();

    if (!selectedPlan) return;

    const subject = `${selectedPlan.name} Plan Inquiry - Nexfinity`;

    const body =
      `Client name: ${clientName}\n` +
      `Client email: ${clientEmail}\n\n` +
      message;

    const mailto =
      `mailto:nexfinity97@gmail.com?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  };

  return (
    <section id="pricing">
      <div className="wrap center-text">
        <span className="tag">Pricing</span>
        <h2>
          Simple plans, <span className="g">serious results</span>
        </h2>

        <div className="toggle">
          <button
            type="button"
            className={monthly ? "on" : ""}
            onClick={() => setMonthly(true)}
          >
            Monthly
          </button>

          <button
            type="button"
            className={!monthly ? "on" : ""}
            onClick={() => setMonthly(false)}
          >
            Project
          </button>
        </div>

        <div className="plans">
          {plans.map((p, i) => (
            <Reveal
              key={p.name}
              className={`plan ${p.pop ? "pop" : ""}`}
              delay={i * 80}
            >
              <h3>{p.name}</h3>

              <div className="price">
                {monthly ? p.monthly : p.project}
                {(monthly ? p.monthly : p.project) !== "Custom" && (
                  <small>{monthly ? " /mo" : " /project"}</small>
                )}
              </div>

              <ul>
                {(monthly
                  ? p.monthlyFeatures ?? p.features ?? []
                  : p.projectFeatures ?? p.features ?? []
                ).map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <button
                type="button"
                className={`btn ${p.pop ? "p" : ""}`}
                onClick={() => handlePlanSelect(p)}
              >
                {p.cta}
              </button>
            </Reveal>
          ))}
        </div>

        {selectedPlan && (
          <div id="pricing-inquiry" className="pricing-inquiry">
            <h3>Let's work together</h3>
            <p>
              Your {selectedPlan.name} plan is selected.
              {" "}{selectedPlan.billingType}: {selectedPlan.price}
            </p>

            <form onSubmit={handleSendEmail}>
              <label htmlFor="client-name">Your name</label>
              <input
                id="client-name"
                type="text"
                placeholder="Enter your name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
              />

              <label htmlFor="client-email">Your email</label>
              <input
                id="client-email"
                type="email"
                placeholder="Enter your email address"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                required
              />

              <label htmlFor="inquiry-message">Inquiry details</label>
              <textarea
                id="inquiry-message"
                rows="9"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />

              <button type="submit" className="btn p">
                Send Email
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

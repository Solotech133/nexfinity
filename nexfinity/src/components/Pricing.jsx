
import { useEffect, useState } from "react";
import Reveal from "./reveal.jsx";
import { plans } from "../data";
import "./Pricing.css";

export default function Pricing() {
  const [monthly, setMonthly] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!selectedPlan) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") setSelectedPlan(null);
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [selectedPlan]);

  function selectPlan(plan) {
    const billingType = monthly ? "Monthly subscription" : "One-time project";
    const price = monthly ? plan.monthly : plan.project;
    const features = monthly
      ? plan.monthlyFeatures
      : plan.projectFeatures;

    setSelectedPlan({
      ...plan,
      billingType,
      price,
      features,
    });

    setClientName("");
    setClientEmail("");
    setMessage(
      `Hello Nexfinity,\n\nI am interested in the ${plan.name} plan.\n\n` +
      `Billing type: ${billingType}\nPrice: ${price}\n\n` +
      `Selected services:\n${features.map((feature) => `• ${feature}`).join("\n")}\n\n` +
      "Please contact me to discuss the next steps."
    );
  }

  function sendEmail(event) {
    event.preventDefault();
    if (!selectedPlan) return;

    const subject = `${selectedPlan.name} Plan Inquiry - Nexfinity`;

    const body =
      `Name: ${clientName}\n` +
      `Email: ${clientEmail}\n\n` +
      message;

    window.location.href =
      `mailto:nexfinity97@gmail.com?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
  }

  return (
    <section id="pricing">
      <div className="wrap center-text">
        <span className="tag">Pricing</span>

        <h2>
          Simple plans, <span className="g">serious results</span>
        </h2>

        <p className="pricing-intro">
          Flexible options for businesses ready to build, grow, and scale.
        </p>

        <div className="toggle" aria-label="Choose pricing type">
          <button
            type="button"
            className={monthly ? "on" : ""}
            aria-pressed={monthly}
            onClick={() => setMonthly(true)}
          >
            Monthly
          </button>

          <button
            type="button"
            className={!monthly ? "on" : ""}
            aria-pressed={!monthly}
            onClick={() => setMonthly(false)}
          >
            Project
          </button>
        </div>

        <div className="plans">
          {plans.map((plan, index) => {
            const price = monthly ? plan.monthly : plan.project;
            const features = monthly
              ? plan.monthlyFeatures
              : plan.projectFeatures;

            return (
              <Reveal
                key={plan.name}
                className={`plan ${plan.pop ? "pop" : ""}`}
                delay={index * 80}
              >
                {plan.pop && <span className="plan-badge">Most popular</span>}

                <h3>{plan.name}</h3>

                <div className="price">
                  {price}
                  {price !== "Custom" && (
                    <small>{monthly ? " /mo" : " /project"}</small>
                  )}
                </div>

                <p className="plan-description">
                  {plan.name === "Starter"
                    ? "The essentials to establish your digital presence."
                    : plan.name === "Growth"
                    ? "Everything you need to grow your brand and business."
                    : "Tailored solutions for ambitious, evolving businesses."}
                </p>

                <ul>
                  {features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`btn plan-cta ${plan.pop ? "p" : ""}`}
                  onClick={() => selectPlan(plan)}
                >
                  {plan.cta}
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      {selectedPlan && (
        <div
          className="pricing-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedPlan(null);
            }
          }}
        >
          <section
            className="pricing-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pricing-modal-title"
          >
            <button
              type="button"
              className="pricing-modal-close"
              onClick={() => setSelectedPlan(null)}
              aria-label="Close inquiry form"
            >
              ×
            </button>

            <div className="modal-heading">
              <span className="tag">PLAN INQUIRY</span>
              <h2 id="pricing-modal-title">
                Let's build something <span className="g">great.</span>
              </h2>
              <p>
                Your selected package is ready. Review the details and send
                your inquiry to our team.
              </p>
            </div>

            <div className="selected-plan-summary">
              <div>
                <span className="summary-label">SELECTED PLAN</span>
                <h3>{selectedPlan.name}</h3>
                <p>{selectedPlan.billingType}</p>
              </div>

              <div className="summary-price">
                <strong>{selectedPlan.price}</strong>
                {selectedPlan.price !== "Custom" && (
                  <small>
                    {monthly ? " /month" : " /project"}
                  </small>
                )}
              </div>
            </div>

            <form className="pricing-inquiry-form" onSubmit={sendEmail}>
              <div className="inquiry-fields">
                <div className="inquiry-field">
                  <label htmlFor="nexfinity-client-name">Your name</label>
                  <input
                    id="nexfinity-client-name"
                    value={clientName}
                    onChange={(event) => setClientName(event.target.value)}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="inquiry-field">
                  <label htmlFor="nexfinity-client-email">Email address</label>
                  <input
                    id="nexfinity-client-email"
                    type="email"
                    value={clientEmail}
                    onChange={(event) => setClientEmail(event.target.value)}
                    placeholder="you@company.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="inquiry-field">
                <label htmlFor="nexfinity-inquiry-message">
                  Inquiry details
                </label>
                <textarea
                  id="nexfinity-inquiry-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={7}
                  required
                />
                <small className="field-hint">
                  Your plan, pricing, and included services are filled in
                  automatically. You can edit this message before sending.
                </small>
              </div>

              <button type="submit" className="btn p inquiry-submit">
                Send Email <span aria-hidden="true">↗</span>
              </button>

              <p className="inquiry-note">
                Your email application will open with the inquiry prepared.
              </p>
            </form>
          </section>
        </div>
      )}
    </section>
  );
}

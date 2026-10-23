import Reveal from "./reveal";
import { FaFacebookF, FaInstagram, FaTiktok, FaDribbble, FaGoogleDrive } from "react-icons/fa";
import { LINKS } from "../data";

const socials = [
  { k: "facebook", Icon: FaFacebookF },
  { k: "instagram", Icon: FaInstagram },
  { k: "tiktok", Icon: FaTiktok },
  { k: "dribbble", Icon: FaDribbble },
  { k: "drive", Icon: FaGoogleDrive },
];

export default function Contact() {
  // Opens a pre-filled Gmail compose window (falls back to mailto)
  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const su = encodeURIComponent(`New project enquiry: ${f.get("service")}`);
    const body = encodeURIComponent(`Name: ${f.get("name")}\nEmail: ${f.get("email")}\n\n${f.get("msg")}`);
    const w = window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${LINKS.email}&su=${su}&body=${body}`, "_blank");
    if (!w) window.location.href = `mailto:${LINKS.email}?subject=${su}&body=${body}`;
  };

  return (
    <section id="contact">
      <div className="wrap contact">
        <Reveal className="info">
          <span className="tag">Contact</span>
          <h2>Let's build something <span className="g">infinite.</span></h2>
          <p className="lead">Tell us about your project and we'll reply within 24 hours.</p>
          <p>✉ <a className="g-link" href={`mailto:${LINKS.email}`}>{LINKS.email}</a></p>
          <div className="socials">
            {socials.map(({ k, Icon }) => (
              <a key={k} href={LINKS[k]} target="_blank" rel="noreferrer" aria-label={k}><Icon /></a>
            ))}
          </div>
        </Reveal>
        <Reveal as="form" onSubmit={submit} delay={120}>
          <input name="name" placeholder="Your name" required />
          <input name="email" type="email" placeholder="Your email" required />
          <select name="service">
            <option>Web / SaaS Development</option><option>Brand Identity</option>
            <option>UI / UX Design</option><option>Social &amp; Content</option><option>AI &amp; Automation</option>
          </select>
          <textarea name="msg" placeholder="Tell us about your project..." required />
          <button className="btn p" type="submit">Send via Gmail →</button>
        </Reveal>
      </div>
    </section>
  );
}
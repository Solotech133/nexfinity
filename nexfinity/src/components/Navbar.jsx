import { useState } from "react";

const items = ["Services", "Work", "Process", "Pricing", "FAQ"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <nav>
      <div className="wrap">
        <a href="#top" className="logo" aria-label="Nexfinity home">
          <img src="/logo.png" alt="Nexfinity" />
        </a>
        <div className={`links ${open ? "open" : ""}`}>
          {items.map((i) => (
            <a key={i} href={`#${i.toLowerCase()}`} onClick={close}>{i}</a>
          ))}
          <a href="#contact" className="btn p sm" onClick={close}>Start a project</a>
        </div>
        <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">{open ? "✕" : "☰"}</button>
      </div>
    </nav>
  );
}
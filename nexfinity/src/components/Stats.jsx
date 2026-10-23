import { useEffect, useRef, useState } from "react";
import { stats } from "../data";

function Counter({ to, label }) {
  const ref = useRef(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let n = 0;
      const t = setInterval(() => {
        n = Math.min(to, n + Math.ceil(to / 40));
        setV(n);
        if (n >= to) clearInterval(t);
      }, 35);
    }, { threshold: 0.5 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return (
    <div ref={ref} className="stat">
      <b>{v}+</b>
      <span>{label}</span>
    </div>
  );
}

export default function Stats() {
  return (
    <section style={{ padding: "40px 0" }}>
      <div className="wrap stats">
        {stats.map((s) => <Counter key={s.label} to={s.n} label={s.label} />)}
      </div>
    </section>
  );
}
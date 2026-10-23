import { words } from "../data";

export default function Marquee() {
  const list = [...words, ...words];
  return (
    <div className="marq">
      <div className="track">
        {list.map((w, i) => (<span key={i}>{w}</span>)).flatMap((el, i) => [el, <span key={`s${i}`}>✦</span>])}
      </div>
    </div>
  );
}
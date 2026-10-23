import Reveal from "./reveal.jsx";

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wrap">
        <Reveal>
          <span className="tag">● Tech &amp; Creative Agency</span>
          <h1>Design the future.<br /><span className="g">Build without limits.</span></h1>
          <p>Nexfinity fuses cutting-edge engineering with bold creative to launch brands, products and experiences that people can't scroll past.</p>
          <div className="cta">
            <a href="#contact" className="btn p">Start a project →</a>
            <a href="#work" className="btn">See our work</a>
          </div>
        </Reveal>
        <Reveal className="hero-img" delay={150}>
          <img src="/hero.png" alt="Futuristic figure wearing a neon green VR visor" />
          <div className="chip c1"><b>150+</b>Projects shipped</div>
          <div className="chip c2"><b>98%</b>Client satisfaction</div>
        </Reveal>
      </div>
    </header>
  );
}

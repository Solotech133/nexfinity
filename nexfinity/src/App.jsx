import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Stats from "./components/Stats";
import Portfolio from "./components/Portfolio";
import Process from "./components/Process";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const glow = useRef(null);

  // cursor-following green glow
  useEffect(() => {
    const move = (e) => {
      if (!glow.current) return;
      glow.current.style.left = `${e.clientX}px`;
      glow.current.style.top = `${e.clientY}px`;
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <>
      <div id="glow" ref={glow} />
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <Stats />
      <Portfolio />
      <Process />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}
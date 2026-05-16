// app.jsx — root + nav + tweaks wiring
const { useEffect: useE, useState: useS } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#5cf2c2",
  "fontFamily": "Space Grotesk",
  "motion": "smooth",
  "grid": true
}/*EDITMODE-END*/;

const ACCENTS = {
  "#5cf2c2": { primary: "#5cf2c2", secondary: "#7cb6ff" }, // mint
  "#7cb6ff": { primary: "#7cb6ff", secondary: "#c792ea" }, // electric
  "#ff79c6": { primary: "#ff79c6", secondary: "#ffb38a" }, // magenta
  "#ffcb6b": { primary: "#ffcb6b", secondary: "#ff79c6" }, // amber
  "#dd0031": { primary: "#dd0031", secondary: "#ffb38a" }, // angular red
};

const FONTS = {
  "Space Grotesk": '"Space Grotesk", ui-sans-serif, system-ui, sans-serif',
  "Inter": "Inter, ui-sans-serif, system-ui, sans-serif",
  "Geist": '"Geist", ui-sans-serif, system-ui, sans-serif',
  "Serif": '"Instrument Serif", Georgia, serif',
};

function Nav(){
  return (
    <nav className="nav" aria-label="primary">
      <a className="brand" href="#hero">
        <span className="dot"></span>
        <span>sandeep<b style={{color:'var(--accent)'}}>.</b>ts</span>
      </a>
      <ul>
        <li><a href="#about">about</a></li>
        <li><a href="#skills">skills</a></li>
        <li><a href="#projects">work</a></li>
        <li><a href="#education">education</a></li>
        <li><a href="#contact">contact</a></li>
      </ul>
      <a className="cta" href="mailto:sandeepsuneja04@gmail.com">sandeepsuneja04@gmail.com →</a>
    </nav>
  );
}

function App(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks to CSS vars
  useE(()=>{
    const root = document.documentElement;
    const a = ACCENTS[t.accent] || ACCENTS["#5cf2c2"];
    root.style.setProperty("--accent", a.primary);
    root.style.setProperty("--accent-2", a.secondary);
    root.style.setProperty("--font-display", FONTS[t.fontFamily] || FONTS["Space Grotesk"]);
    root.style.setProperty("--grid", t.grid ? "rgba(120,150,180,.08)" : "transparent");
    document.body.style.transition = t.motion === "minimal" ? "none" : "";
  }, [t]);

  // Reveal on scroll
  useE(()=>{
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((es)=>{
      es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }});
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return ()=> io.disconnect();
  }, []);

  return (
    <>
      <Nav/>
      <Hero/>
      <About/>
      <Skills/>
      <Projects/>
      <Education/>
      <Contact/>

      <TweaksPanel>
        <TweakSection label="Color"/>
        <TweakColor label="Accent" value={t.accent}
          options={["#5cf2c2","#7cb6ff","#ff79c6","#ffcb6b","#dd0031"]}
          onChange={(v)=> setTweak('accent', v)}/>

        <TweakSection label="Typography"/>
        <TweakSelect label="Display font" value={t.fontFamily}
          options={["Space Grotesk","Inter","Geist","Serif"]}
          onChange={(v)=> setTweak('fontFamily', v)}/>

        <TweakSection label="Motion & detail"/>
        <TweakRadio label="Motion" value={t.motion}
          options={["minimal","smooth"]}
          onChange={(v)=> setTweak('motion', v)}/>
        <TweakToggle label="Grid backdrop" value={t.grid}
          onChange={(v)=> setTweak('grid', v)}/>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);

// hero.jsx — Hero with Angular code typing animation
const { useState, useEffect, useRef, useMemo } = React;

const ANGULAR_CODE = [
  { t: "import", c: "kw" }, { t: " { ", c: "" },
  { t: "Component", c: "type" }, { t: ", ", c: "" },
  { t: "signal", c: "fn" }, { t: " } ", c: "" },
  { t: "from", c: "kw" }, { t: " ", c: "" },
  { t: "'@angular/core'", c: "str" }, { t: ";\n\n", c: "" },

  { t: "@", c: "deco" }, { t: "Component", c: "deco" }, { t: "({\n", c: "" },
  { t: "  selector: ", c: "" }, { t: "'app-sandeep'", c: "str" }, { t: ",\n", c: "" },
  { t: "  standalone: ", c: "" }, { t: "true", c: "kw" }, { t: ",\n", c: "" },
  { t: "  template: ", c: "" }, { t: "`\n", c: "str" },
  { t: "    <h1>Hi, I'm Sandeep 👋</h1>\n", c: "str" },
  { t: "    <p>{{ role() }} · {{ years() }}+ yrs</p>\n", c: "str" },
  { t: "  `", c: "str" }, { t: ",\n})\n", c: "" },

  { t: "export class ", c: "kw" }, { t: "Sandeep ", c: "type" }, { t: "{\n", c: "" },
  { t: "  role = ", c: "" }, { t: "signal", c: "fn" }, { t: "(", c: "" },
  { t: "'Senior Technical Lead'", c: "str" }, { t: ");\n", c: "" },
  { t: "  years = ", c: "" }, { t: "signal", c: "fn" }, { t: "(", c: "" },
  { t: "10", c: "num" }, { t: ");\n", c: "" },
  { t: "  stack = [", c: "" }, { t: "'Angular'", c: "str" }, { t: ", ", c: "" },
  { t: "'JavaScript'", c: "str" }, { t: ", ", c: "" },
  { t: "'RxJS'", c: "str" }, { t: ", ", c: "" },
  { t: "'AWS'", c: "str" }, { t: "];\n", c: "" },
  { t: "}", c: "" },
];

function useTypewriter(tokens, speed = 14, startDelay = 600){
  const [n, setN] = useState(0);
  const total = tokens.reduce((s,t)=>s+t.t.length, 0);
  useEffect(()=>{
    let raf, start;
    const tick = (ts) => {
      if(!start) start = ts + startDelay;
      const elapsed = Math.max(0, ts - start);
      const target = Math.min(total, Math.floor(elapsed / speed));
      setN(target);
      if(target < total) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return ()=> cancelAnimationFrame(raf);
  }, [total, speed, startDelay]);
  return n;
}

function CodeBlock(){
  const total = ANGULAR_CODE.reduce((s,t)=>s+t.t.length, 0);
  const n = useTypewriter(ANGULAR_CODE, 14, 800);
  // Build visible string with token spans
  let remaining = n;
  const out = [];
  for(let i=0;i<ANGULAR_CODE.length;i++){
    const tk = ANGULAR_CODE[i];
    if(remaining <= 0) break;
    const slice = tk.t.slice(0, remaining);
    out.push(<span key={i} className={`tk tk-${tk.c}`}>{slice}</span>);
    remaining -= tk.t.length;
  }
  const done = n >= total;
  // line numbers
  const text = ANGULAR_CODE.map(t=>t.t).join("");
  const visible = text.slice(0, n);
  const lineCount = Math.max(15, visible.split("\n").length);
  const lines = Array.from({length: lineCount}, (_,i)=>i+1);

  return (
    <div className="ide">
      <style>{`
        .ide{
          position:relative;
          border:1px solid var(--line-2);
          border-radius:14px;
          background: linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.01));
          backdrop-filter: blur(10px);
          overflow:hidden;
          box-shadow: 0 30px 80px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.05);
        }
        .ide-bar{
          display:flex; align-items:center; gap:12px;
          padding:12px 16px; border-bottom:1px solid var(--line);
          font-family: var(--font-mono); font-size:11px; color: var(--ink-mute);
        }
        .ide-bar .dots{ display:flex; gap:6px }
        .ide-bar .dots i{ width:10px; height:10px; border-radius:50%; background:rgba(255,255,255,.12) }
        .ide-bar .file{ color: var(--ink-dim) }
        .ide-bar .file b{ color: var(--ink); font-weight:500 }
        .ide-bar .pill{
          margin-left:auto; padding:3px 8px; border-radius:6px;
          background: color-mix(in oklab, var(--accent) 16%, transparent);
          color: var(--accent); font-size:10px; letter-spacing:.08em; text-transform:uppercase;
        }
        .ide-body{ display:grid; grid-template-columns: 44px 1fr; min-height: 380px}
        .ide-gutter{
          padding: 18px 0 24px; text-align:right; font-family:var(--font-mono); font-size:12px;
          color: var(--ink-mute); border-right:1px solid var(--line);
          line-height: 1.65;
        }
        .ide-gutter span{ display:block; padding-right:12px }
        .ide-code{
          padding: 18px 22px 24px; font-family:var(--font-mono); font-size:13px;
          color: var(--ink); white-space: pre-wrap; line-height:1.65;
          overflow:hidden;
        }
        .tk-kw   { color: #c792ea; }
        .tk-type { color: #ffcb6b; }
        .tk-fn   { color: #82aaff; }
        .tk-str  { color: #5cf2c2; }
        .tk-num  { color: #f78c6c; }
        .tk-deco { color: #ff79c6; }
        .caret{
          display:inline-block; width:8px; height:1.1em; vertical-align:-2px;
          background: var(--accent); margin-left:1px;
          animation: blink .9s steps(2) infinite;
          box-shadow: 0 0 10px color-mix(in oklab, var(--accent) 70%, transparent);
        }
        @keyframes blink{ 50%{ opacity:0 } }
      `}</style>
      <div className="ide-bar">
        <div className="dots"><i></i><i></i><i></i></div>
        <span className="file"><b>portfolio.component.ts</b> — angular 17</span>
        <span className="pill">live</span>
      </div>
      <div className="ide-body">
        <div className="ide-gutter">
          {lines.map(l=> <span key={l}>{l}</span>)}
        </div>
        <div className="ide-code">
          {out}{!done && <span className="caret"/>}
        </div>
      </div>
    </div>
  );
}

function Hero(){
  return (
    <section id="hero" data-screen-label="Hero" style={{ paddingTop: 140, paddingBottom: 80, minHeight: '100vh', display:'flex', alignItems:'center'}}>
      <style>{`
        .hero-grid{ display:grid; grid-template-columns: 1.1fr .95fr; gap: 72px; align-items:center; width:100% }
        @media (max-width: 1000px){ .hero-grid{ grid-template-columns: 1fr; gap: 40px } }
        .hero-meta{ display:flex; gap:18px; flex-wrap:wrap; font-family:var(--font-mono); font-size:12px; color:var(--ink-dim); margin-top: 36px }
        .hero-meta .chip{ padding:8px 12px; border:1px solid var(--line); border-radius:99px; backdrop-filter: blur(4px) }
        .hero-meta .chip b{ color:var(--ink); font-weight:500 }
        .hero h1 .glow{
          background: linear-gradient(180deg, var(--ink) 30%, color-mix(in oklab, var(--accent) 50%, var(--ink)));
          -webkit-background-clip: text; background-clip: text; color:transparent;
        }
        .hero .sub{
          margin-top: 28px; max-width: 560px; font-size: 18px; line-height:1.55; color: var(--ink-dim)
        }
        .hero .sub em{ font-family: var(--font-serif); font-style: italic; color: var(--ink); font-size: 22px }
        .hero-actions{ margin-top: 40px; display:flex; gap:12px; flex-wrap:wrap }
        .btn{
          font-family: var(--font-mono); font-size: 12px; letter-spacing:.04em;
          padding: 12px 18px; border-radius:10px; text-decoration:none; cursor:pointer;
          display:inline-flex; align-items:center; gap:10px; transition:.2s;
        }
        .btn-pri{ background: var(--accent); color:#06140f; border:1px solid var(--accent)}
        .btn-pri:hover{ background: color-mix(in oklab, var(--accent) 85%, white); }
        .btn-sec{ background: transparent; color: var(--ink); border:1px solid var(--line-2)}
        .btn-sec:hover{ border-color: var(--accent); color: var(--accent)}
        .btn .arrow{ transition: transform .2s }
        .btn:hover .arrow{ transform: translateX(3px) }

        .status{
          display:inline-flex; align-items:center; gap:8px; padding:6px 12px; border-radius:99px;
          background: color-mix(in oklab, var(--accent) 8%, transparent);
          border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
          font-family: var(--font-mono); font-size: 11px; color: var(--accent);
          margin-bottom: 28px;
        }
        .status .led{ width:6px; height:6px; border-radius:50%; background: var(--accent); animation: pulse 2s infinite}
      `}</style>

      <div className="hero-grid">
        <div className="hero">
          <div className="status"><span className="led"></span>AVAILABLE FOR HIRE · 2026</div>
          <h1>
            Sandeep<br/>
            Suneja<span className="glow">.</span>
          </h1>
          <p className="sub">
            Senior Technical Lead with <em>10+ years</em> architecting scalable, high-performance UI systems for fintech and enterprise — specializing in <b style={{color:'var(--ink)', fontWeight:500}}>Angular</b>, JavaScript and modern web platforms.
          </p>
          <div className="hero-actions">
            <a className="btn btn-pri" href="#projects">View work <span className="arrow">→</span></a>
            <a className="btn btn-sec" href="#contact">Get in touch</a>
          </div>
          <div className="hero-meta">
            <div className="chip">📍 <b>Delhi, India</b></div>
            <div className="chip">⚡ <b>10+ yrs · Tech Lead</b></div>
            <div className="chip">◇ <b>Angular · RxJS · AWS</b></div>
          </div>
        </div>

        <div>
          <CodeBlock />
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;

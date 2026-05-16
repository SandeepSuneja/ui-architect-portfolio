// skills.jsx — animated skills section with marquee + radial proficiency
const { useState: useS_S, useEffect: useE_S, useRef: useR_S } = React;

const SKILLS = [
  { name: "Angular",         level: 96, years: 9,  cat: "Framework", code: "@Component" },
  { name: "JavaScript",      level: 95, years: 10, cat: "Language",  code: "const x = …" },
  { name: "RxJS",            level: 88, years: 8,  cat: "Reactive",  code: "obs$.pipe()" },
  { name: "HTML5",           level: 98, years: 10, cat: "Markup",    code: "<section>" },
  { name: "Bootstrap / CSS", level: 94, years: 10, cat: "Styling",   code: "grid-area" },
  { name: "Jasmine / Karma", level: 86, years: 7,  cat: "Testing",   code: "expect(…)" },
  { name: "AWS",             level: 78, years: 5,  cat: "Cloud",     code: "S3 · Lambda" },
  { name: "Python",          level: 72, years: 6,  cat: "Language",  code: "def fn():" },
  { name: "Git",             level: 92, years: 10, cat: "Tooling",   code: "git rebase -i" },
  { name: "Agile · Leadership", level: 90, years: 5, cat: "Practice", code: "// mentor" },
];

function SkillCard({ s, i, inView }){
  const [val, setVal] = useS_S(0);
  useE_S(()=>{
    if(!inView) return;
    let raf, start;
    const dur = 1400;
    const delay = 80 * i;
    const tick = (ts)=>{
      if(!start) start = ts + delay;
      const e = Math.max(0, ts - start);
      const t = Math.min(1, e/dur);
      // easeOutCubic
      const eased = 1 - Math.pow(1-t, 3);
      setVal(s.level * eased);
      if(t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return ()=> cancelAnimationFrame(raf);
  }, [inView]);

  // SVG ring
  const R = 30, C = 2*Math.PI*R;
  const dash = (val/100) * C;

  return (
    <div className="sk">
      <div className="sk-head">
        <svg width="76" height="76" viewBox="0 0 76 76">
          <circle cx="38" cy="38" r={R} fill="none" stroke="var(--line)" strokeWidth="3"/>
          <circle cx="38" cy="38" r={R} fill="none"
                  stroke="var(--accent)" strokeWidth="3"
                  strokeDasharray={`${dash} ${C}`}
                  strokeLinecap="round"
                  transform="rotate(-90 38 38)"
                  style={{filter:"drop-shadow(0 0 6px color-mix(in oklab, var(--accent) 60%, transparent))"}}/>
          <text x="38" y="42" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="var(--ink)">
            {Math.round(val)}
          </text>
        </svg>
        <div className="sk-meta">
          <div className="sk-cat">{s.cat}</div>
          <div className="sk-name">{s.name}</div>
          <div className="sk-yrs">{s.years} yrs</div>
        </div>
      </div>
      <div className="sk-code">{s.code}</div>
    </div>
  );
}

function Marquee({ items, dir = "left", speed = 60 }){
  // duplicate for seamless loop
  const list = [...items, ...items];
  return (
    <div className={`mq ${dir}`} style={{"--spd": `${speed}s`}}>
      <div className="mq-track">
        {list.map((it, i)=>(
          <span key={i} className="mq-item">
            <span className="mq-bullet">◆</span>{it}
          </span>
        ))}
      </div>
    </div>
  );
}

function Skills(){
  const ref = useR_S(null);
  const [inView, setInView] = useS_S(false);
  useE_S(()=>{
    if(!ref.current) return;
    const io = new IntersectionObserver((es)=>{
      es.forEach(e=>{ if(e.isIntersecting) setInView(true); });
    }, { threshold: 0.2 });
    io.observe(ref.current);
    return ()=> io.disconnect();
  }, []);

  return (
    <section id="skills" data-screen-label="Skills" ref={ref}>
      <style>{`
        .sk-head-row{ display:flex; justify-content:space-between; align-items:end; margin-bottom: 56px; gap: 40px; flex-wrap:wrap}
        .sk-head-row h2 .acc{ color: var(--accent); font-style: italic; font-family: var(--font-serif); font-weight: 400}
        .sk-grid{ display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; }
        .sk{
          padding: 18px 20px; border:1px solid var(--line);
          border-radius: 14px;
          background: linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,0));
          transition: transform .35s ease, border-color .35s ease, background .35s ease;
        }
        .sk:hover{
          transform: translateY(-3px);
          border-color: color-mix(in oklab, var(--accent) 50%, var(--line));
          background: linear-gradient(180deg, color-mix(in oklab, var(--accent) 6%, transparent), rgba(255,255,255,.01));
        }
        .sk-head{ display:flex; gap:14px; align-items:center }
        .sk-meta{ display:flex; flex-direction:column; gap:2px }
        .sk-cat{ font-family: var(--font-mono); font-size: 10px; letter-spacing:.12em; text-transform:uppercase; color: var(--ink-mute) }
        .sk-name{ font-size: 19px; font-weight: 500; color: var(--ink) }
        .sk-yrs{ font-family: var(--font-mono); font-size: 11px; color: var(--ink-dim) }
        .sk-code{
          margin-top: 14px; padding: 8px 10px; border-radius: 8px;
          font-family: var(--font-mono); font-size: 11px;
          color: var(--ink-dim);
          background: rgba(0,0,0,.35); border:1px dashed var(--line);
        }

        /* Marquee */
        .mq-wrap{
          margin: 80px -32px 0; padding: 22px 0; border-top:1px solid var(--line); border-bottom:1px solid var(--line);
          overflow:hidden; position:relative;
          mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
        }
        .mq{ overflow:hidden; }
        .mq-track{
          display:flex; gap: 56px; width:max-content;
          font-family: var(--font-mono); font-size: 22px; color: var(--ink-dim); letter-spacing: -0.01em;
          animation: mq-scroll var(--spd) linear infinite;
        }
        .mq.right .mq-track{ animation-direction: reverse }
        .mq-item{ display:inline-flex; align-items:center; gap:18px; white-space:nowrap }
        .mq-bullet{ color: var(--accent); font-size: 12px }
        @keyframes mq-scroll{ to{ transform: translateX(-50%) } }
      `}</style>

      <div className="sk-head-row">
        <div>
          <div className="eyebrow">02 — Capabilities</div>
          <h2 style={{marginTop:18}}>Tools I reach for, <span className="acc">daily</span>.</h2>
        </div>
        <p style={{maxWidth: 420, color:'var(--ink-dim)', fontSize:16, lineHeight:1.55, margin:0}}>
          Eleven years deep. Numbers below are honest self-assessments — proficiency, not certifications.
        </p>
      </div>

      <div className="sk-grid">
        {SKILLS.map((s,i)=>(
          <SkillCard key={s.name} s={s} i={i} inView={inView}/>
        ))}
      </div>

      <div className="mq-wrap">
        <Marquee items={["Angular", "JavaScript", "RxJS", "HTML5", "Bootstrap", "Jasmine", "Karma", "Git", "AWS", "Python", "PrimeNG", "OAuth", "Agile", "Mentoring", "ML / AI foundations"]} dir="left" speed={70}/>
      </div>
    </section>
  );
}

window.Skills = Skills;

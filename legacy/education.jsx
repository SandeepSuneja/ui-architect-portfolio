// education.jsx — Education section
const { useEffect: useE_E, useRef: useR_E, useState: useS_E } = React;

const DEGREES = [
  {
    deg: "Master of Science",
    field: "Computer Science / AI focus",
    school: "Liverpool John Moores University",
    loc: "Liverpool, United Kingdom",
    period: "2022 — 2024",
    note: "Foundations in Machine Learning and AI-driven applications.",
    badge: "MSc"
  },
  {
    deg: "Executive Post Graduation",
    field: "Software Engineering",
    school: "International Institute of Information Technology",
    loc: "Bangalore, India",
    period: "2021 — 2022",
    note: "Executive program — advanced engineering and architecture.",
    badge: "PG"
  },
  {
    deg: "Bachelor of Technology",
    field: "Engineering",
    school: "Guru Gobind Singh Indraprastha University",
    loc: "Delhi, India",
    period: "2011 — 2015",
    note: "Undergraduate foundations in CS and engineering fundamentals.",
    badge: "BTech"
  },
];

function Education(){
  const ref = useR_E(null);
  const [vis, setVis] = useS_E(false);
  useE_E(()=>{
    if(!ref.current) return;
    const io = new IntersectionObserver(es=>{
      es.forEach(e=>{ if(e.isIntersecting) setVis(true); });
    }, { threshold: 0.18 });
    io.observe(ref.current);
    return ()=> io.disconnect();
  }, []);

  return (
    <section id="education" data-screen-label="Education" ref={ref}>
      <style>{`
        .ed-head{ display:flex; justify-content:space-between; align-items:end; margin-bottom: 56px; gap:40px; flex-wrap:wrap}
        .ed-head h2 .acc{ color: var(--accent); font-style: italic; font-family: var(--font-serif); font-weight:400 }
        .ed-grid{ display:grid; grid-template-columns: repeat(3, 1fr); gap: 18px }
        @media (max-width: 980px){ .ed-grid{ grid-template-columns: 1fr } }

        .ed-card{
          position:relative; padding: 28px 28px 26px; border:1px solid var(--line); border-radius: 16px;
          background: linear-gradient(180deg, rgba(255,255,255,.025), rgba(255,255,255,.005));
          transition: border-color .35s ease, transform .35s ease, background .35s ease;
          opacity: 0; transform: translateY(16px);
          overflow: hidden;
        }
        .ed-card.in{ opacity: 1; transform: none }
        .ed-card:hover{
          border-color: color-mix(in oklab, var(--accent) 45%, var(--line));
          background: linear-gradient(180deg, color-mix(in oklab, var(--accent) 5%, transparent), rgba(255,255,255,.005));
          transform: translateY(-4px);
        }
        .ed-card::after{
          content:""; position:absolute; inset: auto -40px -40px auto;
          width:160px; height:160px; border-radius:50%;
          background: radial-gradient(circle, color-mix(in oklab, var(--accent) 22%, transparent), transparent 70%);
          pointer-events:none; opacity:.5; transition:.4s;
        }
        .ed-card:hover::after{ opacity:1 }

        .ed-badge{
          font-family: var(--font-mono); font-size: 11px; font-weight: 500;
          color: var(--accent); letter-spacing:.08em;
          padding: 5px 10px; border-radius: 6px;
          background: color-mix(in oklab, var(--accent) 12%, transparent);
          border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
          display:inline-block;
        }
        .ed-period{
          float: right; font-family: var(--font-mono); font-size: 11px; color: var(--ink-mute);
          letter-spacing:.06em;
        }
        .ed-deg{ font-size: 22px; font-weight: 500; color: var(--ink); margin-top: 18px; line-height: 1.25; letter-spacing:-.01em }
        .ed-field{ font-family: var(--font-mono); font-size: 11px; color: var(--accent-2); margin-top: 6px; letter-spacing:.04em }
        .ed-school{
          margin-top: 18px; padding-top: 16px; border-top: 1px dashed var(--line);
          font-size: 15px; color: var(--ink); font-weight: 500;
        }
        .ed-loc{ font-family: var(--font-mono); font-size: 11px; color: var(--ink-mute); margin-top: 4px }
        .ed-note{ color: var(--ink-dim); font-size: 13px; line-height: 1.55; margin-top: 14px }

        .ed-foot{
          margin-top: 36px; display:flex; gap: 28px; flex-wrap:wrap;
          padding: 18px 22px; border:1px dashed var(--line); border-radius: 12px;
          font-family: var(--font-mono); font-size: 12px; color: var(--ink-dim);
        }
        .ed-foot b{ color: var(--ink); font-weight: 500 }
        .ed-foot .dot{ color: var(--accent); margin: 0 6px }
      `}</style>

      <div className="ed-head">
        <div>
          <div className="eyebrow">04 — Education</div>
          <h2 style={{marginTop:18}}>Where I <span className="acc">studied</span>.</h2>
        </div>
        <p style={{maxWidth:420, color:'var(--ink-dim)', fontSize:16, lineHeight:1.55, margin:0}}>
          Three degrees spanning India and the UK — from engineering fundamentals to a Master's with a growing focus on machine learning and AI.
        </p>
      </div>

      <div className="ed-grid">
        {DEGREES.map((d, i)=>(
          <article key={d.badge} className={`ed-card ${vis ? 'in':''}`} style={{transitionDelay: vis ? `${i*120}ms` : '0ms'}}>
            <span className="ed-badge">{d.badge}</span>
            <span className="ed-period">{d.period}</span>
            <h3 className="ed-deg">{d.deg}</h3>
            <div className="ed-field">{d.field}</div>
            <div className="ed-school">{d.school}</div>
            <div className="ed-loc">📍 {d.loc}</div>
            <p className="ed-note">{d.note}</p>
          </article>
        ))}
      </div>

      <div className="ed-foot">
        <div><b>Continuous learning</b><span className="dot">·</span>ML & AI applications</div>
        <div><b>Training</b><span className="dot">·</span>Python &amp; SAP ABAP at Infosys</div>
        <div><b>Languages</b><span className="dot">·</span>English · Hindi</div>
      </div>
    </section>
  );
}

window.Education = Education;

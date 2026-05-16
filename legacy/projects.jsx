// projects.jsx — Project showcase cards with parallax/hover
const { useState: useS_P, useRef: useR_P } = React;

const PROJECTS = [
  {
    n: "01",
    name: "Data Ingestion Platform",
    client: "LPL Financial",
    role: "Senior Technical Lead",
    year: "2023 — Present",
    blurb: "Cloud-based platform handling large volumes of financial data for a top-tier US wealth-management firm. Owned end-to-end UI delivery — scalable architecture, modular Angular patterns and efficient data processing flows.",
    tags: ["Angular", "RxJS", "AWS", "Modular architecture"],
    hue: 165,
    sketch: "dash"
  },
  {
    n: "02",
    name: "Bank Account Validation",
    client: "Citibank",
    role: "Frontend Architect",
    year: "2022",
    blurb: "Designed and implemented an account-validation system that significantly reduced manual verification effort. Tight integration with banking workflows, focus on accuracy and operator efficiency.",
    tags: ["Angular", "TypeScript", "Forms", "Validation"],
    hue: 210,
    sketch: "flow"
  },
  {
    n: "03",
    name: "Helix ALM Web Client",
    client: "Perforce",
    role: "Frontend Contributor",
    year: "2022",
    blurb: "Contributed to performance and usability upgrades for the Helix ALM web client — a tool used by frontline QA and engineering teams for application lifecycle management.",
    tags: ["Angular", "Performance", "UX"],
    hue: 35,
    sketch: "comp"
  },
  {
    n: "04",
    name: "User Management Portal",
    client: "Siemens",
    role: "Senior Software Engineer",
    year: "2020",
    blurb: "Enterprise user-management portal with OAuth-based authentication, reusable PrimeNG components and a Jasmine test suite that lifted application reliability.",
    tags: ["Angular", "PrimeNG", "OAuth", "Jasmine"],
    hue: 285,
    sketch: "grid"
  },
  {
    n: "05",
    name: "Charmboard Engagement",
    client: "Charmboard",
    role: "Frontend Developer",
    year: "2018 — 2020",
    blurb: "Modernized the social-engagement platform UI with responsive design and integrated third-party libraries (CleverTap, sliders, analytics) to lift user engagement.",
    tags: ["JavaScript", "Responsive", "CleverTap"],
    hue: 320,
    sketch: "flow"
  },
  {
    n: "06",
    name: "PepsiCo UI Suite",
    client: "PepsiCo (via Infosys)",
    role: "Senior System Engineer",
    year: "2015 — 2018",
    blurb: "Built reusable UI components and responsive enterprise applications. Improved performance and maintainability of frontend systems across the suite.",
    tags: ["Angular", "Bootstrap", "JavaScript"],
    hue: 195,
    sketch: "grid"
  },
];

function Sketch({ kind, hue }){
  const c = `hsl(${hue} 70% 65%)`;
  const c2 = `hsl(${hue} 70% 50%)`;
  if(kind === "dash") return (
    <svg viewBox="0 0 320 180" width="100%" height="100%">
      <defs>
        <linearGradient id={`g-${hue}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={c} stopOpacity="0.7"/>
          <stop offset="1" stopColor={c} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d="M10 130 L60 90 L100 110 L150 60 L200 80 L250 40 L310 70 L310 170 L10 170Z" fill={`url(#g-${hue})`}/>
      <path d="M10 130 L60 90 L100 110 L150 60 L200 80 L250 40 L310 70" fill="none" stroke={c} strokeWidth="2"/>
      {[60,150,250].map((x,i)=>(<circle key={i} cx={x} cy={[90,60,40][i]} r="4" fill={c2}/>))}
      <g opacity=".5">
        <rect x="20" y="20" width="60" height="6" rx="2" fill={c}/>
        <rect x="20" y="32" width="40" height="4" rx="2" fill={c} opacity=".5"/>
      </g>
    </svg>
  );
  if(kind === "comp") return (
    <svg viewBox="0 0 320 180" width="100%" height="100%">
      {[0,1,2,3,4,5,6,7].map(i=>{
        const x = 20 + (i%4)*75;
        const y = 20 + Math.floor(i/4)*75;
        return <g key={i}>
          <rect x={x} y={y} width="60" height="60" rx="10" fill="none" stroke={c} strokeOpacity={.3 + (i%3)*.2} strokeWidth="1.5"/>
          <rect x={x+10} y={y+12} width={20 + (i*5)%30} height="4" rx="2" fill={c} opacity=".5"/>
          <rect x={x+10} y={y+22} width="35" height="3" rx="1.5" fill={c} opacity=".25"/>
          {(i%3===0) && <circle cx={x+30} cy={y+44} r="6" fill={c2} opacity=".7"/>}
        </g>;
      })}
    </svg>
  );
  if(kind === "flow") return (
    <svg viewBox="0 0 320 180" width="100%" height="100%">
      {[0,1,2].map(i=>{
        const x = 20 + i*100;
        return <g key={i}>
          <rect x={x} y="40" width="80" height="100" rx="12" fill="none" stroke={c} strokeOpacity=".4"/>
          <rect x={x+10} y="55" width="60" height="38" rx="4" fill={c} opacity=".18"/>
          <rect x={x+10} y="100" width="60" height="4" rx="2" fill={c} opacity=".5"/>
          <rect x={x+10} y="110" width="40" height="3" rx="1.5" fill={c} opacity=".3"/>
          <rect x={x+10} y="120" width="50" height="3" rx="1.5" fill={c} opacity=".3"/>
        </g>;
      })}
      <path d="M100 90 L120 90 M200 90 L220 90" stroke={c} strokeWidth="2" markerEnd={`url(#a-${hue})`}/>
      <defs><marker id={`a-${hue}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
        <path d="M0 0 L10 5 L0 10z" fill={c}/>
      </marker></defs>
    </svg>
  );
  return (
    <svg viewBox="0 0 320 180" width="100%" height="100%">
      {Array.from({length:24}).map((_,i)=>{
        const x = 15 + (i%6)*50, y = 15 + Math.floor(i/6)*40;
        return <rect key={i} x={x} y={y} width="40" height="30" rx="3" fill={c} opacity={0.08 + ((i*7)%9)/40}/>;
      })}
    </svg>
  );
}

function ProjectCard({ p, idx }){
  const ref = useR_P(null);
  const [tilt, setTilt] = useS_P({x:0,y:0});
  const onMove = (e) => {
    if(!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = (e.clientX - r.left)/r.width - .5;
    const cy = (e.clientY - r.top)/r.height - .5;
    setTilt({x: cx*6, y: -cy*6});
  };
  const onLeave = ()=> setTilt({x:0,y:0});

  return (
    <article ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      className="pj"
      style={{
        "--hue": p.hue,
        transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
      }}>
      <div className="pj-art">
        <Sketch kind={p.sketch} hue={p.hue}/>
        <div className="pj-num">{p.n}</div>
        <div className="pj-client">{p.client}</div>
      </div>
      <div className="pj-body">
        <div className="pj-meta">
          <span>{p.role}</span><span>·</span><span>{p.year}</span>
        </div>
        <h3 className="pj-name">{p.name}</h3>
        <p className="pj-blurb">{p.blurb}</p>
        <div className="pj-tags">
          {p.tags.map(t=> <span key={t} className="pj-tag">{t}</span>)}
        </div>
      </div>
    </article>
  );
}

function Projects(){
  return (
    <section id="projects" data-screen-label="Projects">
      <style>{`
        .pj-head{ display:flex; justify-content:space-between; align-items:end; margin-bottom: 56px; gap:40px; flex-wrap:wrap}
        .pj-head h2 .acc{ color: var(--accent-2); font-style: italic; font-family: var(--font-serif); font-weight:400 }
        .pj-grid{ display:grid; grid-template-columns: repeat(2, 1fr); gap: 22px}
        @media (max-width: 900px){ .pj-grid{ grid-template-columns: 1fr } }
        .pj{
          position:relative; border:1px solid var(--line); border-radius: 18px;
          background: linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.005));
          overflow:hidden;
          transition: border-color .3s ease, transform .12s ease;
          transform-style: preserve-3d;
        }
        .pj:hover{
          border-color: hsl(var(--hue) 70% 55% / .5);
        }
        .pj-art{
          position:relative; height: 220px; overflow:hidden;
          background:
            radial-gradient(120% 100% at 50% 0%, hsl(var(--hue) 60% 30% / .35), transparent 60%),
            linear-gradient(180deg, rgba(255,255,255,.02), rgba(0,0,0,.2));
          border-bottom: 1px solid var(--line);
        }
        .pj-num{
          position:absolute; top: 14px; left: 18px;
          font-family: var(--font-mono); font-size: 11px; color: hsl(var(--hue) 70% 70%);
          letter-spacing:.12em;
        }
        .pj-client{
          position:absolute; top: 14px; right: 18px;
          font-family: var(--font-mono); font-size: 10.5px; color: hsl(var(--hue) 60% 80%);
          letter-spacing:.08em; padding: 3px 8px; border-radius: 6px;
          background: hsl(var(--hue) 60% 25% / .4);
          border:1px solid hsl(var(--hue) 60% 50% / .3);
        }
        .pj-body{ padding: 22px 24px 24px }
        .pj-meta{ display:flex; gap: 8px; font-family: var(--font-mono); font-size: 11px; color: var(--ink-mute); letter-spacing:.06em; text-transform:uppercase }
        .pj-name{ margin: 8px 0 8px; font-size: 26px; font-weight: 500; color: var(--ink) }
        .pj-blurb{ color: var(--ink-dim); font-size: 14px; line-height:1.6; margin: 0 0 16px }
        .pj-tags{ display:flex; flex-wrap:wrap; gap: 6px }
        .pj-tag{
          font-family: var(--font-mono); font-size: 10.5px; padding: 4px 9px; border-radius: 99px;
          color: hsl(var(--hue) 60% 75%);
          background: hsl(var(--hue) 60% 30% / .2);
          border: 1px solid hsl(var(--hue) 60% 50% / .25);
        }
      `}</style>

      <div className="pj-head">
        <div>
          <div className="eyebrow">03 — Selected work</div>
          <h2 style={{marginTop:18}}>Things I've <span className="acc">shipped</span>.</h2>
        </div>
        <p style={{maxWidth:380, color:'var(--ink-dim)', fontSize:16, lineHeight:1.55, margin:0}}>
          From PepsiCo at Infosys to LPL Financial today — a decade of frontend work for global enterprises and fintechs.
        </p>
      </div>

      <div className="pj-grid">
        {PROJECTS.map((p,i)=> <ProjectCard key={p.n} p={p} idx={i}/>)}
      </div>
    </section>
  );
}

window.Projects = Projects;

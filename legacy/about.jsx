// about.jsx — About + animated career timeline
const { useEffect: useE_A, useRef: useR_A, useState: useS_A } = React;

const TIMELINE = [
  { y: "2015", co: "Infosys", role: "Senior System Engineer", loc: "Mysore · Chennai · Bangalore", d: "Built responsive UI for PepsiCo using Angular, Bootstrap and JavaScript. Trained in Python and SAP ABAP." },
  { y: "2018", co: "Charmboard", role: "Frontend Developer", loc: "Bangalore", d: "Modernized UI/UX with responsive design. Integrated CleverTap and engagement tooling." },
  { y: "2020", co: "Trivium Esolutions", role: "Senior Software Engineer", loc: "Bangalore", d: "Built Siemens User Management Portal with OAuth, PrimeNG components and Jasmine unit tests." },
  { y: "2021", co: "Incedo Inc.", role: "Senior Technical Lead", loc: "Gurugram", d: "Leading frontend architecture for LPL Financial. Owned data ingestion platform delivery and bank-account validation for Citibank. Mentor and reviewer." },
  { y: "2024", co: "MSc, Liverpool John Moores", role: "Master of Science", loc: "Liverpool, UK", d: "Completed MSc — deepening foundations in machine learning and AI-driven applications." },
];

function About(){
  const ref = useR_A(null);
  const [vis, setVis] = useS_A(false);
  useE_A(()=>{
    if(!ref.current) return;
    const io = new IntersectionObserver(es=>{
      es.forEach(e=>{ if(e.isIntersecting) setVis(true); });
    }, { threshold: 0.15 });
    io.observe(ref.current);
    return ()=> io.disconnect();
  }, []);

  return (
    <section id="about" data-screen-label="About" ref={ref}>
      <style>{`
        .ab-grid{ display:grid; grid-template-columns: .9fr 1.1fr; gap: 80px; align-items:start }
        @media (max-width: 980px){ .ab-grid{ grid-template-columns: 1fr; gap: 40px } }
        .ab-lead{ font-size: clamp(22px, 2vw, 28px); line-height:1.45; color: var(--ink); font-weight: 400}
        .ab-lead em{ font-family: var(--font-serif); font-style: italic; color: var(--accent); font-size: 1.1em }
        .ab-stats{ display:grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 36px }
        .ab-stat{ padding: 16px; border:1px solid var(--line); border-radius:12px }
        .ab-stat .n{ font-family: var(--font-display); font-size: 38px; font-weight:500; color: var(--ink); letter-spacing:-.02em }
        .ab-stat .l{ font-family: var(--font-mono); font-size: 11px; color: var(--ink-mute); letter-spacing:.08em; text-transform:uppercase; margin-top: 4px}

        .tl{ position:relative; padding-left: 28px }
        .tl::before{
          content:""; position:absolute; left:6px; top:8px; bottom:8px; width:1px;
          background: linear-gradient(180deg, transparent, var(--line-2) 10%, var(--line-2) 90%, transparent);
        }
        .tl-item{ position:relative; padding: 14px 0 26px }
        .tl-item::before{
          content:""; position:absolute; left:-28px; top: 22px;
          width:13px; height:13px; border-radius:50%;
          background: var(--bg-2); border:2px solid var(--accent);
          box-shadow: 0 0 0 4px rgba(92,242,194,.08);
          transform: scale(.4); opacity: 0; transition: transform .5s ease, opacity .5s ease;
        }
        .tl-item.in::before{ transform: scale(1); opacity: 1}
        .tl-item .yr{ font-family: var(--font-mono); font-size: 11px; letter-spacing:.12em; color: var(--accent); text-transform:uppercase }
        .tl-item .ti{ font-size: 19px; color: var(--ink); margin-top:2px; font-weight:500 }
        .tl-item .co{ font-family: var(--font-mono); font-size: 11px; color: var(--ink-mute); margin-top:4px; letter-spacing:.04em }
        .tl-item .de{ color: var(--ink-dim); font-size: 14px; margin-top: 8px; line-height:1.55 }
        .tl-item{ opacity:0; transform: translateY(12px); transition: opacity .6s ease, transform .6s ease }
        .tl-item.in{ opacity:1; transform: none }
      `}</style>

      <div className="eyebrow">01 — About</div>
      <div className="ab-grid" style={{marginTop:28}}>
        <div>
          <p className="ab-lead">
            I lead frontend teams building <em>scalable, enterprise-grade</em> UI for global fintech and product companies — and care deeply about architecture, performance and the developer experience around it.
          </p>
          <p style={{color:'var(--ink-dim)', lineHeight:1.65, fontSize:15, marginTop:24}}>
            Currently Senior Technical Lead at Incedo Inc., delivering financial systems for LPL Financial. Past clients include Citibank, Siemens, PepsiCo and Perforce. I hold an MSc from Liverpool John Moores University and an Executive PG from IIIT Bangalore, with a growing focus on AI-driven applications.
          </p>
          <div className="ab-stats">
            <div className="ab-stat"><div className="n">10+</div><div className="l">Years experience</div></div>
            <div className="ab-stat"><div className="n">4</div><div className="l">Enterprise clients led</div></div>
            <div className="ab-stat"><div className="n">MSc</div><div className="l">Liverpool JMU '24</div></div>
          </div>
        </div>

        <div className="tl">
          {TIMELINE.map((it, i)=>(
            <div key={it.y} className={`tl-item ${vis ? 'in':''}`} style={{transitionDelay: vis ? `${i*120}ms` : '0ms'}}>
              <div className="yr">{it.y}</div>
              <div className="ti">{it.role}</div>
              <div className="co">{it.co} · {it.loc}</div>
              <div className="de">{it.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.About = About;

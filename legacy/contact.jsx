// contact.jsx — Contact CTA
function Contact(){
  return (
    <section id="contact" data-screen-label="Contact" style={{paddingBottom: 60}}>
      <style>{`
        .ct-card{
          position:relative; padding: 80px 56px; border-radius: 22px;
          border: 1px solid var(--line-2);
          background:
            radial-gradient(80% 120% at 80% 0%, color-mix(in oklab, var(--accent) 20%, transparent), transparent 60%),
            radial-gradient(60% 100% at 0% 100%, color-mix(in oklab, var(--accent-2) 15%, transparent), transparent 60%),
            linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.005));
          overflow:hidden;
        }
        .ct-card::before{
          content:""; position:absolute; inset: 0;
          background-image:
            linear-gradient(var(--line) 1px, transparent 1px),
            linear-gradient(90deg, var(--line) 1px, transparent 1px);
          background-size: 56px 56px;
          opacity:.4;
          mask-image: radial-gradient(ellipse at 50% 50%, #000, transparent 75%);
          pointer-events:none;
        }
        .ct-inner{ position:relative }
        .ct-card h2{ font-size: clamp(40px, 5.4vw, 84px); line-height: 1; max-width: 14ch }
        .ct-card h2 .acc{ font-family: var(--font-serif); font-style: italic; color: var(--accent); font-weight:400 }
        .ct-channels{
          margin-top: 48px; display:grid; grid-template-columns: repeat(auto-fit, minmax(220px,1fr)); gap: 14px;
        }
        .ct-ch{
          display:flex; flex-direction:column; gap: 6px; padding: 18px 20px;
          border-radius: 14px; border: 1px solid var(--line);
          background: rgba(0,0,0,.25); text-decoration:none; transition: .25s;
        }
        .ct-ch:hover{ border-color: var(--accent); transform: translateY(-2px); background: color-mix(in oklab, var(--accent) 6%, rgba(0,0,0,.25)) }
        .ct-ch .lbl{ font-family: var(--font-mono); font-size: 10.5px; letter-spacing:.12em; text-transform:uppercase; color: var(--ink-mute) }
        .ct-ch .val{ font-size: 17px; color: var(--ink); font-weight:500 }
        .ct-foot{
          margin-top: 90px; padding-top: 28px; border-top: 1px solid var(--line);
          display:flex; justify-content:space-between; align-items:center; gap: 20px; flex-wrap:wrap;
          font-family: var(--font-mono); font-size: 12px; color: var(--ink-mute);
        }
        .ct-extra{
          margin-top: 40px; display:grid; grid-template-columns: repeat(auto-fit, minmax(200px,1fr)); gap: 14px;
          padding-top: 32px; border-top: 1px dashed var(--line);
        }
        .ct-extra .ix{ font-family: var(--font-mono); font-size: 10.5px; letter-spacing:.12em; color: var(--ink-mute); text-transform:uppercase; margin-bottom: 6px }
        .ct-extra .iy{ font-size: 14px; color: var(--ink-dim); line-height:1.5 }
        .ct-extra b{ color: var(--ink); font-weight:500 }
      `}</style>

      <div className="ct-card">
        <div className="ct-inner">
          <div className="eyebrow">05 — Let's talk</div>
          <h2 style={{marginTop:18}}>Got a project? <span className="acc">Let's build it.</span></h2>
          <p style={{maxWidth:540, color:'var(--ink-dim)', fontSize:17, lineHeight:1.6, marginTop: 22}}>
            Open to senior frontend roles, freelance engagements and consulting on Angular architecture and team leadership. Based in Delhi — happy to work remote or hybrid. I respond within a day.
          </p>

          <div className="ct-channels">
            <a className="ct-ch" href="mailto:sandeepsuneja04@gmail.com">
              <div className="lbl">Email</div>
              <div className="val">sandeepsuneja04@gmail.com</div>
            </a>
            <a className="ct-ch" href="https://www.linkedin.com/in/sandeep-suneja-b04607a8/" target="_blank" rel="noopener">
              <div className="lbl">LinkedIn</div>
              <div className="val">/in/sandeep-suneja →</div>
            </a>
            <a className="ct-ch" href="tel:+918285361389">
              <div className="lbl">Phone</div>
              <div className="val">+91 8285 361 389</div>
            </a>
            <a className="ct-ch" href="#hero">
              <div className="lbl">Location</div>
              <div className="val">Delhi, India 🇮🇳</div>
            </a>
          </div>

          <div className="ct-extra">
            <div>
              <div className="ix">Beyond code</div>
              <div className="iy">10K marathon finisher 🏃 · organizer of technical events &amp; workshops · growing focus on AI-driven applications.</div>
            </div>
            <div>
              <div className="ix">Currently</div>
              <div className="iy">Senior Technical Lead at <b>Incedo Inc.</b> — leading frontend for LPL Financial.</div>
            </div>
            <div>
              <div className="ix">Languages</div>
              <div className="iy"><b>English</b> · <b>Hindi</b> — comfortable with global, distributed teams.</div>
            </div>
          </div>

          <div className="ct-foot">
            <div>© 2026 Sandeep Suneja · Senior Technical Lead</div>
            <div>Architected with Angular taste · Built in HTML for the demo</div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Contact = Contact;

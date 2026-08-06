const { useState, useEffect, useRef, useCallback } = React;

/* ---------------------------------------------------------------- data --- */

const NAV_LINKS = [
  { href: 'index.html', label: 'HOME', active: true },
  { href: 'About.html', label: 'ABOUT', active: false },
  { href: 'Resume.html', label: 'RESUME', active: false },
];

const PLANTS = [
  { name: 'Thriving Agave', img: 'plant-1.jpg' },
  { name: 'Flourishing String of Pearls', img: 'plant-2.jpg' },
  { name: 'Blooming Haworthia', img: 'plant-3.jpg' },
  { name: 'Radiant Jade Plant', img: 'plant-4.jpg' },
  { name: 'Content Black-Eyed Susan', img: 'plant-5.jpg' },
  { name: 'Lush Poppy', img: 'plant-6.jpg' },
  { name: 'Happy Hydrangea', img: 'plant-7.jpg' },
  { name: 'Cheerful Hosta', img: 'plant-8.jpg' },
  { name: 'Thriving Snowball Viburnum', img: 'plant-9.jpg' },
  { name: 'Blooming Lavender', img: 'plant-10.jpg' },
];

const ROTATING_PHRASES = [
  { text: 'designing AI experiences', color: '#2A4A95' },
  { text: 'vibe coding POCs', color: '#EA580C' },
  { text: 'exploring new ways of working', color: '#16A34A' },
];

const BELIEFS = [
  {
    id: 'explore',
    icon: 'compass',
    iconClass: 'compass-icon',
    color: '#2A4A95',
    title: 'Keep exploring',
    copy: "I love solving problems and staying curious about what's changing. I use AI tools every day to refine our product & process.",
  },
  {
    id: 'judgement',
    icon: 'bolt',
    iconClass: '',
    color: '#EA580C',
    title: 'Apply judgement',
    copy: 'I use AI as an assistant, then apply critical thinking and UX expertise to deliver thoughtful design decisions.',
  },
  {
    id: 'together',
    icon: 'people',
    iconClass: 'people-icon',
    color: '#16A34A',
    title: 'Build together',
    copy: 'I enjoy working with people. Open communication and collaboration go a long way toward a successful product delivery.',
  },
];

const CASE_STUDIES = [
  {
    href: 'DocumentExtractor.html',
    variant: 'doc',
    tag: 'AI AGENT',
    title: 'Document Extractor',
    copy: 'An AI-powered assistant designed to automate data extraction at scale. The challenge is ',
    compact: false,
  },
  {
    href: 'IntakeAssistant.html',
    variant: 'intake',
    tag: 'CONVERSATIONAL AI',
    title: 'Intake Assistant',
    copy: 'placeholder text',
    compact: true,
  },
];

const MORE_WORK = [
  {
    img: 'more-sports.jpg',
    alt: 'xSports app screens',
    title: 'xSports',
    copy: 'Reimagined the experience for extreme sports enthusiasts to explore events, share experiences, and more.',
  },
  {
    img: 'more-greens.jpg',
    alt: 'Ge Greens Landscape Co. website',
    title: 'Ge Greens Landscape Co.',
    copy: 'Designed a website for an award-winning landscape design firm, showcasing their elegant design expertise.',
  },
  {
    img: 'more-simlq.jpg',
    alt: 'SiMLQ Smart Process Management website',
    title: 'SiMLQ Smart Process Management',
    copy: 'Created a website for a data-driven process management startup, highlighting their technology and solutions.',
  },
  {
    img: 'more-photography.jpg',
    alt: 'Photography',
    title: 'Photography',
    copy: 'Some moments in life that I caught with my phone.',
  },
];

/* --------------------------------------------------------------- icons --- */

function BurgerIcon() {
  return (
    <svg className="icon-burger" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="icon-close" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.94v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  );
}

/** Belief-card icons. `svgRef` is only wired up for the compass (it needs to
 *  rotate toward the cursor); the other two just render. */
function BeliefIcon({ icon, color, svgRef }) {
  if (icon === 'compass') {
    return (
      <svg ref={svgRef} width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path className="compass-needle" d="m15.5 8.5-2 5-5 2 2-5Z" />
      </svg>
    );
  }
  if (icon === 'bolt') {
    return (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z" />
      </svg>
    );
  }
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3" />
      <path d="M2 20c0-3 3-5 7-5s7 2 7 5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M22 20c0-2.5-2-4-4.5-4.3" />
    </svg>
  );
}

/* ---------------------------------------------------------- components --- */

function TypedPhrase() {
  const [text, setText] = useState('');
  const [color, setColor] = useState(ROTATING_PHRASES[0].color);

  useEffect(() => {
    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timer;

    function tick() {
      const phrase = ROTATING_PHRASES[phraseIdx].text;
      setColor(ROTATING_PHRASES[phraseIdx].color);
      if (!deleting) {
        charIdx++;
        setText(phrase.slice(0, charIdx));
        if (charIdx === phrase.length) {
          timer = setTimeout(() => { deleting = true; tick(); }, 1400);
          return;
        }
        timer = setTimeout(tick, 55);
      } else {
        charIdx--;
        setText(phrase.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % ROTATING_PHRASES.length;
          timer = setTimeout(tick, 300);
          return;
        }
        timer = setTimeout(tick, 30);
      }
    }

    tick();
    return () => clearTimeout(timer);
  }, []);

  return <span className="typed" style={{ color }}>{text}</span>;
}

function BeliefCard({ belief, index }) {
  const cardRef = useRef(null);
  const iconWrapRef = useRef(null);
  const svgRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isCompass = belief.icon === 'compass';

  const handleMouseMove = isCompass ? (e) => {
    const el = iconWrapRef.current;
    const svg = svgRef.current;
    if (!el || !svg) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * 180 / Math.PI + 90;
    svg.style.transform = `rotate(${angle}deg)`;
  } : undefined;

  const handleMouseLeave = isCompass ? () => {
    if (svgRef.current) svgRef.current.style.transform = 'rotate(0deg)';
  } : undefined;

  return (
    <div
      ref={cardRef}
      className={`belief-card${revealed ? ' revealed' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`belief-icon ${belief.iconClass}`} ref={iconWrapRef} style={{ color: belief.color }}>
        <BeliefIcon icon={belief.icon} color={belief.color} svgRef={isCompass ? svgRef : undefined} />
      </div>
      <h3 className="belief-title">{belief.title}</h3>
      <p className="belief-copy">{belief.copy}</p>
    </div>
  );
}

function CaseCard({ study }) {
  return (
    <a href={study.href} className={`case-card glow-${study.variant}`}>
      <div className={`case-card-media media-${study.variant}`}></div>
      <div className={`case-card-body${study.compact ? ' compact' : ''}`}>
        {study.compact ? (
          <div className="case-tag-row"><span className="case-tag">{study.tag}</span></div>
        ) : (
          <span className="case-tag">{study.tag}</span>
        )}
        <h3 className="case-title">{study.title}</h3>
        <p className="case-copy">{study.copy}</p>
        <div className="case-cta">VIEW CASE STUDY <span aria-hidden="true">→</span></div>
      </div>
    </a>
  );
}

function WorkItem({ item }) {
  return (
    <div className="work-item">
      <div className="work-thumb"><img src={item.img} alt={item.alt} /></div>
      <h3 className="work-title">{item.title}</h3>
      <p className="work-copy">{item.copy}</p>
    </div>
  );
}

function PlantBox() {
  const [claimed, setClaimed] = useState(false);
  const [shown, setShown] = useState(false);
  const [plant, setPlant] = useState(null);
  const currentIdxRef = useRef(-1);

  useEffect(() => {
    PLANTS.forEach((p) => { const im = new Image(); im.src = p.img; });
  }, []);

  useEffect(() => {
    if (!claimed) { setShown(false); return; }
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, [claimed]);

  const pickPlant = useCallback(() => {
    let idx;
    do { idx = Math.floor(Math.random() * PLANTS.length); } while (idx === currentIdxRef.current && PLANTS.length > 1);
    currentIdxRef.current = idx;
    setPlant(PLANTS[idx]);
  }, []);

  const handleClaim = () => {
    pickPlant();
    setClaimed(true);
  };

  const handleShuffle = (e) => {
    e.stopPropagation();
    pickPlant();
  };

  return (
    <div className="plant-box" style={{ cursor: claimed ? 'default' : 'pointer' }} onClick={!claimed ? handleClaim : undefined}>
      {!claimed ? (
        <div className="plant-placeholder"><span>CLAIM A PLANT</span></div>
      ) : (
        <div className={`plant-reveal${shown ? ' shown' : ''}`}>
          <div className="plant-art-wrap">
            <img className="plant-art" src={plant.img} alt="Plant" />
          </div>
          <div className="plant-name">{plant.name}</div>
          <div className="plant-shuffle" onClick={handleShuffle}>Shuffle</div>
        </div>
      )}
    </div>
  );
}

function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 880) setMenuOpen(false);
    }
    function handleKey(e) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    window.addEventListener('resize', handleResize);
    document.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <aside className={`sidebar${menuOpen ? ' menu-open' : ''}`}>
      <div>
        <div className="sidebar-topline">
          <a href="index.html" className="logo">MI HUANG</a>
          <button
            type="button"
            className="menu-toggle"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="sidebar-nav sidebar-footer-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <BurgerIcon />
            <CloseIcon />
          </button>
        </div>
        <nav className="sidebar-nav" id="sidebar-nav">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link${link.active ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="sidebar-footer" id="sidebar-footer-menu">
        <PlantBox />
        <div className="sidebar-social">
          <a className="social-link" href="https://www.linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn"><LinkedInIcon /></a>
          <a className="social-link" href="mailto:hello@example.com" aria-label="Email"><EmailIcon /></a>
        </div>
      </div>
    </aside>
  );
}

function Main() {
  return (
    <main className="site-main">
      <div className="blob" aria-hidden="true"></div>
      <div className="content">

        <section className="hero">
          <p className="hero-text">
            Hi, I'm Mi, a product designer with a passion for solving complex problems and bringing feasible experiences that meet user needs and business goals.
            <br />
            <span className="hero-line2">Currently <TypedPhrase /><span className="cursor">|</span> @ PwC Canada</span>
          </p>
        </section>

        <section className="beliefs">
          <div className="section-label">In today's fast-changing world, I believe:</div>
          <div className="belief-grid">
            {BELIEFS.map((belief, i) => (
              <BeliefCard key={belief.id} belief={belief} index={i} />
            ))}
          </div>
        </section>

        <section className="work-section">
          <div className="section-label">Selected work</div>
          <div className="case-list">
            {CASE_STUDIES.map((study) => (
              <CaseCard key={study.href} study={study} />
            ))}
          </div>
        </section>

        <section className="more-section">
          <div className="section-label wide">A little bit more</div>
          <div className="work-grid">
            {MORE_WORK.map((item) => (
              <WorkItem key={item.img} item={item} />
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

function App() {
  return (
    <div className="page">
      <Sidebar />
      <Main />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

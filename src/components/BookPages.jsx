import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import kunikaPhoto from '../assets/kunika.jpg';
import {
  User, Briefcase, Sparkles, Mail, Code, Cpu,
  ExternalLink, Send, Globe, Compass, CheckCircle2
} from 'lucide-react';
import { client, urlFor, aboutQuery, projectsQuery, skillsQuery, contactQuery } from '../sanity/client.js';

/* ─────────────────────────────────────────────
   Social icon helpers
───────────────────────────────────────────── */
const Github = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Twitter = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

/* ─────────────────────────────────────────────
   1. ABOUT ME — Typographic-first layout
───────────────────────────────────────────── */
export const AboutPage = ({ onNext }) => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    client.fetch(aboutQuery).then(setAbout).catch(() => {});
  }, []);

  const name = about?.name ?? 'KUNIKA PAGARIA';
  const designation = about?.designation ?? 'AI Assisted Developer';
  const bio = about?.bio ?? 'Engineering graduate with a strong interest in product development, project management, and technology-driven problem solving. Skilled at turning ideas into practical, user-focused products through fast execution and modern development tools. Comfortable working across both technical and creative workflows, with a focus on building functional, deployment-ready applications. Known for adaptability, quick learning, problem-solving, and working effectively in fast-paced environments.';
  const photo = about?.profileImage ? urlFor(about.profileImage).width(200).url() : kunikaPhoto;

  return (
    <div className="paper-page about-redesign-card">
      <div className="about-card-frame">
        <p className="about-card-subtitle">INTRODUCTION</p>

        {/* Photo left + Name/Designation right */}
        <div className="about-card-inner">
          <div className="about-card-photo-wrap">
            <img src={photo} alt={name} className="about-card-photo" />
          </div>

          <div className="about-card-info">
            <h1 className="about-card-title">{name.toUpperCase()}</h1>
            <p className="about-card-designation">{designation}</p>
          </div>
        </div>

        {/* Bio below, full width, centered */}
        <p className="about-card-bio">{bio}</p>
      </div>

      <p className="about-card-quote">
        "To write is to carve a constellation onto paper. To code is to make it shine."
      </p>

      {onNext && (
        <div className="page-number" onClick={onNext}>1</div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   2. SKILLS — Constellation dot-map
───────────────────────────────────────────── */
const FALLBACK_GROUPS = {
  technical: {
    label: 'TECHNICAL',
    icon: <Cpu size={12} />,
    items: ['Prompt Engineering', 'AI-Assisted Product Dev', 'Deployment & Hosting', 'Debugging & Testing'],
  },
  tools: {
    label: 'TOOLS',
    icon: <Code size={12} />,
    items: ['React', 'JavaScript', 'Python', 'HTML · CSS', 'C++', 'Figma', 'GitHub', 'Docker'],
  },
  'soft-skills': {
    label: 'SOFT SKILLS',
    icon: <Sparkles size={12} />,
    items: ['Leadership', 'Communication', 'Adaptability', 'Problem Solving', 'Fast Learning'],
  },
  languages: {
    label: 'LANGUAGES',
    icon: <Globe size={12} />,
    items: ['English — Prof.', 'Hindi — Native', 'Bengali — Conv.'],
  },
};

function buildGroupsFromSanity(skills) {
  if (!skills || skills.length === 0) return null;

  // Bucket each skill into one of the 4 fixed slots by keyword-matching the category
  const buckets = { technical: [], tools: [], 'soft-skills': [], languages: [] };
  skills.forEach(s => {
    const l = s.category.toLowerCase();
    if (l.includes('lang'))                            buckets.languages.push(s.name);
    else if (l.includes('tool') || l.includes('devop')) buckets.tools.push(s.name);
    else if (l.includes('soft'))                       buckets['soft-skills'].push(s.name);
    else                                               buckets.technical.push(s.name);
  });

  const total = Object.values(buckets).reduce((n, a) => n + a.length, 0);
  if (total === 0) return null;

  // Keep fixed labels + icons; only swap items from Sanity (fall back per-bucket if empty)
  return {
    technical: {
      label: 'TECHNICAL', icon: <Cpu size={12} />,
      items: buckets.technical.length ? buckets.technical : FALLBACK_GROUPS.technical.items,
    },
    tools: {
      label: 'TOOLS', icon: <Code size={12} />,
      items: buckets.tools.length ? buckets.tools : FALLBACK_GROUPS.tools.items,
    },
    'soft-skills': {
      label: 'SOFT SKILLS', icon: <Sparkles size={12} />,
      items: buckets['soft-skills'].length ? buckets['soft-skills'] : FALLBACK_GROUPS['soft-skills'].items,
    },
    languages: {
      label: 'LANGUAGES', icon: <Globe size={12} />,
      items: buckets.languages.length ? buckets.languages : FALLBACK_GROUPS.languages.items,
    },
  };
}

export const SkillsPage = ({ onNext }) => {
  const [hoveredGroup, setHoveredGroup] = useState(null);
  const [sanitySkills, setSanitySkills] = useState(null);

  useEffect(() => {
    client.fetch(skillsQuery).then(setSanitySkills).catch(() => {});
  }, []);

  const groups = buildGroupsFromSanity(sanitySkills) ?? FALLBACK_GROUPS;

  return (
    <div className="paper-page skills-redesign">
      <div className="running-header">
        <span className="running-header-text">ABOUT ME</span>
        <div className="running-header-line" />
      </div>

      <div className="mindmap-container">

        {/* Central Hub wrapper to handle drop shadow outside clip-path */}
        <div className="mindmap-hub-wrapper">
          <div className="mindmap-hub">
            <span className="hub-label">SKILLS</span>
          </div>
        </div>

        {/* Category Cards */}
        {Object.entries(groups).map(([key, g]) => {
          const isActive = hoveredGroup === key;
          const isAnyActive = hoveredGroup !== null;
          return (
            <div
              key={key}
              className={`mindmap-card-wrapper wrapper-${key} ${isActive ? 'active' : ''} ${isAnyActive && !isActive ? 'dimmed' : ''}`}
              onMouseEnter={() => setHoveredGroup(key)}
              onMouseLeave={() => setHoveredGroup(null)}
            >
              <div className="mindmap-card">
                <div className="mindmap-card-header">
                  <span className="mindmap-card-icon" style={{ color: 'var(--color-gold)' }}>{g.icon}</span>
                  <span className="mindmap-card-title">{g.label}</span>
                </div>
                <div className="mindmap-card-content">
                  {g.items.length > 4 ? (
                    <div className="mindmap-list-two-col">
                      <ul className="mindmap-list">
                        {g.items.slice(0, Math.ceil(g.items.length / 2)).map((item, j) => (
                          <li key={j} className="mindmap-list-item">
                            <span className="bullet-dot" style={{ backgroundColor: 'var(--color-gold)' }} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <ul className="mindmap-list">
                        {g.items.slice(Math.ceil(g.items.length / 2)).map((item, j) => (
                          <li key={j} className="mindmap-list-item">
                            <span className="bullet-dot" style={{ backgroundColor: 'var(--color-gold)' }} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <ul className="mindmap-list">
                      {g.items.map((item, j) => (
                        <li key={j} className="mindmap-list-item">
                          <span className="bullet-dot" style={{ backgroundColor: 'var(--color-gold)' }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {onNext && (
        <div className="page-number" onClick={onNext}>2</div>
      )}
    </div>
  );
};


/* ─────────────────────────────────────────────
   3. JOURNEY — Minimal strip table
───────────────────────────────────────────── */
export const JourneyPage = ({ onPrev, onNext }) => {
  const entries = [
    { cat: 'Education', title: 'B.Tech in Engineering' },
    { cat: 'Leadership', title: 'NCC Naval Wing Captain' },
    { cat: 'Internships', title: 'Product Development' },
    { cat: 'Projects', title: 'AI-Assisted Applications' },
    { cat: 'Skills', title: 'AI Debugging & Testing' },
    { cat: 'Career', title: 'Full Stack Engineering' },
  ];

  return (
    <div className="paper-page journey-redesign">
      <h2 className="page-title-minimal">
        <Compass size={16} className="page-title-icon" /> My Journey
      </h2>
      <div className="journey-strip">
        {entries.map((e, i) => (
          <div key={i} className="journey-strip-row">
            <span className="journey-strip-cat">{e.cat}</span>
            <span className="journey-strip-rule" />
            <span className="journey-strip-title">{e.title}</span>
          </div>
        ))}
      </div>
      {onPrev && <div className="page-number" onClick={onPrev}>3</div>}
      {onNext && <div className="page-number" onClick={onNext}>4</div>}
    </div>
  );
};

/* ─────────────────────────────────────────────
   4. WORK — Cards with hover-reveal description
───────────────────────────────────────────── */
const FALLBACK_PROJECTS = [
  {
    title: 'Stellar Canvas',
    desc: 'Generative astronomical simulator drawing 10 k particle stars with gravity mechanics.',
    tags: ['React', 'Canvas API', 'Physics'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Sonata Audio Engine',
    desc: 'Interactive visualizer mapping string frequencies to canvas drawings.',
    tags: ['Web Audio', 'CSS 3D', 'Vite'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Orbital Pathmaker',
    desc: 'Educational 3D interface teaching celestial math and Keplerian orbits.',
    tags: ['React', 'Three.js', 'Math'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Nebula Shader Engine',
    desc: 'Procedural raymarching gas simulator mapping audio frequencies to gas density.',
    tags: ['GLSL', 'WebGL', 'Shaders'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Aetheria Synth Node',
    desc: 'Modular node interface connecting frequency synthesizers with canvas drawings.',
    tags: ['Web Audio', 'React', 'Canvas'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Gravity Well Sim',
    desc: 'Keplerian orbit solver calculating gravitational vectors for binary star systems.',
    tags: ['Physics', 'JavaScript', 'Vector Math'],
    github: '#',
    demo: '#',
  },
];

export const WorkPage = ({ part = 1, onPrev, onNext }) => {
  const [sanityProjects, setSanityProjects] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const itemRefs = useRef([]);
  useEffect(() => {
    client.fetch(projectsQuery).then(setSanityProjects).catch(() => {});
  }, []);

  // The book's compound 3D page-flip transform (parent rotateY + child rotateY
  // around mismatched origins) distorts native hit-testing for content far from
  // the flip's pivot edge, so hover/mouseenter can silently never fire there even
  // though the element is visually correct. Compute "hovered" from raw cursor
  // coordinates instead of relying on the browser's native hover/mouseenter.
  useEffect(() => {
    const handleMove = (e) => {
      let found = null;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
          found = i;
        }
      });
      setHoveredIdx(found);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const allProjects = sanityProjects
    ? sanityProjects.map(p => ({
        title: p.title,
        desc: p.description ?? '',
        tags: p.techStack ?? [],
        github: p.githubUrl ?? '#',
        demo: p.liveUrl ?? '#',
        image: p.image ? urlFor(p.image).width(900).url() : null,
      }))
    : FALLBACK_PROJECTS;

  const projects = part === 1 ? allProjects.slice(0, 2) : allProjects.slice(2, 4);

  return (
    <div className="paper-page work-alt-layout">
      <div className="work-alt-header">
        <Briefcase size={13} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
        <span>Selected Work</span>
      </div>

      <div className={`work-editorial-list ${projects.length === 1 ? 'is-single' : ''}`}>
        {projects.map((p, i) => {
          const imgRight = i % 2 === 0;
          return (
            <div
              key={i}
              ref={el => { itemRefs.current[i] = el; }}
              className={`work-editorial-item ${imgRight ? '' : 'work-editorial-flip'} ${hoveredIdx === i ? 'is-hovered' : ''}`}
            >

              <div className="work-editorial-text">
                <p className="work-editorial-title">{p.title}</p>
                <p className="work-editorial-desc">{p.desc}</p>
                <div className="work-editorial-meta">
                  <div className="work-alt-tags">
                    {p.tags.slice(0, 3).map((t, j) => (
                      <span key={j} className="work-alt-tag">{t}</span>
                    ))}
                  </div>
                  <div className="work-alt-links">
                    {p.github !== '#' && <a href={p.github} target="_blank" rel="noopener noreferrer" title="GitHub"><Github size={13} /></a>}
                    {p.demo !== '#' && <a href={p.demo} target="_blank" rel="noopener noreferrer" title="Live"><ExternalLink size={13} /></a>}
                  </div>
                </div>
              </div>

              <div className="work-editorial-img">
                {p.image ? <img src={p.image} alt={p.title} /> : <div className="work-editorial-img-placeholder" />}
              </div>

            </div>
          );
        })}
      </div>

      {onPrev && <div className="page-number" onClick={onPrev}>5</div>}
      {onNext && <div className="page-number" onClick={onNext}>6</div>}
    </div>
  );
};

/* ─────────────────────────────────────────────
   5. FUN FACTS — Clean grid (unchanged style)
───────────────────────────────────────────── */
export const FunFactsPage = ({ onPrev, onNext }) => {
  const facts = [
    { title: 'Court & Hoops',  desc: 'Played competitive basketball tournaments — fast breaks, team strategy, and the thrill of the buzzer.', emoji: '🏀' },
    { title: 'Musical Keys',   desc: 'Trained keyboard player with a distinction in classical performance. Music is how I think in patterns.', emoji: '🎹' },
    { title: 'Star Gazer',     desc: 'Attended astronomy camps, learned stellar coordinates, and once stayed up all night tracking Jupiter.', emoji: '🌌' },
    { title: 'Olympiads',      desc: 'Competed in Mathematics and English Olympiads — sharpened logic and language under pressure.', emoji: '🧠' },
    { title: 'Tech Maker',     desc: 'Building real-world tools with AI assistance — from idea to shipped product, independently.', emoji: '💡' },
  ];

  return (
    <div className="paper-page funfacts-page">
      <div className="funfacts-header">
        <Sparkles size={14} style={{ color: 'var(--color-gold)' }} />
        <span>Fun Facts</span>
      </div>
      <div className="funfacts-list">
        {facts.map((f, i) => (
          <div key={i} className="funfact-row">
            <div className="funfact-left">
              <span className="funfact-num">0{i + 1}</span>
              <span className="funfact-emoji">{f.emoji}</span>
            </div>
            <div className="funfact-body">
              <div className="funfact-title">{f.title}</div>
              <div className="funfact-desc">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
      {onPrev && <div className="page-number" onClick={onPrev}>7</div>}
      {onNext && <div className="page-number" onClick={onNext}>7</div>}
    </div>
  );
};

/* ─────────────────────────────────────────────
   6. CONTACT — Centered minimal letter form
───────────────────────────────────────────── */
export const ContactPage = ({ onPrev, onNext }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [contact, setContact] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    client.fetch(contactQuery).then(setContact).catch(() => {});
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);
    setError('');

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
    ).then(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }).catch(() => {
      setLoading(false);
      setError('Failed to send. Please try again.');
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="paper-page contact-page">
      <div className="contact-page-header">
        <Mail size={15} /> Write to Me
      </div>

      {submitted ? (
        <div className="contact-sent">
          <CheckCircle2 size={36} color="#c5a880" />
          <p className="contact-sent-text">Message sent.<br />I'll be in touch beneath the stars.</p>
          <button className="contact-again-btn" onClick={() => setSubmitted(false)}>Send another</button>
        </div>
      ) : (
        <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
          <label className="contact-field" htmlFor="cf-name">
            <span className="contact-field-label">Name</span>
            <input id="cf-name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
          </label>
          <label className="contact-field" htmlFor="cf-email">
            <span className="contact-field-label">Email</span>
            <input id="cf-email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
          </label>
          <label className="contact-field contact-field-message" htmlFor="cf-msg">
            <span className="contact-field-label">Message</span>
            <textarea id="cf-msg" name="message" value={formData.message} onChange={handleChange} placeholder="Write your message…" required />
          </label>
          <button type="submit" className="contact-submit" disabled={loading}>
            {loading ? 'Sending…' : <><Send size={13} /> Send Letter</>}
          </button>
          {error && <p className="contact-form-error">{error}</p>}
          <div className="contact-socials">
            <a href={contact?.github || '#'} target="_blank" rel="noopener noreferrer"><Github size={16} /></a>
            <a href={contact?.linkedin || '#'} target="_blank" rel="noopener noreferrer"><Linkedin size={16} /></a>
            <a href={contact?.twitter || '#'} target="_blank" rel="noopener noreferrer"><Twitter size={16} /></a>
          </div>
        </form>
      )}

      {onPrev && <div className="page-number" onClick={onPrev}>8</div>}
      {onNext && <div className="page-number" onClick={onNext}>8</div>}
    </div>
  );
};

import React, { useState } from 'react';
import kunikaPhoto from '../assets/kunika.jpg';
import {
  User, Briefcase, Sparkles, Mail, Code, Cpu,
  ExternalLink, Send, Globe, Compass, CheckCircle2
} from 'lucide-react';

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
export const AboutPage = ({ onNext }) => (
  <div className="paper-page about-redesign-card">
    <div className="about-card-frame">
      <p className="about-card-subtitle">INTRODUCTION</p>

      {/* Photo left + Name/Designation right */}
      <div className="about-card-inner">
        <div className="about-card-photo-wrap">
          <img src={kunikaPhoto} alt="Kunika Pagaria" className="about-card-photo" />
        </div>

        <div className="about-card-info">
          <h1 className="about-card-title">KUNIKA PAGARIA</h1>
          <p className="about-card-designation">AI Assisted Developer</p>
        </div>
      </div>

      {/* Bio below, full width, centered */}
      <p className="about-card-bio">
        Engineering graduate with a strong interest in product development, project management,
        and technology-driven problem solving. Skilled at turning ideas into practical,
        user-focused products through fast execution and modern development tools.
        Comfortable working across both technical and creative workflows, with a focus on
        building functional, deployment-ready applications. Known for adaptability, quick
        learning, problem-solving, and working effectively in fast-paced environments.
      </p>
    </div>

    <p className="about-card-quote">
      "To write is to carve a constellation onto paper. To code is to make it shine."
    </p>

    {onNext && (
      <div className="page-number" onClick={onNext}>1</div>
    )}
  </div>
);

/* ─────────────────────────────────────────────
   2. SKILLS — Constellation dot-map
───────────────────────────────────────────── */
const StarDot = ({ color = 'var(--color-gold)' }) => (
  <svg width="9" height="9" viewBox="0 0 10 10" style={{ flexShrink: 0, marginTop: '2px' }}>
    <path d="M5 0 L6.2 3.8 L10 5 L6.2 6.2 L5 10 L3.8 6.2 L0 5 L3.8 3.8 Z" fill={color} />
  </svg>
);

export const SkillsPage = ({ onNext }) => {
  const [hoveredGroup, setHoveredGroup] = useState(null);

  const groups = {
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

  return (
    <div className="paper-page skills-redesign">

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
                  {key === 'tools' ? (
                    <div className="mindmap-list-two-col">
                      <ul className="mindmap-list">
                        {g.items.slice(0, 4).map((item, j) => (
                          <li key={j} className="mindmap-list-item">
                            <span className="bullet-dot" style={{ backgroundColor: 'var(--color-gold)' }} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <ul className="mindmap-list">
                        {g.items.slice(4).map((item, j) => (
                          <li key={j + 4} className="mindmap-list-item">
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
export const WorkPage = ({ part = 1, onPrev, onNext }) => {
  const allProjects = [
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

  const projects = part === 1 ? allProjects.slice(0, 3) : allProjects.slice(3);

  return (
    <div className="paper-page work-redesign">
      <h2 className="page-title-minimal">
        <Briefcase size={16} className="page-title-icon" /> Selected Work
      </h2>
      <div className="work-cards-minimal">
        {projects.map((p, i) => (
          <div key={i} className="work-card-minimal">
            {/* Always-visible layer */}
            <div className="work-card-top">
              <span className="work-card-name">{p.title}</span>
              <div className="work-card-tags">
                {p.tags.map((t, j) => <span key={j} className="work-tag">{t}</span>)}
              </div>
            </div>
            {/* Hover-reveal layer */}
            <div className="work-card-reveal">
              <p className="work-reveal-desc">{p.desc}</p>
              <div className="work-reveal-links">
                <a href={p.github} title="GitHub"><Github size={14} /></a>
                <a href={p.demo} title="Demo"><ExternalLink size={14} /></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      {onPrev && (
        <div className="page-number" onClick={onPrev}>{part === 1 ? 5 : 6}</div>
      )}
      {onNext && (
        <div className="page-number" onClick={onNext}>{part === 1 ? 5 : 6}</div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   5. FUN FACTS — Clean grid (unchanged style)
───────────────────────────────────────────── */
export const FunFactsPage = ({ onPrev, onNext }) => {
  const facts = [
    { title: 'Court & Hoops', val: 'Competitive basketball tournaments', emoji: '🏀' },
    { title: 'Musical Keys', val: 'Keyboard — distinction honours', emoji: '🎹' },
    { title: 'Star Gazer', val: 'Astronomy camps & stellar coordinates', emoji: '🌌' },
    { title: 'Olympiads', val: 'Mathematics & English Olympiads', emoji: '🧠' },
    { title: 'Tech Maker', val: 'Real-world tools through AI dev', emoji: '💡' },
  ];

  return (
    <div className="paper-page funfacts-redesign">
      <h2 className="page-title-minimal">
        <Sparkles size={16} className="page-title-icon" /> Fun Facts
      </h2>
      <div className="facts-grid-minimal">
        {facts.map((f, i) => (
          <div key={i} className="fact-item-minimal">
            <span className="fact-emoji-minimal">{f.emoji}</span>
            <div>
              <div className="fact-name-minimal">{f.title}</div>
              <div className="fact-val-minimal">{f.val}</div>
            </div>
          </div>
        ))}
      </div>
      {onPrev && (
        <div className="page-number" onClick={onPrev}>7</div>
      )}
      {onNext && (
        <div className="page-number" onClick={onNext}>7</div>
      )}
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="paper-page contact-redesign">
      <h2 className="page-title-minimal">
        <Mail size={16} className="page-title-icon" /> Write to Me
      </h2>

      {submitted ? (
        <div className="contact-success">
          <CheckCircle2 size={40} color="#c5a880" />
          <p className="contact-success-text">Message sent. I'll be in touch beneath the stars.</p>
          <button className="contact-resend-btn" onClick={() => setSubmitted(false)}>Send another</button>
        </div>
      ) : (
        <form className="contact-form-minimal" onSubmit={handleSubmit}>
          <div className="contact-field">
            <label>Name</label>
            <input
              type="text" name="name" value={formData.name}
              onChange={handleChange} placeholder="Your name" required
            />
          </div>
          <div className="contact-field">
            <label>Email</label>
            <input
              type="email" name="email" value={formData.email}
              onChange={handleChange} placeholder="your@email.com" required
            />
          </div>
          <div className="contact-field">
            <label>Message</label>
            <textarea
              name="message" value={formData.message}
              onChange={handleChange} placeholder="Write your message…"
              rows="4" style={{ resize: 'none' }} required
            />
          </div>
          <button type="submit" className="contact-send-btn" disabled={loading}>
            {loading ? 'Sending…' : <><Send size={13} /> Send Letter</>}
          </button>
        </form>
      )}

      <div className="contact-socials-minimal">
        <a href="#" title="GitHub"><Github size={16} /></a>
        <a href="#" title="LinkedIn"><Linkedin size={16} /></a>
        <a href="#" title="Twitter"><Twitter size={16} /></a>
      </div>

      {onPrev && (
        <div className="page-number" onClick={onPrev}>8</div>
      )}
      {onNext && (
        <div className="page-number" onClick={onNext}>8</div>
      )}
    </div>
  );
};

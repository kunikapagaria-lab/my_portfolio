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
  <div className="paper-page about-redesign">
    {/* Large typographic name block */}
    <div className="about-name-block">
      <p className="about-label">Portfolio · Vol. I</p>
      <h1 className="about-big-name">KUNIKA<br />PAGARIA</h1>
      <div className="about-gold-rule" />
      <p className="about-role-line">AI Assisted Full Stack Developer</p>
    </div>

    {/* Photo + punchy bio side by side */}
    <div className="about-body-row">
      <div className="about-photo-wrap">
        <img src={kunikaPhoto} alt="Kunika Pagaria" className="about-photo-angled" />
      </div>
      <div className="about-bio-wrap">
        <p className="about-bio-text">
          Engineering graduate building products at the intersection of AI and design.
          Fast executor. Creative thinker. Deployment-ready builder.
        </p>
        <ul className="about-facts-list">
          <li><span className="about-fact-dot">✦</span> B.Tech Engineering</li>
          <li><span className="about-fact-dot">✦</span> NCC Naval Wing Captain</li>
          <li><span className="about-fact-dot">✦</span> Full Stack Developer</li>
          <li><span className="about-fact-dot">✦</span> Kolkata, India</li>
        </ul>
      </div>
    </div>

    {onNext && (
      <span className="corner-tab corner-tab-right" onClick={onNext} style={{ bottom: '15px' }}>
        Journey &rarr;
      </span>
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
  const groups = [
    {
      label: 'TECHNICAL',
      color: '#c5a880',
      items: ['Prompt Engineering', 'AI-Assisted Product Dev', 'Deployment & Hosting', 'Debugging & Testing'],
    },
    {
      label: 'TOOLS',
      color: '#7b9cc4',
      items: ['React', 'JavaScript', 'Python', 'HTML · CSS', 'C++', 'Figma', 'GitHub', 'Docker'],
    },
    {
      label: 'SOFT SKILLS',
      color: '#8b9bbb',
      items: ['Leadership', 'Communication', 'Adaptability', 'Problem Solving', 'Fast Learning'],
    },
    {
      label: 'LANGUAGES',
      color: '#a0a8bf',
      items: ['English — Professional', 'Hindi — Native', 'Bengali — Conversational'],
    },
  ];

  return (
    <div className="paper-page skills-redesign">
      <h2 className="page-title-minimal">
        <Code size={16} className="page-title-icon" /> Skills &amp; Expertise
      </h2>
      <div className="constellation-groups">
        {groups.map((g, i) => (
          <div key={i} className="constellation-group">
            <div className="constellation-group-header">
              <span className="constellation-group-line" />
              <span className="constellation-group-label">{g.label}</span>
              <span className="constellation-group-line" />
            </div>
            <div className="constellation-dots">
              {g.items.map((item, j) => (
                <span key={j} className="constellation-dot-item">
                  <StarDot color={g.color} />
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {onNext && (
        <span className="corner-tab corner-tab-right" onClick={onNext} style={{ bottom: '15px' }}>
          Journey &rarr;
        </span>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   3. JOURNEY — Minimal strip table
───────────────────────────────────────────── */
export const JourneyPage = ({ onPrev, onNext }) => {
  const entries = [
    { cat: 'Education',   title: 'B.Tech in Engineering' },
    { cat: 'Leadership',  title: 'NCC Naval Wing Captain' },
    { cat: 'Internships', title: 'Product Development' },
    { cat: 'Projects',    title: 'AI-Assisted Applications' },
    { cat: 'Skills',      title: 'AI Debugging & Testing' },
    { cat: 'Career',      title: 'Full Stack Engineering' },
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
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
        {onPrev && (
          <span className="corner-tab corner-tab-left" onClick={onPrev} style={{ bottom: '15px' }}>
            &larr; About
          </span>
        )}
        {onNext && (
          <span className="corner-tab corner-tab-right" onClick={onNext} style={{ bottom: '15px' }}>
            Work &rarr;
          </span>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   4. WORK — Cards with hover-reveal description
───────────────────────────────────────────── */
export const WorkPage = ({ onPrev, onNext }) => {
  const projects = [
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
  ];

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
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
        {onPrev && (
          <span className="corner-tab corner-tab-left" onClick={onPrev}>
            &larr; Journey
          </span>
        )}
        {onNext && (
          <span className="corner-tab corner-tab-right" onClick={onNext}>
            Facts &rarr;
          </span>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   5. FUN FACTS — Clean grid (unchanged style)
───────────────────────────────────────────── */
export const FunFactsPage = ({ onPrev, onNext }) => {
  const facts = [
    { title: 'Cadet Captain',   val: 'NCC Naval Wing (2022–2025)',             emoji: '🏅' },
    { title: 'National Camps',  val: 'RDC 2025 · Ship Attachment · Sailing',   emoji: '🇮🇳' },
    { title: 'Commendations',   val: 'DG NCC & GOC-IN-C Eastern Command',       emoji: '🎖️' },
    { title: 'Naval Anchors',   val: 'Leadership, discipline, adventure',       emoji: '⚓' },
    { title: 'Court & Hoops',   val: 'Competitive basketball tournaments',      emoji: '🏀' },
    { title: 'Musical Keys',    val: 'Keyboard — distinction honours',          emoji: '🎹' },
    { title: 'Star Gazer',      val: 'Astronomy camps & stellar coordinates',   emoji: '🌌' },
    { title: 'Olympiads',       val: 'Mathematics & English Olympiads',         emoji: '🧠' },
    { title: 'Tech Maker',      val: 'Real-world tools through AI dev',         emoji: '💡' },
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
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
        {onPrev && (
          <span className="corner-tab corner-tab-left" onClick={onPrev}>
            &larr; Work
          </span>
        )}
        {onNext && (
          <span className="corner-tab corner-tab-right" onClick={onNext}>
            Contact &rarr;
          </span>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   6. CONTACT — Centered minimal letter form
───────────────────────────────────────────── */
export const ContactPage = ({ onPrev }) => {
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
        <span className="corner-tab corner-tab-left" onClick={onPrev}>
          &larr; Facts
        </span>
      )}
    </div>
  );
};

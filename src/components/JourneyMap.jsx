export const THEME = {
  A: { pageBg: 'transparent', btnActive: '#1a4a7a', btnActiveTxt: 'white', dark: false, stroke: '#1a4a7a', strokeSecondary: '#8aaac8', textMain: '#103055', textMuted: '#5a7aaa', font: 'var(--font-serif)' },
  B: { pageBg: 'transparent', btnActive: '#c5a880', btnActiveTxt: '#04070f', dark: false, stroke: '#9a3412', strokeSecondary: '#312e81', textMain: '#1e1b4b', textMuted: '#475569', font: 'var(--font-serif)' },
  C: { pageBg: 'transparent', btnActive: '#4a6f44', btnActiveTxt: 'white', dark: false, stroke: '#2d4a25', strokeSecondary: '#c0392b', textMain: '#2e1f0e', textMuted: '#7a5520', font: 'var(--font-sans)' },
  D: { pageBg: 'transparent', btnActive: '#2e6bc7', btnActiveTxt: 'white', dark: false, stroke: '#1c2d5e', strokeSecondary: '#ffd54f', textMain: '#1c2d5e', textMuted: '#6c7a9c', font: 'var(--font-sans)' },
  E: { pageBg: 'transparent', btnActive: '#7a3d10', btnActiveTxt: 'white', dark: false, stroke: '#5c3815', strokeSecondary: '#c5a880', textMain: '#4a2808', textMuted: '#8c5f35', font: 'var(--font-serif)' },
};

/* Milestone dot — three concentric circles */
const Dot = ({ cx, cy }) => (
  <>
    <circle cx={cx} cy={cy} r={16} fill="#3e280e" opacity={0.15} />
    <circle cx={cx} cy={cy} r={14} fill="#5a3c1c" />
    <circle cx={cx} cy={cy} r={10} fill="#7a5228" />
    <circle cx={cx} cy={cy} r={5.5} fill="#9a6e42" />
  </>
);

/* ─────────────────────────────────────────
   Left page — M1 (2015) · M2 (2019)
   Path exits right edge at y=262
───────────────────────────────────────── */
export const JourneyLeft = ({ onPrev, is3D = false }) => {
  if (is3D) return (
    <div style={{ width: '100%', height: '100%', background: 'transparent', position: 'relative' }}>
      {onPrev && <div className="page-number" style={{ zIndex: 10, pointerEvents: 'auto' }} onClick={onPrev}>3</div>}
    </div>
  );
  return (
    <div className="paper-page" style={{ position: 'relative', padding: 0, overflow: 'hidden' }}>
      <svg
        width="100%" height="100%"
        viewBox="0 0 460 620"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', position: 'absolute', inset: 0 }}
      >
        {/* ── Dashed path M1 → M2 → exits right ── */}
        <path
          d="M 78,358 C 165,328 268,272 378,260 C 410,256 436,258 460,262"
          fill="none" stroke="#5a3c1c" strokeWidth="2.2"
          strokeDasharray="8,5" strokeLinecap="round"
        />

        {/* ── M1 — Journey Begins 2015 ── */}
        <Dot cx={78} cy={358} />
        <text x="78" y="387" textAnchor="middle" fontSize="10" fill="#3a2510"
          fontFamily="Georgia,serif" fontWeight="bold">2015</text>
        <text x="78" y="401" textAnchor="middle" fontSize="8.5" fill="#6a4a24"
          fontFamily="Georgia,serif">Journey Begins</text>

        {/* ── M2 — Class X 2019 ── */}
        <Dot cx={378} cy={260} />
        <text x="378" y="236" textAnchor="middle" fontSize="10" fill="#3a2510"
          fontFamily="Georgia,serif" fontWeight="bold">2019</text>
        <text x="378" y="222" textAnchor="middle" fontSize="8.5" fill="#6a4a24"
          fontFamily="Georgia,serif">Class X · 90%</text>
      </svg>
      {onPrev && <div className="page-number" onClick={onPrev}>3</div>}
    </div>
  );
};

/* ─────────────────────────────────────────
   Right page — M3 (2021) · M4 (2025) · M5 (2025)
   Path enters left edge at y=262
───────────────────────────────────────── */
export const JourneyRight = ({ onNext, is3D = false }) => {
  if (is3D) return (
    <div style={{ width: '100%', height: '100%', background: 'transparent', position: 'relative' }}>
      {onNext && <div className="page-number" style={{ zIndex: 10, pointerEvents: 'auto' }} onClick={onNext}>4</div>}
    </div>
  );
  return (
    <div className="paper-page" style={{ position: 'relative', padding: 0, overflow: 'hidden' }}>
      <svg
        width="100%" height="100%"
        viewBox="0 0 460 620"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', position: 'absolute', inset: 0 }}
      >
        {/* ── Dashed path: enters left → M3 → M4 → M5 ── */}
        <path
          d="M 0,262 C 48,268 86,285 120,310 C 168,346 208,402 275,412 C 328,420 372,328 408,268"
          fill="none" stroke="#5a3c1c" strokeWidth="2.2"
          strokeDasharray="8,5" strokeLinecap="round"
        />

        {/* ── M3 — Class XII 2021 ── */}
        <Dot cx={120} cy={310} />
        <text x="120" y="340" textAnchor="middle" fontSize="10" fill="#3a2510"
          fontFamily="Georgia,serif" fontWeight="bold">2021</text>
        <text x="120" y="354" textAnchor="middle" fontSize="8.5" fill="#6a4a24"
          fontFamily="Georgia,serif">Class XII · 83%</text>

        {/* ── M4 — B.Tech CSE (AIML) 2025 ── */}
        <Dot cx={275} cy={412} />
        <text x="275" y="442" textAnchor="middle" fontSize="10" fill="#3a2510"
          fontFamily="Georgia,serif" fontWeight="bold">2025</text>
        <text x="275" y="456" textAnchor="middle" fontSize="8.5" fill="#6a4a24"
          fontFamily="Georgia,serif">B.Tech CSE (AIML)</text>

        {/* ── M5 — NCC C Certificate 2025 ── */}
        <Dot cx={408} cy={268} />
        <text x="408" y="244" textAnchor="middle" fontSize="10" fill="#3a2510"
          fontFamily="Georgia,serif" fontWeight="bold">2025</text>
        <text x="408" y="230" textAnchor="middle" fontSize="8.5" fill="#6a4a24"
          fontFamily="Georgia,serif">NCC Certificate</text>
      </svg>
      {onNext && <div className="page-number" onClick={onNext}>4</div>}
    </div>
  );
};

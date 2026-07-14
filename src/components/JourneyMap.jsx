import journeyBg from '../assets/journey-bg.png';

export const THEME = {
  A: { pageBg: 'transparent', btnActive: '#1a4a7a', btnActiveTxt: 'white', dark: false, stroke: '#1a4a7a', strokeSecondary: '#8aaac8', textMain: '#103055', textMuted: '#5a7aaa', font: 'var(--font-serif)' },
  B: { pageBg: 'transparent', btnActive: '#c5a880', btnActiveTxt: '#04070f', dark: false, stroke: '#9a3412', strokeSecondary: '#312e81', textMain: '#1e1b4b', textMuted: '#475569', font: 'var(--font-serif)' },
  C: { pageBg: 'transparent', btnActive: '#4a6f44', btnActiveTxt: 'white', dark: false, stroke: '#2d4a25', strokeSecondary: '#c0392b', textMain: '#2e1f0e', textMuted: '#7a5520', font: 'var(--font-sans)' },
  D: { pageBg: 'transparent', btnActive: '#2e6bc7', btnActiveTxt: 'white', dark: false, stroke: '#1c2d5e', strokeSecondary: '#ffd54f', textMain: '#1c2d5e', textMuted: '#6c7a9c', font: 'var(--font-sans)' },
  E: { pageBg: 'transparent', btnActive: '#7a3d10', btnActiveTxt: 'white', dark: false, stroke: '#5c3815', strokeSecondary: '#c5a880', textMain: '#4a2808', textMuted: '#8c5f35', font: 'var(--font-serif)' },
};

/* One uncropped illustration shared by both pages. Each page shows exactly
   half of it via background-size/-position, so the two halves always line up
   pixel-for-pixel at the spine — no manual cropping, no seam mismatch. A
   gradient "fold shadow" at the spine-facing edge sells the two-page effect. */
const SHARED_BG_STYLE = {
  position: 'absolute',
  inset: 0,
  backgroundImage: `url(${journeyBg})`,
  backgroundSize: '200% 100%',
};

/* ══════════════════════════════════════
   LEFT PAGE  —  2019 · 2021 · 2025
══════════════════════════════════════ */
export const JourneyLeft = ({ onPrev, is3D = false }) => {
  if (is3D) return (
    <div style={{width:'100%',height:'100%',background:'transparent',position:'relative',pointerEvents:'none'}}>
      {onPrev && <div className="page-number" style={{zIndex:10,pointerEvents:'auto'}} onClick={onPrev}>3</div>}
    </div>
  );

  return (
    <div className="paper-page" style={{ position: 'relative', padding: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '18px', left: '18px', bottom: '18px', right: 0, overflow: 'hidden', borderRadius: '10px 0 0 10px' }}>
        <div style={{ ...SHARED_BG_STYLE, backgroundPosition: 'left center' }} />
        {/* fold shadow at the spine-facing (right) edge */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, transparent 92%, rgba(20,20,30,0.16) 100%)',
        }} />
      </div>

      <div className="running-header">
        <span className="running-header-text">Journey</span>
        <div className="running-header-line" />
      </div>

      {onPrev && <div className="page-number" onClick={onPrev}>3</div>}
    </div>
  );
};

/* ══════════════════════════════════════
   RIGHT PAGE  —  2025 · 2026 + Guided by Purpose + compass
══════════════════════════════════════ */
export const JourneyRight = ({ onNext, is3D = false }) => {
  if (is3D) return (
    <div style={{width:'100%',height:'100%',background:'transparent',position:'relative',pointerEvents:'none'}}>
      {onNext && <div className="page-number" style={{zIndex:10,pointerEvents:'auto'}} onClick={onNext}>4</div>}
    </div>
  );

  return (
    <div className="paper-page" style={{ position: 'relative', padding: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '18px', right: '18px', bottom: '18px', left: 0, overflow: 'hidden', borderRadius: '0 10px 10px 0' }}>
        <div style={{ ...SHARED_BG_STYLE, backgroundPosition: 'right center' }} />
        {/* fold shadow at the spine-facing (left) edge */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to left, transparent 92%, rgba(20,20,30,0.16) 100%)',
        }} />
      </div>

      <div className="running-header">
        <span className="running-header-text">Journey</span>
        <div className="running-header-line" />
      </div>

      {onNext && <div className="page-number" onClick={onNext}>4</div>}
    </div>
  );
};

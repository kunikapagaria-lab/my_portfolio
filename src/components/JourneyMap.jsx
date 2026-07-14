import journeyBgLeft from '../assets/journey-bg-left.jpg';
import journeyBgRight from '../assets/journey-bg-right.jpg';

export const THEME = {
  A: { pageBg: 'transparent', btnActive: '#1a4a7a', btnActiveTxt: 'white', dark: false, stroke: '#1a4a7a', strokeSecondary: '#8aaac8', textMain: '#103055', textMuted: '#5a7aaa', font: 'var(--font-serif)' },
  B: { pageBg: 'transparent', btnActive: '#c5a880', btnActiveTxt: '#04070f', dark: false, stroke: '#9a3412', strokeSecondary: '#312e81', textMain: '#1e1b4b', textMuted: '#475569', font: 'var(--font-serif)' },
  C: { pageBg: 'transparent', btnActive: '#4a6f44', btnActiveTxt: 'white', dark: false, stroke: '#2d4a25', strokeSecondary: '#c0392b', textMain: '#2e1f0e', textMuted: '#7a5520', font: 'var(--font-sans)' },
  D: { pageBg: 'transparent', btnActive: '#2e6bc7', btnActiveTxt: 'white', dark: false, stroke: '#1c2d5e', strokeSecondary: '#ffd54f', textMain: '#1c2d5e', textMuted: '#6c7a9c', font: 'var(--font-sans)' },
  E: { pageBg: 'transparent', btnActive: '#7a3d10', btnActiveTxt: 'white', dark: false, stroke: '#5c3815', strokeSecondary: '#c5a880', textMain: '#4a2808', textMuted: '#8c5f35', font: 'var(--font-serif)' },
};

/* ══════════════════════════════════════
   LEFT PAGE  —  2019 · 2021 · 2025
   Background is the generated illustration (src/assets/journey-bg-left.jpg);
   all milestone/title/quote content is baked into the artwork itself.
══════════════════════════════════════ */
export const JourneyLeft = ({ onPrev, is3D = false }) => {
  if (is3D) return (
    <div style={{width:'100%',height:'100%',background:'transparent',position:'relative',pointerEvents:'none'}}>
      {onPrev && <div className="page-number" style={{zIndex:10,pointerEvents:'auto'}} onClick={onPrev}>3</div>}
    </div>
  );

  return (
    <div className="paper-page" style={{
      position: 'relative',
      padding: 0,
      overflow: 'hidden',
      backgroundImage: `url(${journeyBgLeft})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      {onPrev && <div className="page-number" onClick={onPrev}>3</div>}
    </div>
  );
};

/* ══════════════════════════════════════
   RIGHT PAGE  —  2025 · 2026 + Guided by Purpose + compass
   Background is the generated illustration (src/assets/journey-bg-right.jpg).
══════════════════════════════════════ */
export const JourneyRight = ({ onNext, is3D = false }) => {
  if (is3D) return (
    <div style={{width:'100%',height:'100%',background:'transparent',position:'relative',pointerEvents:'none'}}>
      {onNext && <div className="page-number" style={{zIndex:10,pointerEvents:'auto'}} onClick={onNext}>4</div>}
    </div>
  );

  return (
    <div className="paper-page" style={{
      position: 'relative',
      padding: 0,
      overflow: 'hidden',
      backgroundImage: `url(${journeyBgRight})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      {onNext && <div className="page-number" onClick={onNext}>4</div>}
    </div>
  );
};

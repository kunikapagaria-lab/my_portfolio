import { useEffect, useRef } from 'react';
import { useJourney, JOURNEY_MILESTONES } from './JourneyContext';

const JourneyOverlay = () => {
  const { zoomed, doBack, doNext } = useJourney();
  const cardRef = useRef();

  // Slide-in animation on mount / milestone change
  useEffect(() => {
    if (!cardRef.current) return;
    cardRef.current.style.opacity = '0';
    cardRef.current.style.transform = 'translateX(-50%) translateY(16px)';
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!cardRef.current) return;
        cardRef.current.style.transition = 'opacity 0.32s ease, transform 0.32s ease';
        cardRef.current.style.opacity = '1';
        cardRef.current.style.transform = 'translateX(-50%) translateY(0)';
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [zoomed]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (zoomed === null) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') doNext();
      if (e.key === 'ArrowLeft'  || e.key === 'Escape')    doBack();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoomed]);

  if (zoomed === null) return null;

  const m    = JOURNEY_MILESTONES[zoomed];
  const isLast = zoomed === JOURNEY_MILESTONES.length - 1;

  return (
    <div
      ref={cardRef}
      style={{
        position: 'fixed',
        bottom: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        pointerEvents: 'none',
        // initial state (overridden by useEffect)
        opacity: 0,
      }}
    >
      {/* ── Info card ─────────────────────────────────────────────────── */}
      <div style={{
        background: 'rgba(252,248,236,0.97)',
        border: '2px solid #c9952e',
        borderRadius: '16px',
        padding: '18px 32px 16px',
        minWidth: '200px',
        textAlign: 'center',
        boxShadow: '0 16px 48px rgba(100,70,20,0.40), 0 0 0 4px rgba(201,149,46,0.12)',
        fontFamily: 'Georgia,serif',
        backdropFilter: 'blur(8px)',
        position: 'relative',
        pointerEvents: 'none',
      }}>
        {/* counter */}
        <div style={{
          position: 'absolute', top: '10px', right: '13px',
          fontSize: '8px', color: '#b88020', fontWeight: '700',
          fontFamily: 'system-ui,sans-serif', letterSpacing: '0.07em', opacity: 0.7,
        }}>
          {zoomed + 1} / {JOURNEY_MILESTONES.length}
        </div>

        {/* year */}
        <div style={{
          color: '#c9952e', fontSize: '26px', fontWeight: '800',
          letterSpacing: '0.04em', marginBottom: '6px',
          textShadow: '0 2px 8px rgba(201,149,46,0.25)',
        }}>
          {m.year}
        </div>

        {/* title */}
        <div style={{
          fontSize: '14px', fontWeight: '700', color: '#0e1f3a', marginBottom: '5px',
        }}>
          {m.title}
        </div>

        {/* subtitle */}
        <div style={{
          fontSize: '11px', color: '#4a5f80',
          fontFamily: 'system-ui,sans-serif', lineHeight: 1.55,
        }}>
          {m.sub}
        </div>

        {/* step dots */}
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '12px' }}>
          {JOURNEY_MILESTONES.map((_, i) => (
            <div key={i} style={{
              width: i === zoomed ? '18px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: i === zoomed ? '#c9952e' : 'rgba(100,80,40,0.25)',
              transition: 'width 0.3s ease, background 0.3s ease',
            }} />
          ))}
        </div>
      </div>

      {/* ── Buttons ───────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '10px', pointerEvents: 'auto' }}>
        <button
          onClick={doBack}
          style={{
            background: 'rgba(252,248,236,0.96)',
            border: '1.5px solid #9a7848',
            borderRadius: '10px',
            padding: '10px 20px',
            fontSize: '12px',
            fontFamily: 'Georgia,serif',
            cursor: 'pointer',
            color: '#5a3c1c',
            fontWeight: '600',
            boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
            backdropFilter: 'blur(6px)',
            transition: 'transform 0.12s, box-shadow 0.12s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          ← Map
        </button>

        <button
          onClick={doNext}
          style={{
            background: 'linear-gradient(135deg, #c9952e, #e8b848)',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 22px',
            fontSize: '12px',
            fontFamily: 'Georgia,serif',
            cursor: 'pointer',
            color: '#fff',
            fontWeight: '700',
            boxShadow: '0 4px 18px rgba(180,130,40,0.50)',
            backdropFilter: 'blur(6px)',
            transition: 'transform 0.12s, box-shadow 0.12s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(180,130,40,0.65)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(180,130,40,0.50)'; }}
        >
          {isLast ? '↺ Restart' : 'Next →'}
        </button>
      </div>

      {/* hint */}
      <div style={{
        fontSize: '9px', color: 'rgba(255,255,255,0.5)',
        fontFamily: 'system-ui,sans-serif', letterSpacing: '0.05em',
        textShadow: '0 1px 3px rgba(0,0,0,0.6)', pointerEvents: 'none',
      }}>
        {isLast ? 'Esc to map' : '→ key · Esc to map'}
      </div>
    </div>
  );
};

export default JourneyOverlay;

import { useState } from 'react';
import { useJourney, DEFAULT_CAM_PARAMS } from './JourneyContext';

const SLIDERS = [
  {
    key: 'camDy',
    label: 'Camera Y offset',
    desc: 'How far below(−) or above(+) the building',
    min: -4.0, max: 2.0, step: 0.05,
  },
  {
    key: 'camDz',
    label: 'Camera Z offset',
    desc: 'How far in front of the building',
    min: 0.5, max: 6.0, step: 0.05,
  },
  {
    key: 'lookDx',
    label: 'LookAt X offset',
    desc: 'Turn camera right(+) → building moves left',
    min: -2.0, max: 4.0, step: 0.05,
  },
  {
    key: 'lookDy',
    label: 'LookAt Y offset',
    desc: 'Aim camera up(+) or down(−)',
    min: -2.0, max: 3.0, step: 0.05,
  },
  {
    key: 'lookDz',
    label: 'LookAt Z offset',
    desc: 'Look toward(−) or away from(+) book spine',
    min: -2.0, max: 2.0, step: 0.05,
  },
  {
    key: 'fov',
    label: 'Field of View (FOV)',
    desc: 'Narrow(−) zooms in · Wide(+) zooms out',
    min: 10, max: 90, step: 1,
  },
  {
    key: 'roll',
    label: 'Roll (tilt fix)',
    desc: 'Rotate camera to straighten a slanted building',
    min: -45, max: 45, step: 0.5,
  },
];

const CameraDebugPanel = () => {
  const { zoomed, camParams, setCamParams, startPreview } = useJourney();
  const [collapsed, setCollapsed] = useState(true);

  if (zoomed === null) return null;

  const handleChange = (key, rawVal) => {
    startPreview();
    setCamParams(prev => ({ ...prev, [key]: parseFloat(rawVal) }));
  };

  const handleReset = () => {
    startPreview();
    setCamParams(DEFAULT_CAM_PARAMS);
  };

  const tabBtn = {
    position: 'fixed',
    right: collapsed ? '0' : '258px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 61,
    background: 'rgba(252,248,236,0.97)',
    border: '2px solid #c9952e',
    borderRight: collapsed ? '2px solid #c9952e' : 'none',
    borderRadius: '10px 0 0 10px',
    padding: '10px 7px',
    cursor: 'pointer',
    boxShadow: '-3px 0 12px rgba(100,70,20,0.18)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px',
    transition: 'right 0.25s ease',
  };

  return (
    <>
      {/* Arrow toggle tab */}
      <button onClick={() => setCollapsed(c => !c)} style={tabBtn} title="Toggle camera controls">
        <span style={{ fontSize: '13px', color: '#c9952e', lineHeight: 1 }}>
          {collapsed ? '◀' : '▶'}
        </span>
        <span style={{
          fontSize: '8px', fontWeight: '800', color: '#c9952e', letterSpacing: '0.08em',
          writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)',
        }}>
          CAM
        </span>
      </button>

      {/* Panel */}
      {!collapsed && (
        <div style={{
          position: 'fixed',
          right: '18px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 60,
          background: 'rgba(252,248,236,0.97)',
          border: '2px solid #c9952e',
          borderRadius: '14px',
          padding: '14px 18px 12px',
          width: '240px',
          maxHeight: '88vh',
          overflowY: 'auto',
          boxShadow: '0 8px 32px rgba(100,70,20,0.35)',
          backdropFilter: 'blur(10px)',
          fontFamily: 'system-ui, sans-serif',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: '#c9952e', letterSpacing: '0.1em' }}>
              CAMERA CONTROLS
            </span>
            <button
              onClick={handleReset}
              style={{
                fontSize: '9px', color: '#7a5828', background: 'rgba(201,149,46,0.12)',
                border: '1px solid #c9952e', borderRadius: '6px', padding: '2px 8px',
                cursor: 'pointer', fontFamily: 'system-ui, sans-serif',
              }}
            >
              Reset
            </button>
          </div>

          {SLIDERS.map(({ key, label, desc, min, max, step }) => (
            <div key={key} style={{ marginBottom: '11px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                <code style={{ fontSize: '11px', fontWeight: '700', color: '#1a3a6a' }}>{key}</code>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#c9952e', fontFamily: 'monospace' }}>
                  {camParams[key].toFixed(3)}
                </span>
              </div>
              <div style={{ fontSize: '9px', color: '#7a5828', marginBottom: '4px', lineHeight: 1.3 }}>{label}</div>
              <input
                type="range"
                min={min} max={max} step={step}
                value={camParams[key]}
                onChange={e => handleChange(key, e.target.value)}
                style={{ width: '100%', accentColor: '#c9952e', cursor: 'pointer', height: '4px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: '#b8a070', marginTop: '1px' }}>
                <span>{min}</span>
                <span style={{ color: '#9a7040', fontSize: '8px' }}>{desc}</span>
                <span>{max}</span>
              </div>
            </div>
          ))}

          <div style={{ fontSize: '8px', color: '#b8a070', textAlign: 'center', paddingTop: '8px', borderTop: '1px solid #e8d0a0', marginTop: '4px' }}>
            Drag any slider — camera follows live
          </div>
        </div>
      )}
    </>
  );
};

export default CameraDebugPanel;

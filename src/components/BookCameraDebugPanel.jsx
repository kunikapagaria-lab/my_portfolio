import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useJourney } from './JourneyContext';

// Default camera for all pages except the journey page
export const DEFAULT_BOOK_CAM = {
  distance:  20,
  azimuth:    0,
  elevation: -13,
  lookX:      0,
  lookY:      0,
  lookZ:      0,
  fov:       46,
  bookRotY:   0,
  bookRotX:   0,
};

// Default camera for the journey page (page 2)
export const DEFAULT_BOOK_CAM_JOURNEY = {
  distance:  17.5,
  azimuth:    0,
  elevation:  8,
  lookX:      0,
  lookY:      0,
  lookZ:      0,
  fov:       42,
  bookRotY:  -4,
  bookRotX:   0,
};

const SLIDERS = [
  // ── Camera ──────────────────────────────────────────────────────────────
  { key: 'distance',  group: 'CAMERA',   label: 'Distance',      desc: 'Closer(−) or farther(+)',                       min: 4,    max: 40,  step: 0.5  },
  { key: 'azimuth',   group: null,        label: 'Azimuth',       desc: 'Orbit left(−) or right(+) — full 360°',         min: -180, max: 180, step: 1    },
  { key: 'elevation', group: null,        label: 'Elevation',     desc: 'Tilt down(−) or up(+) — 0°=side, 90°=top',      min: -89,  max: 89,  step: 1    },
  { key: 'lookX',     group: null,        label: 'LookAt X',      desc: 'Shift aim left(−) or right(+)',                  min: -8,   max: 8,   step: 0.25 },
  { key: 'lookY',     group: null,        label: 'LookAt Y',      desc: 'Shift aim down(−) or up(+)',                     min: -8,   max: 8,   step: 0.25 },
  { key: 'lookZ',     group: null,        label: 'LookAt Z',      desc: 'Shift aim toward(−) or away(+)',                 min: -8,   max: 8,   step: 0.25 },
  { key: 'fov',       group: null,        label: 'Field of View', desc: 'Narrow(−) zooms in · Wide(+) zooms out',        min: 15,   max: 90,  step: 1    },
  // ── Book rotation ───────────────────────────────────────────────────────
  { key: 'bookRotY',  group: 'BOOK',     label: 'Spin (Y)',      desc: 'Spin book left(−) or right(+) — full 360°',     min: -180, max: 180, step: 1    },
  { key: 'bookRotX',  group: null,        label: 'Tilt (X)',      desc: 'Tilt book forward(−) or backward(+)',            min: -90,  max: 90,  step: 1    },
];

// Rendered inside the Canvas — applies camera params each frame,
// but yields to JourneyScene3D while it is animating the camera.
export function BookCameraController({ params }) {
  const { camera } = useThree();
  const { journeyCamActiveRef } = useJourney();
  const ref = useRef(params);
  useEffect(() => { ref.current = params; }, [params]);

  useFrame(() => {
    if (journeyCamActiveRef.current) return;
    const { distance, azimuth, elevation, lookX, lookY, lookZ, fov } = ref.current;
    const az = (azimuth  * Math.PI) / 180;
    const el = (elevation * Math.PI) / 180;
    // Spherical → Cartesian offset from look target
    const x = lookX + distance * Math.cos(el) * Math.sin(az);
    const y = lookY + distance * Math.sin(el);
    const z = lookZ + distance * Math.cos(el) * Math.cos(az);
    camera.position.set(x, y, z);
    camera.up.set(0, 1, 0);
    camera.lookAt(lookX, lookY, lookZ);
    if (Math.abs(camera.fov - fov) > 0.1) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}

// Rendered outside the Canvas — the HTML panel
// Collapsed by default; click the arrow tab to reveal controls.
// Hides itself when a journey milestone is zoomed (milestone panel takes over).
const BookCameraDebugPanel = ({ params, setParams, defaultParams }) => {
  const { zoomed } = useJourney();
  const [collapsed, setCollapsed] = useState(true);

  if (zoomed !== null) return null;

  const handleChange = (key, val) =>
    setParams(prev => ({ ...prev, [key]: parseFloat(val) }));

  const handleReset = () => setParams(defaultParams);

  const tabBtn = {
    position: 'fixed',
    right: collapsed ? '0' : '258px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 61,
    background: 'rgba(252,248,236,0.97)',
    border: '2px solid #c9952e',
    borderRight: collapsed ? '2px solid #c9952e' : 'none',
    borderRadius: collapsed ? '10px 0 0 10px' : '10px 0 0 10px',
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

      {/* Panel — slides in from right */}
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

          {SLIDERS.map(({ key, group, label, desc, min, max, step }) => (
            <div key={key}>
              {group && (
                <div style={{
                  fontSize: '9px', fontWeight: '800', color: '#c9952e', letterSpacing: '0.1em',
                  borderTop: '1px solid #e8d0a0', marginTop: '6px', paddingTop: '8px', marginBottom: '8px',
                }}>
                  {group}
                </div>
              )}
              <div style={{ marginBottom: '11px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                  <code style={{ fontSize: '11px', fontWeight: '700', color: '#1a3a6a' }}>{key}</code>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#c9952e', fontFamily: 'monospace' }}>
                    {Number.isInteger(step) ? Math.round(params[key]) : params[key].toFixed(2)}
                  </span>
                </div>
                <div style={{ fontSize: '9px', color: '#7a5828', marginBottom: '4px', lineHeight: 1.3 }}>{label}</div>
                <input
                  type="range"
                  min={min} max={max} step={step}
                  value={params[key]}
                  onChange={e => handleChange(key, e.target.value)}
                  style={{ width: '100%', accentColor: '#c9952e', cursor: 'pointer', height: '4px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: '#b8a070', marginTop: '1px' }}>
                  <span>{min}</span>
                  <span style={{ color: '#9a7040', fontSize: '8px' }}>{desc}</span>
                  <span>{max}</span>
                </div>
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

export default BookCameraDebugPanel;

import { useJourney } from './JourneyContext';
import { GRASS_PATCH_CONFIGS } from './JourneyScene3D';

const PatchEditorPanel = () => {
  const { patchEdit, setPatchEdit, patchXY, setPatchXY, activePatch, setActivePatch } = useJourney();

  const positions = patchXY ?? GRASS_PATCH_CONFIGS.map(c => [c.pos[0], c.pos[1]]);

  const handleToggle = () => {
    setPatchEdit(m => !m);
    setActivePatch(null);
  };

  const handleCopy = () => {
    const cfg = positions.map(([x, y], i) =>
      `  { pos: [${x.toFixed(2)}, ${y.toFixed(2)}, 0.026], sx: ${GRASS_PATCH_CONFIGS[i].sx}, sy: ${GRASS_PATCH_CONFIGS[i].sy}, rot: ${GRASS_PATCH_CONFIGS[i].rot}, color: '${GRASS_PATCH_CONFIGS[i].color}', seed: ${GRASS_PATCH_CONFIGS[i].seed} }`
    ).join(',\n');
    navigator.clipboard?.writeText(`[\n${cfg}\n]`);
  };

  const handleReset = () => {
    setPatchXY(GRASS_PATCH_CONFIGS.map(c => [c.pos[0], c.pos[1]]));
    setActivePatch(null);
  };

  return (
    <>
      {/* Toggle tab — left edge */}
      <button
        onClick={handleToggle}
        title="Toggle patch editor"
        style={{
          position: 'fixed',
          left: 0,
          bottom: '120px',
          zIndex: 200,
          background: 'rgba(252,248,236,0.97)',
          border: '2px solid #4a9428',
          borderLeft: 'none',
          borderRadius: '0 10px 10px 0',
          padding: '10px 7px',
          cursor: 'pointer',
          boxShadow: '3px 0 12px rgba(40,100,20,0.22)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        <span style={{ fontSize: '13px', color: '#4a9428', lineHeight: 1 }}>✦</span>
        <span style={{
          fontSize: '8px', fontWeight: '800', color: '#4a9428', letterSpacing: '0.08em',
          writingMode: 'vertical-rl', textOrientation: 'mixed',
        }}>
          PATCHES
        </span>
      </button>

      {/* Editor panel */}
      {patchEdit && (
        <div style={{
          position: 'fixed',
          left: '40px',
          bottom: '80px',
          zIndex: 200,
          background: 'rgba(252,248,236,0.98)',
          border: '2px solid #4a9428',
          borderRadius: '14px',
          padding: '14px 16px 12px',
          width: '240px',
          maxHeight: '62vh',
          overflowY: 'auto',
          boxShadow: '0 8px 32px rgba(40,100,20,0.30)',
          fontFamily: 'system-ui, sans-serif',
        }}>
          <div style={{ fontWeight: '800', color: '#4a9428', fontSize: '10px', letterSpacing: '0.1em', marginBottom: '6px' }}>
            PATCH EDITOR
          </div>
          <div style={{ fontSize: '9px', color: '#5a7830', marginBottom: '10px', lineHeight: 1.5 }}>
            Click a green patch on the page to select it (turns yellow), then drag to move it.
          </div>

          <div style={{ fontSize: '9px', color: '#3a5520', fontWeight: '700', marginBottom: '4px' }}>
            Positions (x, y):
          </div>
          <pre style={{
            fontSize: '9px', color: '#1a3a6a', margin: '0 0 10px',
            lineHeight: 1.7, background: 'rgba(220,240,210,0.4)',
            padding: '6px 8px', borderRadius: '6px', overflowX: 'auto',
          }}>
            {positions.map(([x, y], i) =>
              `[${i}] ${x >= 0 ? ' ' : ''}${x.toFixed(2)},  ${y >= 0 ? ' ' : ''}${y.toFixed(2)}${activePatch === i ? '  ◀' : ''}`
            ).join('\n')}
          </pre>

          <button onClick={handleCopy} style={btnStyle('#4a9428', 'rgba(74,148,40,0.12)')}>
            Copy config to clipboard
          </button>
          <button onClick={handleReset} style={{ ...btnStyle('#7a5828', 'rgba(201,149,46,0.12)'), marginTop: '4px' }}>
            Reset positions
          </button>
          <button
            onClick={() => { setPatchEdit(false); setActivePatch(null); }}
            style={{ ...btnStyle('#803030', 'rgba(180,50,50,0.08)'), borderColor: '#c05050', marginTop: '4px' }}
          >
            Close editor
          </button>
        </div>
      )}
    </>
  );
};

const btnStyle = (color, bg) => ({
  width: '100%', padding: '5px 0', fontSize: '10px', cursor: 'pointer',
  background: bg, border: `1px solid ${color}`,
  borderRadius: '6px', color, fontFamily: 'system-ui', display: 'block',
});

export default PatchEditorPanel;

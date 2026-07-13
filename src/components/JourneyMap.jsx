export const THEME = {
  A: { pageBg: 'transparent', btnActive: '#1a4a7a', btnActiveTxt: 'white', dark: false, stroke: '#1a4a7a', strokeSecondary: '#8aaac8', textMain: '#103055', textMuted: '#5a7aaa', font: 'var(--font-serif)' },
  B: { pageBg: 'transparent', btnActive: '#c5a880', btnActiveTxt: '#04070f', dark: false, stroke: '#9a3412', strokeSecondary: '#312e81', textMain: '#1e1b4b', textMuted: '#475569', font: 'var(--font-serif)' },
  C: { pageBg: 'transparent', btnActive: '#4a6f44', btnActiveTxt: 'white', dark: false, stroke: '#2d4a25', strokeSecondary: '#c0392b', textMain: '#2e1f0e', textMuted: '#7a5520', font: 'var(--font-sans)' },
  D: { pageBg: 'transparent', btnActive: '#2e6bc7', btnActiveTxt: 'white', dark: false, stroke: '#1c2d5e', strokeSecondary: '#ffd54f', textMain: '#1c2d5e', textMuted: '#6c7a9c', font: 'var(--font-sans)' },
  E: { pageBg: 'transparent', btnActive: '#7a3d10', btnActiveTxt: 'white', dark: false, stroke: '#5c3815', strokeSecondary: '#c5a880', textMain: '#4a2808', textMuted: '#8c5f35', font: 'var(--font-serif)' },
};

const SERIF = "'Playfair Display', Georgia, serif";
const SANS  = "'Outfit', system-ui, sans-serif";
const GOLD  = '#c5a880';
const NAVY  = '#103055';
const MUTED = '#7a8aaa';
const CREAM = '#faf6e8';
const PY    = 355; /* road Y position */

/* ══ Cherry blossom tree — branch paths + petal clusters ══ */
const BlossomTree = ({ x, y, s = 1, flip = false }) => (
  <g transform={`translate(${x},${y}) scale(${flip ? -s : s},${s})`}>
    {/* trunk */}
    <path d="M 0 32 C 0 18 1 6 0 -6 C -1 -18 2 -28 3 -42"
      stroke="#9B7B3A" strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.5}/>
    {/* left branch */}
    <path d="M 0 -8 C -8 -16 -18 -22 -25 -34"
      stroke="#9B7B3A" strokeWidth={2.5} fill="none" strokeLinecap="round" opacity={0.48}/>
    {/* right branch */}
    <path d="M 1 -20 C 7 -27 16 -32 21 -44"
      stroke="#9B7B3A" strokeWidth={2} fill="none" strokeLinecap="round" opacity={0.45}/>
    {/* upper branch */}
    <path d="M 2 -34 C -4 -40 -2 -50 -8 -57"
      stroke="#9B7B3A" strokeWidth={1.4} fill="none" strokeLinecap="round" opacity={0.4}/>
    {/* petal clouds */}
    {[
      [-25,-36,11,'#F4A7B9'],[-18,-46,9,'#FBC8D4'],[21,-46,10,'#F4A7B9'],
      [14,-54,8,'#FBC8D4'],[-9,-60,9,'#F4A7B9'],[0,-47,12,'#F4A7B9'],
      [7,-40,7,'#FBC8D4'],[-17,-37,6,'#F4A7B9'],[5,-28,7,'#FBC8D4'],
    ].map(([fx,fy,fr,cl],i)=>(
      <circle key={i} cx={fx} cy={fy} r={fr} fill={cl} opacity={0.38}/>
    ))}
    {/* small flower centres */}
    {[[-22,-43],[-9,-52],[18,-50],[3,-44],[-13,-39],[8,-58]].map(([fx,fy],i)=>(
      <circle key={i} cx={fx} cy={fy} r={1.4} fill="#ffeedd" opacity={0.7}/>
    ))}
  </g>
);

/* ══ Pine / evergreen tree ══ */
const Pine = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`} opacity={0.58}>
    <polygon points="0,-38 -16,0 16,0"  fill="#4a7a40"/>
    <polygon points="0,-26 -12,6 12,6"  fill="#3d6a35"/>
    <polygon points="0,-14 -9,11 9,11"  fill="#336030"/>
    <rect x={-4} y={11} width={8} height={12} fill="#8B6014" opacity={0.55}/>
  </g>
);

/* ══ Small bush ══ */
const Bush = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`} opacity={0.5}>
    <ellipse cx={0}   cy={0} rx={14} ry={10} fill="#5a8a40"/>
    <ellipse cx={-10} cy={2} rx={9}  ry={7}  fill="#4a7a35"/>
    <ellipse cx={10}  cy={2} rx={9}  ry={7}  fill="#4a7a35"/>
  </g>
);

/* ══ Falling petals scattered ══ */
const Petals = ({ pts }) => (
  <>
    {pts.map(([x,y,r,o,rot=0],i)=>(
      <g key={i} transform={`translate(${x},${y}) rotate(${rot})`} opacity={o}>
        <ellipse cx={0} cy={-r} rx={r*0.6} ry={r} fill="#F4A7B9"/>
      </g>
    ))}
  </>
);

/* ══ Small rock ══ */
const Rock = ({ x, y }) => (
  <ellipse cx={x} cy={y} rx={6} ry={3.5} fill="#c8b898" opacity={0.3}/>
);

/* ══ Grass tuft ══ */
const Grass = ({ x, y }) => (
  <g opacity={0.35}>
    <line x1={x-3} y1={y} x2={x-5} y2={y-8}  stroke="#5a8a30" strokeWidth={0.9}/>
    <line x1={x}   y1={y} x2={x-1} y2={y-10} stroke="#5a8a30" strokeWidth={0.9}/>
    <line x1={x+3} y1={y} x2={x+4} y2={y-8}  stroke="#5a8a30" strokeWidth={0.9}/>
  </g>
);

/* ══ Compass rose ══ */
const Compass = ({ cx, cy }) => {
  const r = 27;
  const diags = [45, 135, 225, 315].map(d => {
    const rad = d * Math.PI / 180;
    return { x2: cx + r * 0.65 * Math.cos(rad), y2: cy + r * 0.65 * Math.sin(rad) };
  });
  return (
    <g>
      <circle cx={cx} cy={cy} r={r+8} fill={CREAM} stroke={GOLD} strokeWidth={0.8} opacity={0.8}/>
      <circle cx={cx} cy={cy} r={r}   fill="none"  stroke={GOLD} strokeWidth={0.5} opacity={0.35}/>
      <circle cx={cx} cy={cy} r={r*0.55} fill="none" stroke={GOLD} strokeWidth={0.4} opacity={0.25}/>
      {/* cardinal arrows */}
      <polygon points={`${cx},${cy-r} ${cx-5.5},${cy-r*0.45} ${cx},${cy-r*0.3} ${cx+5.5},${cy-r*0.45}`} fill={GOLD} opacity={0.85}/>
      {[90,180,270].map((deg,i)=>{
        const a=deg*Math.PI/180;
        const px=cx+r*Math.cos(a), py=cy+r*Math.sin(a);
        const c1x=cx+(r*0.45)*Math.cos(a+Math.PI/10), c1y=cy+(r*0.45)*Math.sin(a+Math.PI/10);
        const c2x=cx+(r*0.3)*Math.cos(a), c2y=cy+(r*0.3)*Math.sin(a);
        const c3x=cx+(r*0.45)*Math.cos(a-Math.PI/10), c3y=cy+(r*0.45)*Math.sin(a-Math.PI/10);
        return <polygon key={i} points={`${px},${py} ${c1x},${c1y} ${c2x},${c2y} ${c3x},${c3y}`} fill={MUTED} opacity={0.45}/>;
      })}
      {/* diagonal marks */}
      {diags.map(({x2,y2},i)=>(
        <line key={i} x1={cx} y1={cy} x2={x2} y2={y2} stroke={GOLD} strokeWidth={0.6} opacity={0.28}/>
      ))}
      <circle cx={cx} cy={cy} r={5}   fill={CREAM} stroke={GOLD} strokeWidth={1.1}/>
      <circle cx={cx} cy={cy} r={2.2} fill={GOLD}/>
      <text x={cx}       y={cy-r-9}  textAnchor="middle" style={{fontFamily:SANS,fontSize:8,fontWeight:700,fill:NAVY}}>N</text>
      <text x={cx}       y={cy+r+14} textAnchor="middle" style={{fontFamily:SANS,fontSize:7,fill:MUTED}}>S</text>
      <text x={cx+r+11}  y={cy+3}    textAnchor="middle" style={{fontFamily:SANS,fontSize:7,fill:MUTED}}>E</text>
      <text x={cx-r-11}  y={cy+3}    textAnchor="middle" style={{fontFamily:SANS,fontSize:7,fill:MUTED}}>W</text>
    </g>
  );
};

/* ══ Single milestone (year banner → connector → dot → labels) ══ */
const Stop = ({ cx, year, title, sub1, sub2 }) => (
  <g>
    {/* year banner */}
    <rect x={cx-25} y={PY-64} width={50} height={20} rx={3.5}
      fill={CREAM} stroke={GOLD} strokeWidth={1.1} opacity={0.95}/>
    {/* small diamond corners on banner */}
    <rect x={cx-26.5} y={PY-57} width={4} height={4} rx={1} transform={`rotate(45,${cx-24.5},${PY-55})`}
      fill={GOLD} opacity={0.0}/>
    <text x={cx} y={PY-49} textAnchor="middle"
      style={{fontFamily:SANS, fontSize:9.5, fontWeight:700, fill:NAVY}}>{year}</text>
    {/* dashed connector */}
    <line x1={cx} y1={PY-44} x2={cx} y2={PY-13}
      stroke={GOLD} strokeWidth={0.9} strokeDasharray="3 2.5" opacity={0.55}/>
    {/* checkpoint ring */}
    <circle cx={cx} cy={PY} r={13}  fill={GOLD} opacity={0.1}/>
    <circle cx={cx} cy={PY} r={8.5} fill={CREAM} stroke={GOLD} strokeWidth={1.6}/>
    <circle cx={cx} cy={PY} r={3.5} fill={GOLD}/>
    {/* labels below */}
    <text x={cx} y={PY+22} textAnchor="middle"
      style={{fontFamily:SERIF, fontSize:12, fontWeight:700, fill:NAVY}}>{title}</text>
    {sub1 && <text x={cx} y={PY+37} textAnchor="middle"
      style={{fontFamily:SANS, fontSize:8.5, fill:MUTED}}>{sub1}</text>}
    {sub2 && <text x={cx} y={PY+50} textAnchor="middle"
      style={{fontFamily:SANS, fontSize:8.5, fill:MUTED}}>{sub2}</text>}
  </g>
);

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
    <div className="paper-page" style={{position:'relative',padding:0,overflow:'hidden'}}>
      <svg viewBox="0 0 380 540" preserveAspectRatio="xMidYMid meet"
        style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>

        {/* ── Sky gradient strip ── */}
        <defs>
          <linearGradient id="skyL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#f5eedd" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#faf6e8" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="gndL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#e8dfc8" stopOpacity="0"/>
            <stop offset="100%" stopColor="#ddd0b0" stopOpacity="0.18"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0"   width="380" height="220" fill="url(#skyL)"/>
        <rect x="0" y="260" width="380" height="100" fill="url(#gndL)"/>

        {/* ── Blossom trees (scenery) ── */}
        <BlossomTree x={28}  y={215} s={0.9}/>
        <BlossomTree x={168} y={205} s={0.75} flip/>
        <BlossomTree x={358} y={210} s={0.82} flip/>

        {/* ── Pine / evergreen accents ── */}
        <Pine x={110} y={258} s={0.8}/>
        <Pine x={260} y={254} s={0.72}/>
        <Pine x={340} y={256} s={0.65}/>

        {/* ── Small bushes at ground ── */}
        <Bush x={60}  y={278} s={0.8}/>
        <Bush x={200} y={276} s={0.7}/>
        <Bush x={310} y={279} s={0.75}/>

        {/* ── Ground line ── */}
        <line x1="0" y1="272" x2="380" y2="272" stroke="#c0aa80" strokeWidth="0.7" opacity="0.3"/>
        {[32,78,148,218,278,340].map((x,i)=><Grass key={i} x={x} y={272}/>)}
        {[50,115,185,252,322].map((x,i)=><Rock key={i} x={x} y={280}/>)}

        {/* ── Falling petals ── */}
        <Petals pts={[
          [70,130,4,0.38,15],[125,108,3,0.34,-20],[172,145,4,0.40,10],
          [248,122,3,0.35,30],[302,105,3.5,0.32,-15],[348,140,3,0.37,20],
          [85,175,2.5,0.30,-10],[162,192,3,0.34,25],[222,165,2.5,0.32,0],
          [292,185,3,0.30,-25],[55,220,2,0.28,15],[328,208,2.5,0.30,-10],
        ]}/>

        {/* ── Fallen petal dots on ground ── */}
        {[[42,284,2.5],[98,288,2],[165,285,2.5],[235,287,2],[305,284,2.5]].map(([x,y,r],i)=>(
          <ellipse key={i} cx={x} cy={y} rx={r} ry={r*0.55} fill="#F4A7B9" opacity={0.28} transform={`rotate(-15,${x},${y})`}/>
        ))}

        {/* ── Title ── */}
        <text x="118" y="70"
          style={{fontFamily:SERIF,fontSize:28,fontWeight:700,fontStyle:'italic',fill:NAVY,opacity:0.9}}>
          My Journey
        </text>
        <text x="190" y="90" textAnchor="middle"
          style={{fontFamily:SANS,fontSize:8,letterSpacing:3.5,fill:MUTED,opacity:0.8}}>
          DREAM · LEARN · GROW · ACHIEVE
        </text>
        {/* ornament */}
        <line x1="95"  y1="98" x2="178" y2="98" stroke={GOLD} strokeWidth="0.7" opacity="0.45"/>
        <text x="190" y="102" textAnchor="middle" style={{fontSize:7,fill:GOLD,opacity:0.55}}>✦</text>
        <line x1="202" y1="98" x2="285" y2="98" stroke={GOLD} strokeWidth="0.7" opacity="0.45"/>

        {/* ── Road ── */}
        {/* subtle road bed */}
        <line x1="0" y1={PY} x2="380" y2={PY} stroke="#e0d0b0" strokeWidth="6" opacity="0.3"/>
        {/* dashed centre line */}
        <line x1="0" y1={PY} x2="380" y2={PY}
          stroke={GOLD} strokeWidth="1.8" strokeDasharray="9 5" opacity="0.65"/>

        {/* ── Milestones ── */}
        <Stop cx={68}  year="2019" title="Class X"    sub1="Newtown School"  sub2="90%"/>
        <Stop cx={192} year="2021" title="Class XII"  sub1="Newtown School"  sub2="83%"/>
        <Stop cx={320} year="2025" title="B.Tech CSE (AIML)" sub1="Univ. of Engineering &amp; Mgmt." sub2="Kolkata · Graduated"/>

        {/* page num handled by HTML div */}
      </svg>
      {onPrev && <div className="page-number" onClick={onPrev}>3</div>}
    </div>
  );
};

/* ══════════════════════════════════════
   RIGHT PAGE  —  2025 · 2026 + compass + quote
══════════════════════════════════════ */
export const JourneyRight = ({ onNext, is3D = false }) => {
  if (is3D) return (
    <div style={{width:'100%',height:'100%',background:'transparent',position:'relative',pointerEvents:'none'}}>
      {onNext && <div className="page-number" style={{zIndex:10,pointerEvents:'auto'}} onClick={onNext}>4</div>}
    </div>
  );

  return (
    <div className="paper-page" style={{position:'relative',padding:0,overflow:'hidden'}}>
      <svg viewBox="0 0 380 540" preserveAspectRatio="xMidYMid meet"
        style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>

        <defs>
          <linearGradient id="skyR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#f5eedd" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#faf6e8" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="gndR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#e8dfc8" stopOpacity="0"/>
            <stop offset="100%" stopColor="#ddd0b0" stopOpacity="0.18"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0"   width="380" height="220" fill="url(#skyR)"/>
        <rect x="0" y="260" width="380" height="100" fill="url(#gndR)"/>

        {/* ── Blossom trees ── */}
        <BlossomTree x={22}  y={210} s={0.8}/>
        <BlossomTree x={185} y={208} s={0.7} flip/>
        <BlossomTree x={358} y={215} s={0.85} flip/>

        {/* ── Pines & bushes ── */}
        <Pine x={75}  y={256} s={0.7}/>
        <Pine x={148} y={260} s={0.78}/>
        <Pine x={295} y={254} s={0.68}/>
        <Bush x={50}  y={276} s={0.72}/>
        <Bush x={220} y={278} s={0.78}/>
        <Bush x={340} y={275} s={0.7}/>

        {/* ── Ground ── */}
        <line x1="0" y1="272" x2="380" y2="272" stroke="#c0aa80" strokeWidth="0.7" opacity="0.3"/>
        {[28,82,152,222,285,348].map((x,i)=><Grass key={i} x={x} y={272}/>)}
        {[48,118,188,258,330].map((x,i)=><Rock key={i} x={x} y={280}/>)}

        {/* ── Petals ── */}
        <Petals pts={[
          [48,135,3.5,0.36,-15],[105,112,3,0.33,20],[158,150,4,0.38,-10],
          [225,125,3,0.34,25],[278,105,3,0.31,-20],[342,145,3.5,0.37,15],
          [62,182,2.5,0.30,10],[168,198,3,0.33,-25],[295,192,2.5,0.30,30],
          [345,212,2.5,0.29,-10],
        ]}/>
        {[[40,285,2],[95,287,2.5],[168,284,2],[238,286,2.5],[308,283,2]].map(([x,y,r],i)=>(
          <ellipse key={i} cx={x} cy={y} rx={r} ry={r*0.55} fill="#F4A7B9" opacity={0.28} transform={`rotate(20,${x},${y})`}/>
        ))}

        {/* ── Road (continues from left page) ── */}
        <line x1="0" y1={PY} x2="380" y2={PY} stroke="#e0d0b0" strokeWidth="6" opacity="0.3"/>
        <line x1="0" y1={PY} x2="380" y2={PY}
          stroke={GOLD} strokeWidth="1.8" strokeDasharray="9 5" opacity="0.65"/>

        {/* ── Milestones ── */}
        <Stop cx={100} year="2025" title="NCC Naval"   sub1="National Cadet Corps"    sub2="C Certificate"/>
        <Stop cx={268} year="2026" title="Freelancing" sub1="AI-Assisted Development" sub2="Independent Projects"/>

        {/* ── Quote box ── */}
        <rect x={36} y={424} width={220} height={72} rx={5}
          fill={CREAM} stroke={GOLD} strokeWidth={0.9} opacity={0.9}/>
        {/* corner flourishes */}
        <text x={43}  y={436} style={{fontSize:8,fill:GOLD,opacity:0.6}}>✦</text>
        <text x={246} y={436} style={{fontSize:8,fill:GOLD,opacity:0.6}}>✦</text>
        <text x={43}  y={490} style={{fontSize:8,fill:GOLD,opacity:0.6}}>✦</text>
        <text x={246} y={490} style={{fontSize:8,fill:GOLD,opacity:0.6}}>✦</text>
        <text x={146} y={452} textAnchor="middle"
          style={{fontFamily:SERIF,fontSize:11,fontStyle:'italic',fill:NAVY,opacity:0.85}}>
          "The journey is
        </text>
        <text x={146} y={469} textAnchor="middle"
          style={{fontFamily:SERIF,fontSize:11,fontStyle:'italic',fill:NAVY,opacity:0.85}}>
          the destination."
        </text>
        <text x={146} y={486} textAnchor="middle"
          style={{fontFamily:SANS,fontSize:7.5,letterSpacing:1.5,fill:MUTED,opacity:0.6}}>
          — Ralph Waldo Emerson
        </text>

        {/* ── Compass rose ── */}
        <Compass cx={328} cy={462}/>

      </svg>
      {onNext && <div className="page-number" onClick={onNext}>4</div>}
    </div>
  );
};

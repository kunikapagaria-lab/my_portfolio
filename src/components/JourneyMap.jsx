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

/* ══ Cherry blossom tree — branch paths + petal clusters ══ */
const BlossomTree = ({ x, y, s = 1, flip = false }) => (
  <g transform={`translate(${x},${y}) scale(${flip ? -s : s},${s})`}>
    <path d="M 0 32 C 0 18 1 6 0 -6 C -1 -18 2 -28 3 -42"
      stroke="#9B7B3A" strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.5}/>
    <path d="M 0 -8 C -8 -16 -18 -22 -25 -34"
      stroke="#9B7B3A" strokeWidth={2.5} fill="none" strokeLinecap="round" opacity={0.48}/>
    <path d="M 1 -20 C 7 -27 16 -32 21 -44"
      stroke="#9B7B3A" strokeWidth={2} fill="none" strokeLinecap="round" opacity={0.45}/>
    <path d="M 2 -34 C -4 -40 -2 -50 -8 -57"
      stroke="#9B7B3A" strokeWidth={1.4} fill="none" strokeLinecap="round" opacity={0.4}/>
    {[
      [-25,-36,11,'#F4A7B9'],[-18,-46,9,'#FBC8D4'],[21,-46,10,'#F4A7B9'],
      [14,-54,8,'#FBC8D4'],[-9,-60,9,'#F4A7B9'],[0,-47,12,'#F4A7B9'],
      [7,-40,7,'#FBC8D4'],[-17,-37,6,'#F4A7B9'],[5,-28,7,'#FBC8D4'],
    ].map(([fx,fy,fr,cl],i)=>(
      <circle key={i} cx={fx} cy={fy} r={fr} fill={cl} opacity={0.38}/>
    ))}
    {[[-22,-43],[-9,-52],[18,-50],[3,-44],[-13,-39],[8,-58]].map(([fx,fy],i)=>(
      <circle key={i} cx={fx} cy={fy} r={1.4} fill="#ffeedd" opacity={0.7}/>
    ))}
  </g>
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

/* ══ Distant mountains, sun glow, drifting clouds and birds ══ */
const Landscape = ({ uid }) => (
  <>
    <defs>
      <radialGradient id={`sun-${uid}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="#fffaf0" stopOpacity="1"/>
        <stop offset="30%"  stopColor="#fff3d6" stopOpacity="0.85"/>
        <stop offset="65%"  stopColor="#ffe9b8" stopOpacity="0.32"/>
        <stop offset="100%" stopColor="#ffe9b8" stopOpacity="0"/>
      </radialGradient>
      <linearGradient id={`mtnBack-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#e2e9f2"/>
        <stop offset="100%" stopColor="#c7d3e2"/>
      </linearGradient>
      <linearGradient id={`mtnFar-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#cad7e8"/>
        <stop offset="100%" stopColor="#a9bdd6"/>
      </linearGradient>
      <linearGradient id={`mtnNear-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#a5bad4"/>
        <stop offset="100%" stopColor="#8098b8"/>
      </linearGradient>
      <filter id={`cloudBlur-${uid}`}>
        <feGaussianBlur stdDeviation="1.4"/>
      </filter>
      <filter id={`grain-${uid}`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="noise"/>
        <feColorMatrix in="noise" type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0"/>
      </filter>
    </defs>

    {/* soft light rays behind the sun */}
    <g opacity="0.18" stroke="#ffdf9e" strokeWidth="2">
      {[-26,-13,0,13,26].map((deg,i) => {
        const rad = (deg-90)*Math.PI/180;
        return <line key={i}
          x1={150+40*Math.cos(rad)} y1={120+40*Math.sin(rad)}
          x2={150+120*Math.cos(rad)} y2={120+120*Math.sin(rad)}
        />;
      })}
    </g>
    <circle cx="150" cy="120" r="95" fill={`url(#sun-${uid})`}/>

    {/* back mountain ridge — faintest, furthest away */}
    <polygon points="0,205 70,158 150,192 230,138 320,188 380,168 380,240 0,240"
      fill={`url(#mtnBack-${uid})`} opacity="0.4"/>
    {/* far mountain ridge */}
    <polygon points="0,225 55,145 125,205 205,110 300,200 380,150 380,240 0,240"
      fill={`url(#mtnFar-${uid})`} opacity="0.55"/>
    {/* near mountain ridge */}
    <polygon points="0,242 85,182 165,232 255,170 335,228 380,205 380,250 0,250"
      fill={`url(#mtnNear-${uid})`} opacity="0.65"/>

    {/* clouds — layered + blurred for a softer, painterly edge */}
    <g fill="#fff" filter={`url(#cloudBlur-${uid})`}>
      <ellipse cx="66"  cy="58" rx="32" ry="11" opacity="0.6"/>
      <ellipse cx="92"  cy="53" rx="22" ry="9"  opacity="0.55"/>
      <ellipse cx="42"  cy="62" rx="18" ry="8"  opacity="0.5"/>
      <ellipse cx="305" cy="42" rx="28" ry="10" opacity="0.55"/>
      <ellipse cx="330" cy="47" rx="18" ry="8"  opacity="0.5"/>
    </g>

    {/* birds — kept low in the clear sky band, well below the title/tagline */}
    <path d="M 55 128 Q 61 122 67 128 Q 73 122 79 128" stroke="#5a6b85" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.5"/>
    <path d="M 300 133 Q 305 128 310 133 Q 315 128 320 133" stroke="#5a6b85" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.42"/>

    {/* subtle paper-grain texture over the whole scene */}
    <rect x="0" y="0" width="380" height="540" filter={`url(#grain-${uid})`}/>
  </>
);

/* ══ Milestone icon glyphs (drawn centred on 0,0, ~18px) ══ */
const Glyph = {
  book: (
    <>
      <path d="M -9 -6 Q -4.5 -8.5 0 -6 L 0 7 Q -4.5 4.5 -9 7 Z" />
      <path d="M 9 -6 Q 4.5 -8.5 0 -6 L 0 7 Q 4.5 4.5 9 7 Z" />
    </>
  ),
  cap: (
    <>
      <path d="M -10 -2 L 0 -7 L 10 -2 L 0 3 Z" />
      <path d="M -5 0.5 L -5 5 Q 0 8 5 5 L 5 0.5" />
      <line x1="8" y1="-1" x2="8" y2="6" />
    </>
  ),
  gear: (
    <>
      <circle r="4.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line key={i}
            x1={6 * Math.cos(rad)} y1={6 * Math.sin(rad)}
            x2={9 * Math.cos(rad)} y2={9 * Math.sin(rad)}
          />
        );
      })}
    </>
  ),
  shield: (
    <>
      <path d="M 0 -9 L 7 -6 L 7 1 Q 7 7 0 10 Q -7 7 -7 1 L -7 -6 Z" />
      <path d="M 0 -3.5 L 1 -0.8 L 3.8 -0.8 L 1.5 0.9 L 2.3 3.6 L 0 2 L -2.3 3.6 L -1.5 0.9 L -3.8 -0.8 L -1 -0.8 Z" fill="#fff" stroke="none" />
    </>
  ),
  briefcase: (
    <>
      <rect x="-9" y="-3" width="18" height="12" rx="1.5" />
      <path d="M -4 -3 L -4 -6.5 Q -4 -7.5 -3 -7.5 L 3 -7.5 Q 4 -7.5 4 -6.5 L 4 -3" />
      <line x1="-9" y1="2" x2="9" y2="2" />
    </>
  ),
};

/* ══ Small line-icon glyphs used inside the "Guided by Purpose" card ══ */
const PurposeGlyph = {
  star: <path d="M 0 -6 L 1.8 -1.8 L 6 -1.4 L 2.8 1.6 L 3.8 5.8 L 0 3.4 L -3.8 5.8 L -2.8 1.6 L -6 -1.4 L -1.8 -1.8 Z" />,
  book: (
    <>
      <path d="M -6 -4 Q -3 -5.8 0 -4 L 0 5 Q -3 3.2 -6 5 Z" />
      <path d="M 6 -4 Q 3 -5.8 0 -4 L 0 5 Q 3 3.2 6 5 Z" />
    </>
  ),
  sprout: (
    <>
      <path d="M 0 6 L 0 -2" />
      <path d="M 0 -2 Q -6 -2 -6 -8 Q 0 -8 0 -2" />
      <path d="M 0 -2 Q 6 -2 6 -8 Q 0 -8 0 -2" />
    </>
  ),
  trophy: (
    <>
      <path d="M -5 -6 L 5 -6 L 4 0 Q 4 3 0 3 Q -4 3 -4 0 Z" />
      <path d="M -5 -6 Q -8 -6 -8 -3.5 Q -8 -0.5 -5 -1.3" />
      <path d="M 5 -6 Q 8 -6 8 -3.5 Q 8 -0.5 5 -1.3" />
      <path d="M -2 3 L -2 6 L 2 6 L 2 3" />
    </>
  ),
};

/* ══ Decorative leaf sprig beside the quote box ══ */
const LeafSprig = ({ x, y }) => (
  <g transform={`translate(${x},${y})`} opacity="0.65">
    <path d="M 0 34 Q -2 12 0 -8" stroke="#7a9a5a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    <path d="M 0 22 Q -15 16 -19 3 Q -6 3 0 22 Z" fill="#8ba86a" opacity="0.75" />
    <path d="M 0 9 Q 15 3 19 -8 Q 6 -6 0 9 Z" fill="#7a9a5a" opacity="0.75" />
    <path d="M 0 -1 Q -10 -7 -12 -17 Q -2 -15 0 -1 Z" fill="#8ba86a" opacity="0.7" />
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
      <polygon points={`${cx},${cy-r} ${cx-5.5},${cy-r*0.45} ${cx},${cy-r*0.3} ${cx+5.5},${cy-r*0.45}`} fill={GOLD} opacity={0.85}/>
      {[90,180,270].map((deg,i)=>{
        const a=deg*Math.PI/180;
        const px=cx+r*Math.cos(a), py=cy+r*Math.sin(a);
        const c1x=cx+(r*0.45)*Math.cos(a+Math.PI/10), c1y=cy+(r*0.45)*Math.sin(a+Math.PI/10);
        const c2x=cx+(r*0.3)*Math.cos(a), c2y=cy+(r*0.3)*Math.sin(a);
        const c3x=cx+(r*0.45)*Math.cos(a-Math.PI/10), c3y=cy+(r*0.45)*Math.sin(a-Math.PI/10);
        return <polygon key={i} points={`${px},${py} ${c1x},${c1y} ${c2x},${c2y} ${c3x},${c3y}`} fill={MUTED} opacity={0.45}/>;
      })}
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

/* ══ Single milestone: icon badge → stem → dot on path → labels below ══ */
const Stop = ({ cx, cy, year, title, sub1, sub2, color, glyph, badgeDy = 46 }) => (
  <g>
    <line x1={cx} y1={cy - badgeDy + 17} x2={cx} y2={cy - 7}
      stroke={color} strokeWidth="1.2" strokeDasharray="2.5 2.5" opacity="0.55"/>
    <g transform={`translate(${cx},${cy - badgeDy})`}>
      <circle r="17" fill={color} stroke={CREAM} strokeWidth="2.5"/>
      <g stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {glyph}
      </g>
    </g>
    <circle cx={cx} cy={cy} r="12" fill={color} opacity="0.12"/>
    <circle cx={cx} cy={cy} r="5.5" fill={CREAM} stroke={color} strokeWidth="2"/>
    <circle cx={cx} cy={cy} r="2" fill={color}/>
    <text x={cx} y={cy+23} textAnchor="middle" style={{fontFamily:SANS, fontSize:11.5, fontWeight:700, fill:color}}>{year}</text>
    <text x={cx} y={cy+41} textAnchor="middle" style={{fontFamily:SERIF, fontSize:13, fontWeight:700, fill:NAVY}}>{title}</text>
    {sub1 && <text x={cx} y={cy+56} textAnchor="middle" style={{fontFamily:SANS, fontSize:8.5, fill:MUTED}}>{sub1}</text>}
    {sub2 && <text x={cx} y={cy+69} textAnchor="middle" style={{fontFamily:SANS, fontSize:8.5, fill:MUTED}}>{sub2}</text>}
  </g>
);

/* ══ "Guided by Purpose" reinforcement card ══ */
const PURPOSE_ITEMS = [
  { label: 'Dream',   sub: 'Have a vision',      glyph: PurposeGlyph.star },
  { label: 'Learn',   sub: 'Never stop',         glyph: PurposeGlyph.book },
  { label: 'Grow',    sub: 'Challenge yourself', glyph: PurposeGlyph.sprout },
  { label: 'Achieve', sub: 'Make it meaningful', glyph: PurposeGlyph.trophy },
];

const GuidedByPurpose = ({ x, y, width = 230 }) => {
  const colWidth = width / PURPOSE_ITEMS.length;
  return (
    <g>
      <rect x={x} y={y} width={width} height={98} rx={6} fill={CREAM} stroke={GOLD} strokeWidth={0.9} opacity={0.92}/>
      <text x={x+9}       y={y+15} style={{fontSize:8,fill:GOLD,opacity:0.6}}>✦</text>
      <text x={x+width-14} y={y+15} style={{fontSize:8,fill:GOLD,opacity:0.6}}>✦</text>
      <text x={x+9}       y={y+92} style={{fontSize:8,fill:GOLD,opacity:0.6}}>✦</text>
      <text x={x+width-14} y={y+92} style={{fontSize:8,fill:GOLD,opacity:0.6}}>✦</text>

      <g stroke={GOLD} strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path transform={`translate(${x+width/2-9},${y+16})`} d="M 0 6 L 0 -2 M 0 -2 Q -6 -2 -6 -8 Q 0 -8 0 -2 M 0 -2 Q 6 -2 6 -8 Q 0 -8 0 -2" />
      </g>
      <text x={x+width/2+4} y={y+21} textAnchor="middle"
        style={{fontFamily:SERIF, fontSize:12, fontWeight:700, fontStyle:'italic', fill:NAVY, opacity:0.9}}>
        Guided by Purpose
      </text>

      {PURPOSE_ITEMS.map((item, i) => {
        const cx = x + colWidth * i + colWidth / 2;
        const cy = y + 55;
        return (
          <g key={item.label}>
            <circle cx={cx} cy={cy} r="14" fill="#fff" stroke={GOLD} strokeWidth="1.1" opacity="0.85"/>
            <g transform={`translate(${cx},${cy})`} stroke={GOLD} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              {item.glyph}
            </g>
            <text x={cx} y={cy+25} textAnchor="middle" style={{fontFamily:SERIF, fontSize:9.5, fontWeight:700, fill:NAVY}}>{item.label}</text>
            <text x={cx} y={cy+36} textAnchor="middle" style={{fontFamily:SANS, fontSize:6.3, fill:MUTED}}>{item.sub}</text>
          </g>
        );
      })}
    </g>
  );
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
    <div className="paper-page" style={{position:'relative',padding:0,overflow:'hidden'}}>
      <svg viewBox="0 0 380 540" preserveAspectRatio="xMidYMid meet"
        style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>

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

        <Landscape uid="L"/>

        <BlossomTree x={28}  y={215} s={0.9}/>
        <BlossomTree x={168} y={205} s={0.75} flip/>
        <BlossomTree x={358} y={210} s={0.82} flip/>

        <line x1="0" y1="272" x2="380" y2="272" stroke="#c0aa80" strokeWidth="0.7" opacity="0.3"/>
        {[32,78,148,218,278,340].map((x,i)=><Grass key={i} x={x} y={272}/>)}
        {[50,115,185,252,322].map((x,i)=><Rock key={i} x={x} y={280}/>)}

        {/* ── Title ── */}
        <text x="118" y="70"
          style={{fontFamily:SERIF,fontSize:32,fontWeight:800,fill:NAVY,opacity:0.92}}>
          My Journey
        </text>
        <text x="190" y="90" textAnchor="middle"
          style={{fontFamily:SANS,fontSize:8,letterSpacing:3.5,fill:MUTED,opacity:0.8}}>
          DREAM · LEARN · GROW · ACHIEVE
        </text>
        <line x1="95"  y1="98" x2="178" y2="98" stroke={GOLD} strokeWidth="0.7" opacity="0.45"/>
        <text x="190" y="102" textAnchor="middle" style={{fontSize:7,fill:GOLD,opacity:0.55}}>✦</text>
        <line x1="202" y1="98" x2="285" y2="98" stroke={GOLD} strokeWidth="0.7" opacity="0.45"/>

        {/* ── Wavy trail ── */}
        <path d="M 0 368 C 35 365, 45 361, 70 360 C 110 359, 150 340, 195 338 C 240 336, 285 344, 320 356 C 345 362, 365 360, 380 362"
          stroke="#e0d0b0" strokeWidth="6" fill="none" opacity="0.3"/>
        <path d="M 0 368 C 35 365, 45 361, 70 360 C 110 359, 150 340, 195 338 C 240 336, 285 344, 320 356 C 345 362, 365 360, 380 362"
          stroke={GOLD} strokeWidth="1.8" strokeDasharray="9 5" fill="none" opacity="0.65"/>

        {/* ── Milestones ── */}
        <Stop cx={70}  cy={360} year="2019" title="Class X"    sub1="Newtown School"  sub2="90%"
          color="#6b8e4e" glyph={Glyph.book} />
        <Stop cx={195} cy={338} year="2021" title="Class XII"  sub1="Newtown School"  sub2="83%"
          color="#9a3b3b" glyph={Glyph.cap} badgeDy={52} />
        <Stop cx={320} cy={356} year="2025" title="B.Tech CSE (AIML)" sub1="Univ. of Engineering &amp; Mgmt." sub2="Kolkata · Graduated"
          color="#c99a3e" glyph={Glyph.gear} />

        {/* ── Quote + leaf sprig ── */}
        <rect x={38} y={430} width={230} height={78} rx={5}
          fill={CREAM} stroke={GOLD} strokeWidth={0.9} opacity={0.9}/>
        <text x={45}  y={442} style={{fontSize:8,fill:GOLD,opacity:0.6}}>✦</text>
        <text x={258} y={442} style={{fontSize:8,fill:GOLD,opacity:0.6}}>✦</text>
        <text x={45}  y={500} style={{fontSize:8,fill:GOLD,opacity:0.6}}>✦</text>
        <text x={258} y={500} style={{fontSize:8,fill:GOLD,opacity:0.6}}>✦</text>
        <text x={153} y={460} textAnchor="middle"
          style={{fontFamily:SERIF,fontSize:11,fontStyle:'italic',fill:NAVY,opacity:0.85}}>
          "The journey is
        </text>
        <text x={153} y={477} textAnchor="middle"
          style={{fontFamily:SERIF,fontSize:11,fontStyle:'italic',fill:NAVY,opacity:0.85}}>
          the destination."
        </text>
        <text x={153} y={494} textAnchor="middle"
          style={{fontFamily:SANS,fontSize:7.5,letterSpacing:1.5,fill:MUTED,opacity:0.6}}>
          — Ralph Waldo Emerson
        </text>
        <LeafSprig x={44} y={498}/>

      </svg>
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

        <Landscape uid="R"/>

        <BlossomTree x={22}  y={210} s={0.8}/>
        <BlossomTree x={185} y={208} s={0.7} flip/>
        <BlossomTree x={358} y={215} s={0.85} flip/>

        <line x1="0" y1="272" x2="380" y2="272" stroke="#c0aa80" strokeWidth="0.7" opacity="0.3"/>
        {[28,82,152,222,285,348].map((x,i)=><Grass key={i} x={x} y={272}/>)}
        {[48,118,188,258,330].map((x,i)=><Rock key={i} x={x} y={280}/>)}

        {/* ── Wavy trail ── */}
        <path d="M 0 350 C 40 348, 75 346, 110 345 C 160 344, 220 344, 270 344 C 305 344, 345 347, 380 350"
          stroke="#e0d0b0" strokeWidth="6" fill="none" opacity="0.3"/>
        <path d="M 0 350 C 40 348, 75 346, 110 345 C 160 344, 220 344, 270 344 C 305 344, 345 347, 380 350"
          stroke={GOLD} strokeWidth="1.8" strokeDasharray="9 5" fill="none" opacity="0.65"/>

        {/* ── Milestones ── */}
        <Stop cx={110} cy={345} year="2025" title="NCC Naval"   sub1="National Cadet Corps"    sub2="C Certificate"
          color="#7c8c4a" glyph={Glyph.shield} />
        <Stop cx={270} cy={344} year="2026" title="Freelancing" sub1="AI-Assisted Development" sub2="Independent Projects"
          color="#3d6d94" glyph={Glyph.briefcase} badgeDy={52} />

        {/* ── Guided by Purpose card ── */}
        <GuidedByPurpose x={36} y={432} width={220}/>

        {/* ── Compass rose ── */}
        <Compass cx={330} cy={480}/>

      </svg>
      {onNext && <div className="page-number" onClick={onNext}>4</div>}
    </div>
  );
};

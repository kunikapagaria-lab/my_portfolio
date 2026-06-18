import React from 'react';
import { useJourney } from './JourneyContext';

/* ═══════════════════════════════════════════
   THEME STYLING CONFIGURATIONS
═══════════════════════════════════════════ */
const CONCEPTS = [
  { key: 'A', label: 'Nautical'  },
  { key: 'B', label: 'Celestial' },
  { key: 'C', label: 'Explorer'  },
  { key: 'D', label: 'Metro'     },
  { key: 'E', label: 'Ancient'   },
];

const THEME = {
  A: {
    pageBg: '#d8e8f0',
    btnActive: '#1a4a7a',
    btnActiveTxt: 'white',
    dark: false,
    stroke: '#1a4a7a',
    strokeSecondary: '#8aaac8',
    textMain: '#103055',
    textMuted: '#5a7aaa',
    font: 'var(--font-serif)',
  },
  B: {
    pageBg: '#04070f',
    btnActive: '#c5a880',
    btnActiveTxt: '#04070f',
    dark: true,
    stroke: '#c5a880',
    strokeSecondary: '#4fc3f7',
    textMain: '#ffffff',
    textMuted: '#a89d8c',
    font: 'var(--font-serif)',
  },
  C: {
    pageBg: '#ede3ce',
    btnActive: '#4a6f44',
    btnActiveTxt: 'white',
    dark: false,
    stroke: '#2d4a25',
    strokeSecondary: '#c0392b',
    textMain: '#2e1f0e',
    textMuted: '#7a5520',
    font: 'var(--font-sans)',
  },
  D: {
    pageBg: '#f2f3f5',
    btnActive: '#2e6bc7',
    btnActiveTxt: 'white',
    dark: false,
    stroke: '#1c2d5e',
    strokeSecondary: '#ffd54f',
    textMain: '#1c2d5e',
    textMuted: '#6c7a9c',
    font: 'var(--font-sans)',
  },
  E: {
    pageBg: '#f0e6c8',
    btnActive: '#7a3d10',
    btnActiveTxt: 'white',
    dark: false,
    stroke: '#5c3815',
    strokeSecondary: '#c5a880',
    textMain: '#4a2808',
    textMuted: '#8c5f35',
    font: 'var(--font-serif)',
  },
};

/* ═══════════════════════════════════════════
   VECTOR ILLUSTRATION HELPERS
═══════════════════════════════════════════ */
const DrawSchool = ({ color }) => (
  <g transform="scale(0.85)">
    <path d="M-15,10 L15,10 L15,-10 L-15,-10 Z" fill="none" stroke={color} strokeWidth="1.8" />
    <path d="M-15,-10 L0,-22 L15,-10" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M-4,10 L-4,0 L4,0 L4,10" fill="none" stroke={color} strokeWidth="1.5" />
    <circle cx="0" cy="-6" r="2.5" fill="none" stroke={color} strokeWidth="1.3" />
    <line x1="-9" y1="-4" x2="-5" y2="-4" stroke={color} strokeWidth="1.2" />
    <line x1="5" y1="-4" x2="9" y2="-4" stroke={color} strokeWidth="1.2" />
  </g>
);

const DrawGraduation = ({ color }) => (
  <g transform="scale(0.95)">
    <polygon points="0,-12 18,-4 0,4 -18,-4" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M-10,-1 L-10,8 C-10,12 10,12 10,8 L10,-1" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9,-3 L15,5 L15,12" fill="none" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
    <circle cx="15" cy="12" r="2" fill={color} />
  </g>
);

const DrawAnchor = ({ color }) => (
  <g transform="scale(0.9)">
    <line x1="0" y1="-18" x2="0" y2="12" stroke={color} strokeWidth="2" />
    <line x1="-8" y1="-10" x2="8" y2="-10" stroke={color} strokeWidth="1.8" />
    <circle cx="0" cy="-18" r="3.5" fill="none" stroke={color} strokeWidth="1.5" />
    <path d="M-12,2 C-12,14 12,14 12,2" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M-15,3 L-12,0 L-9,3" fill="none" stroke={color} strokeWidth="1.5" />
    <path d="M9,3 L12,0 L15,3" fill="none" stroke={color} strokeWidth="1.5" />
  </g>
);

const DrawCompassRose = ({ color, altColor }) => (
  <g transform="scale(0.9)">
    <circle cx="0" cy="0" r="18" fill="none" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
    <path d="M0,-18 L3,-5 L0,-2 L-3,-5 Z" fill={color} />
    <path d="M0,18 L3,5 L0,2 L-3,5 Z" fill={altColor} />
    <path d="M18,0 L5,3 L2,0 L5,-3 Z" fill={altColor} />
    <path d="M-18,0 L-5,3 L-2,0 L-5,-3 Z" fill={altColor} />
    <circle cx="0" cy="0" r="3" fill="none" stroke={color} strokeWidth="1.5" />
  </g>
);

const DrawMountain = ({ color }) => (
  <g transform="scale(0.85)">
    <polygon points="0,-16 16,12 -16,12" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
    <polygon points="0,-16 6,-6 2,-3 -2,-4 -5,-7" fill="none" stroke={color} strokeWidth="1.5" />
    <line x1="0" y1="-16" x2="0" y2="-25" stroke={color} strokeWidth="1.3" />
    <polygon points="0,-25 8,-21 0,-17" fill={color} />
  </g>
);

/* ═══════════════════════════════════════════
   CONCEPT A — NAUTICAL CHART
═══════════════════════════════════════════ */
const NauticalLeft = () => {
  const theme = THEME.A;
  return (
    <svg width="100%" height="100%" viewBox="0 0 460 620" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
      <defs>
        <pattern id="naut-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(26,74,122,0.12)" strokeWidth="0.7"/>
        </pattern>
      </defs>

      <rect width="460" height="620" fill={theme.pageBg}/>
      <rect width="460" height="620" fill="url(#naut-grid)"/>
      <rect x="15" y="15" width="430" height="590" fill="none" stroke="rgba(26,74,122,0.3)" strokeWidth="1"/>

      {/* Lat labels */}
      {[100, 200, 300, 400, 500].map(y => (
        <text key={y} x="20" y={y+3} fontSize="7" fontFamily="monospace" fill="rgba(26,74,122,0.4)">{(22.5 + (500-y)*0.005).toFixed(3)}°N</text>
      ))}

      {/* 1. SEAMLESS WINDING PATH */}
      <path d="M 80,500 C 130,400 150,220 200,150 C 250,80 300,350 360,420 C 400,460 430,300 460,240"
        fill="none" stroke={theme.stroke} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M 80,500 C 130,400 150,220 200,150 C 250,80 300,350 360,420 C 400,460 430,300 460,240"
        fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="6 4" className="jmap-route"/>

      {/* Compass Rose Ornament */}
      <g transform="translate(85,100)">
        <DrawCompassRose color={theme.stroke} altColor={theme.strokeSecondary} />
        <text x="0" y="-23" textAnchor="middle" fontSize="8" fontFamily={theme.font} fontWeight="bold" fill={theme.stroke}>N</text>
      </g>

      {/* ═════════ MILESTONE 0: 2015 ═════════ */}
      <g transform="translate(80,500)">
        {/* Curved text path */}
        <path id="naut-arc-0" d="M -29,0 A 29,29 0 1,1 29,0" fill="none" />
        <text fontSize="7" fontWeight="bold" fill={theme.stroke} letterSpacing="1" fontFamily={theme.font}>
          <textPath href="#naut-arc-0" startOffset="50%" textAnchor="middle">DEPARTURE</textPath>
        </text>
        {/* Graphic Node with outline */}
        <circle r="23" fill="white" stroke={theme.stroke} strokeWidth="3" style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.1))' }}/>
        <DrawAnchor color={theme.stroke} />
      </g>
      {/* Leader & Direct Text */}
      <line x1="80" y1="527" x2="80" y2="560" stroke={theme.stroke} strokeWidth="1" strokeDasharray="3 3"/>
      <circle cx="80" cy="560" r="2.5" fill={theme.stroke} />
      <g transform="translate(80,578)">
        <text textAnchor="middle" fontSize="15" fontWeight="bold" fill={theme.textMain} fontFamily={theme.font}>2015</text>
        <text textAnchor="middle" y="12" fontSize="9.5" fill={theme.textMuted} fontWeight="500">Journey Commenced</text>
      </g>

      {/* ═════════ MILESTONE 1: 2019 ═════════ */}
      <g transform="translate(200,150)">
        <path id="naut-arc-1" d="M -30,0 A 30,30 0 1,1 30,0" fill="none" />
        <text fontSize="7" fontWeight="bold" fill={theme.stroke} letterSpacing="1" fontFamily={theme.font}>
          <textPath href="#naut-arc-1" startOffset="50%" textAnchor="middle">SCHOOLING</textPath>
        </text>
        <circle r="24" fill="white" stroke={theme.stroke} strokeWidth="3.5" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))' }}/>
        <DrawSchool color={theme.stroke} />
      </g>
      {/* Leader & Direct Text */}
      <line x1="200" y1="122" x2="200" y2="85" stroke={theme.stroke} strokeWidth="1" strokeDasharray="3 3"/>
      <circle cx="200" cy="85" r="2.5" fill={theme.stroke} />
      <g transform="translate(200,52)">
        <text textAnchor="middle" fontSize="16" fontWeight="bold" fill={theme.textMain} fontFamily={theme.font}>2019</text>
        <text textAnchor="middle" y="12" fontSize="10" fill={theme.textMain} fontWeight="bold">Class X · 90%</text>
        <text textAnchor="middle" y="23" fontSize="8" fill={theme.textMuted}>Newtown School, Kolkata</text>
      </g>

      {/* ═════════ MILESTONE 2: 2021 ═════════ */}
      <g transform="translate(360,420)">
        <path id="naut-arc-2" d="M -30,0 A 30,30 0 1,1 30,0" fill="none" />
        <text fontSize="7" fontWeight="bold" fill={theme.stroke} letterSpacing="1" fontFamily={theme.font}>
          <textPath href="#naut-arc-2" startOffset="50%" textAnchor="middle">ACADEMICS</textPath>
        </text>
        <circle r="24" fill="white" stroke={theme.stroke} strokeWidth="3.5" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))' }}/>
        <DrawGraduation color={theme.stroke} />
      </g>
      {/* Leader & Direct Text */}
      <line x1="360" y1="448" x2="360" y2="495" stroke={theme.stroke} strokeWidth="1" strokeDasharray="3 3"/>
      <circle cx="360" cy="495" r="2.5" fill={theme.stroke} />
      <g transform="translate(360,512)">
        <text textAnchor="middle" fontSize="16" fontWeight="bold" fill={theme.textMain} fontFamily={theme.font}>2021</text>
        <text textAnchor="middle" y="12" fontSize="10" fill={theme.textMain} fontWeight="bold">Class XII · 83%</text>
        <text textAnchor="middle" y="23" fontSize="8" fill={theme.textMuted}>Newtown School, Kolkata</text>
      </g>
    </svg>
  );
};

const NauticalRight = () => {
  const theme = THEME.A;
  return (
    <svg width="100%" height="100%" viewBox="0 0 460 620" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
      <rect width="460" height="620" fill={theme.pageBg}/>
      <rect width="460" height="620" fill="url(#naut-grid)"/>
      <rect x="15" y="15" width="430" height="590" fill="none" stroke="rgba(26,74,122,0.3)" strokeWidth="1"/>

      {/* Lon labels */}
      {[100, 200, 300, 400].map(x => (
        <text key={x} x={x-12} y="605" fontSize="7" fontFamily="monospace" fill="rgba(26,74,122,0.4)">{(88.4 + x*0.005).toFixed(3)}°E</text>
      ))}

      {/* 1. SEAMLESS WINDING PATH */}
      <path d="M 0,240 C 40,180 120,80 180,120 C 240,160 300,400 340,480 C 380,560 400,380 420,300"
        fill="none" stroke={theme.stroke} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M 0,240 C 40,180 120,80 180,120 C 240,160 300,400 340,480 C 380,560 400,380 420,300"
        fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="6 4" className="jmap-route"/>

      {/* ═════════ MILESTONE 3: 2025 B.TECH ═════════ */}
      <g transform="translate(180,120)">
        <path id="naut-arc-3" d="M -30,0 A 30,30 0 1,1 30,0" fill="none" />
        <text fontSize="7" fontWeight="bold" fill={theme.stroke} letterSpacing="1" fontFamily={theme.font}>
          <textPath href="#naut-arc-3" startOffset="50%" textAnchor="middle">GRADUATION</textPath>
        </text>
        <circle r="25" fill="white" stroke={theme.stroke} strokeWidth="3.5" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))' }}/>
        <DrawGraduation color={theme.stroke} />
      </g>
      {/* Leader & Direct Text */}
      <line x1="180" y1="91" x2="180" y2="55" stroke={theme.stroke} strokeWidth="1" strokeDasharray="3 3"/>
      <circle cx="180" cy="55" r="2.5" fill={theme.stroke} />
      <g transform="translate(180,24)">
        <text textAnchor="middle" fontSize="16" fontWeight="bold" fill={theme.textMain} fontFamily={theme.font}>2025</text>
        <text textAnchor="middle" y="12" fontSize="10" fill={theme.textMain} fontWeight="bold">B.Tech CSE (AIML)</text>
        <text textAnchor="middle" y="23" fontSize="8" fill={theme.textMuted}>UEM Kolkata · Graduated</text>
      </g>

      {/* ═════════ MILESTONE 4: 2025 NCC ═════════ */}
      <g transform="translate(340,480)">
        <path id="naut-arc-4" d="M -30,0 A 30,30 0 1,1 30,0" fill="none" />
        <text fontSize="7" fontWeight="bold" fill={theme.stroke} letterSpacing="1" fontFamily={theme.font}>
          <textPath href="#naut-arc-4" startOffset="50%" textAnchor="middle">NAVAL CADET</textPath>
        </text>
        <circle r="24" fill="white" stroke={theme.stroke} strokeWidth="3.5" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))' }}/>
        <DrawAnchor color={theme.stroke} />
      </g>
      {/* Leader & Direct Text */}
      <line x1="340" y1="508" x2="340" y2="540" stroke={theme.stroke} strokeWidth="1" strokeDasharray="3 3"/>
      <circle cx="340" cy="540" r="2.5" fill={theme.stroke} />
      <g transform="translate(340,558)">
        <text textAnchor="middle" fontSize="16" fontWeight="bold" fill={theme.textMain} fontFamily={theme.font}>2025</text>
        <text textAnchor="middle" y="12" fontSize="9.5" fill={theme.textMain} fontWeight="bold">NCC C Certificate</text>
        <text textAnchor="middle" y="23" fontSize="8" fill={theme.textMuted}>Naval Wing · Captain</text>
      </g>

      {/* Destination Anchor */}
      <g transform="translate(420,300)">
        <circle r="6" fill={theme.strokeSecondary} />
        <text x="0" y="18" textAnchor="middle" fontSize="7" fill={theme.stroke} fontWeight="bold">PRESENT</text>
      </g>
    </svg>
  );
};

/* ═══════════════════════════════════════════
   CONCEPT B — CELESTIAL CHART
═══════════════════════════════════════════ */
const CelestialLeft = () => {
  const theme = THEME.B;
  return (
    <svg width="100%" height="100%" viewBox="0 0 460 620" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
      <defs>
        <radialGradient id="nebula-grad-l" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a203f" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#04070f" stopOpacity="0"/>
        </radialGradient>
      </defs>

      <rect width="460" height="620" fill={theme.pageBg}/>
      <ellipse cx="230" cy="310" rx="280" ry="180" fill="url(#nebula-grad-l)" />

      {/* Constellation grid lines */}
      <line x1="20" y1="100" x2="440" y2="100" stroke="rgba(197,168,128,0.12)" strokeWidth="0.8" strokeDasharray="4 8" />
      <line x1="20" y1="310" x2="440" y2="310" stroke="rgba(197,168,128,0.15)" strokeWidth="1" />
      <line x1="20" y1="520" x2="440" y2="520" stroke="rgba(197,168,128,0.12)" strokeWidth="0.8" strokeDasharray="4 8" />

      {/* Decorative astrolabe border */}
      <circle cx="230" cy="310" r="300" fill="none" stroke="rgba(197,168,128,0.18)" strokeWidth="1" />
      <circle cx="230" cy="310" r="290" fill="none" stroke="rgba(197,168,128,0.08)" strokeWidth="0.8" strokeDasharray="2 3" />

      {/* Constellation stars background */}
      {[[60,80],[120,280],[40,420],[280,70],[390,160],[140,540]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r={i%2===0?1.5:2} fill="white" opacity="0.6" className="jstar-twinkle" />
      ))}

      {/* 1. SEAMLESS WINDING CONSTALLATION PATH */}
      <path d="M 80,500 C 130,400 150,220 200,150 C 250,80 300,350 360,420 C 400,460 430,300 460,240"
        fill="none" stroke={theme.stroke} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M 80,500 C 130,400 150,220 200,150 C 250,80 300,350 360,420 C 400,460 430,300 460,240"
        fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" className="jmap-route"/>

      {/* ═════════ MILESTONE 0: 2015 ═════════ */}
      <g transform="translate(80,500)">
        <path id="cel-arc-0" d="M -30,0 A 30,30 0 1,1 30,0" fill="none" />
        <text fontSize="7.5" fontWeight="bold" fill={theme.stroke} letterSpacing="1.2" fontFamily={theme.font}>
          <textPath href="#cel-arc-0" startOffset="50%" textAnchor="middle">APHELION</textPath>
        </text>
        <circle r="22" fill="#081024" stroke={theme.stroke} strokeWidth="3" style={{ filter: 'drop-shadow(0 0 8px #c5a88060)' }}/>
        <DrawAnchor color={theme.stroke} />
      </g>
      {/* Leader & Direct Text */}
      <line x1="80" y1="526" x2="80" y2="558" stroke={theme.stroke} strokeWidth="1" strokeDasharray="2 3"/>
      <circle cx="80" cy="558" r="2" fill={theme.stroke} />
      <g transform="translate(80,578)">
        <text textAnchor="middle" fontSize="16" fontWeight="bold" fill={theme.textMain} fontFamily={theme.font}>2015</text>
        <text textAnchor="middle" y="12" fontSize="9.5" fill={theme.textMuted}>First coordinates logged</text>
      </g>

      {/* ═════════ MILESTONE 1: 2019 ═════════ */}
      <g transform="translate(200,150)">
        <path id="cel-arc-1" d="M -30,0 A 30,30 0 1,1 30,0" fill="none" />
        <text fontSize="7.5" fontWeight="bold" fill={theme.stroke} letterSpacing="1.2" fontFamily={theme.font}>
          <textPath href="#cel-arc-1" startOffset="50%" textAnchor="middle">SCHOOLING</textPath>
        </text>
        <circle r="22" fill="#081024" stroke={theme.stroke} strokeWidth="3" style={{ filter: 'drop-shadow(0 0 10px #c5a88080)' }}/>
        <DrawSchool color={theme.stroke} />
      </g>
      {/* Leader & Direct Text */}
      <line x1="200" y1="124" x2="200" y2="85" stroke={theme.stroke} strokeWidth="1" strokeDasharray="2 3"/>
      <circle cx="200" cy="85" r="2" fill={theme.stroke} />
      <g transform="translate(200,52)">
        <text textAnchor="middle" fontSize="16" fontWeight="bold" fill={theme.textMain} fontFamily={theme.font}>2019</text>
        <text textAnchor="middle" y="12" fontSize="10" fill={theme.textMain} fontWeight="bold">Class X · 90%</text>
        <text textAnchor="middle" y="23" fontSize="8" fill={theme.textMuted}>Newtown School, Kolkata</text>
      </g>

      {/* ═════════ MILESTONE 2: 2021 ═════════ */}
      <g transform="translate(360,420)">
        <path id="cel-arc-2" d="M -30,0 A 30,30 0 1,1 30,0" fill="none" />
        <text fontSize="7.5" fontWeight="bold" fill={theme.stroke} letterSpacing="1.2" fontFamily={theme.font}>
          <textPath href="#cel-arc-2" startOffset="50%" textAnchor="middle">EQUINOX</textPath>
        </text>
        <circle r="22" fill="#081024" stroke={theme.stroke} strokeWidth="3" style={{ filter: 'drop-shadow(0 0 10px #c5a88080)' }}/>
        <DrawGraduation color={theme.stroke} />
      </g>
      {/* Leader & Direct Text */}
      <line x1="360" y1="446" x2="360" y2="495" stroke={theme.stroke} strokeWidth="1" strokeDasharray="2 3"/>
      <circle cx="360" cy="495" r="2" fill={theme.stroke} />
      <g transform="translate(360,512)">
        <text textAnchor="middle" fontSize="16" fontWeight="bold" fill={theme.textMain} fontFamily={theme.font}>2021</text>
        <text textAnchor="middle" y="12" fontSize="10" fill={theme.textMain} fontWeight="bold">Class XII · 83%</text>
        <text textAnchor="middle" y="23" fontSize="8" fill={theme.textMuted}>Newtown School, Kolkata</text>
      </g>
    </svg>
  );
};

const CelestialRight = () => {
  const theme = THEME.B;
  return (
    <svg width="100%" height="100%" viewBox="0 0 460 620" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
      <defs>
        <radialGradient id="nebula-grad-r" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#122442" stopOpacity="0.45"/>
          <stop offset="100%" stopColor="#04070f" stopOpacity="0"/>
        </radialGradient>
      </defs>

      <rect width="460" height="620" fill={theme.pageBg}/>
      <ellipse cx="230" cy="310" rx="280" ry="180" fill="url(#nebula-grad-r)" />

      {/* Constellation grid lines */}
      <line x1="20" y1="100" x2="440" y2="100" stroke="rgba(197,168,128,0.12)" strokeWidth="0.8" strokeDasharray="4 8" />
      <line x1="20" y1="310" x2="440" y2="310" stroke="rgba(197,168,128,0.15)" strokeWidth="1" />
      <line x1="20" y1="520" x2="440" y2="520" stroke="rgba(197,168,128,0.12)" strokeWidth="0.8" strokeDasharray="4 8" />

      {/* Decorative astrolabe border */}
      <circle cx="230" cy="310" r="300" fill="none" stroke="rgba(197,168,128,0.18)" strokeWidth="1" />
      <circle cx="230" cy="310" r="290" fill="none" stroke="rgba(197,168,128,0.08)" strokeWidth="0.8" strokeDasharray="2 3" />

      {/* Background stars */}
      {[[50,140],[320,80],[240,400],[80,480],[410,210],[190,560]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r={i%2===0?1.5:2} fill="white" opacity="0.65" className="jstar-twinkle" />
      ))}

      {/* 1. SEAMLESS WINDING CONSTALLATION PATH */}
      <path d="M 0,240 C 40,180 120,80 180,120 C 240,160 300,400 340,480 C 380,560 400,380 420,300"
        fill="none" stroke={theme.stroke} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M 0,240 C 40,180 120,80 180,120 C 240,160 300,400 340,480 C 380,560 400,380 420,300"
        fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" className="jmap-route"/>

      {/* ═════════ MILESTONE 3: 2025 B.TECH ═════════ */}
      <g transform="translate(180,120)">
        <path id="cel-arc-3" d="M -30,0 A 30,30 0 1,1 30,0" fill="none" />
        <text fontSize="7.5" fontWeight="bold" fill={theme.stroke} letterSpacing="1.2" fontFamily={theme.font}>
          <textPath href="#cel-arc-3" startOffset="50%" textAnchor="middle">GRADUATION</textPath>
        </text>
        <circle r="22" fill="#081024" stroke={theme.stroke} strokeWidth="3" style={{ filter: 'drop-shadow(0 0 10px #c5a88080)' }}/>
        <DrawGraduation color={theme.stroke} />
      </g>
      {/* Leader & Direct Text */}
      <line x1="180" y1="94" x2="180" y2="55" stroke={theme.stroke} strokeWidth="1" strokeDasharray="2 3"/>
      <circle cx="180" cy="55" r="2" fill={theme.stroke} />
      <g transform="translate(180,24)">
        <text textAnchor="middle" fontSize="16" fontWeight="bold" fill={theme.textMain} fontFamily={theme.font}>2025</text>
        <text textAnchor="middle" y="12" fontSize="10" fill={theme.textMain} fontWeight="bold">B.Tech CSE (AIML)</text>
        <text textAnchor="middle" y="23" fontSize="8" fill={theme.textMuted}>UEM Kolkata · Graduated</text>
      </g>

      {/* ═════════ MILESTONE 4: 2025 NCC ═════════ */}
      <g transform="translate(340,480)">
        <path id="cel-arc-4" d="M -30,0 A 30,30 0 1,1 30,0" fill="none" />
        <text fontSize="7.5" fontWeight="bold" fill={theme.stroke} letterSpacing="1.2" fontFamily={theme.font}>
          <textPath href="#cel-arc-4" startOffset="50%" textAnchor="middle">ZENITH</textPath>
        </text>
        <circle r="22" fill="#081024" stroke={theme.stroke} strokeWidth="3" style={{ filter: 'drop-shadow(0 0 10px #c5a88080)' }}/>
        <DrawAnchor color={theme.stroke} />
      </g>
      {/* Leader & Direct Text */}
      <line x1="340" y1="506" x2="340" y2="540" stroke={theme.stroke} strokeWidth="1" strokeDasharray="2 3"/>
      <circle cx="340" cy="540" r="2" fill={theme.stroke} />
      <g transform="translate(340,558)">
        <text textAnchor="middle" fontSize="16" fontWeight="bold" fill={theme.textMain} fontFamily={theme.font}>2025</text>
        <text textAnchor="middle" y="12" fontSize="9.5" fill={theme.textMain} fontWeight="bold">NCC C Certificate</text>
        <text textAnchor="middle" y="23" fontSize="8" fill={theme.textMuted}>Naval Wing · Captain</text>
      </g>

      {/* Starburst Present node */}
      <g transform="translate(420,300)">
        <polygon points="0,-12 3,-3 12,0 3,3 0,12 -3,3 -12,0 -3,-3" fill={theme.stroke} />
        <circle r="3" fill="white" />
        <text x="0" y="21" textAnchor="middle" fontSize="7.5" fill={theme.stroke} fontWeight="bold">ORBIT</text>
      </g>
    </svg>
  );
};

/* ═══════════════════════════════════════════
   CONCEPT C — EXPLORER (Topographic Map)
═══════════════════════════════════════════ */
const ExplorerLeft = () => {
  const theme = THEME.C;
  return (
    <svg width="100%" height="100%" viewBox="0 0 460 620" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
      <defs>
        {/* Topographic line rings */}
        <pattern id="topo-rings" width="120" height="120" patternUnits="userSpaceOnUse">
          <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(122,85,32,0.06)" strokeWidth="0.8"/>
          <circle cx="60" cy="60" r="40" fill="none" stroke="rgba(122,85,32,0.06)" strokeWidth="0.8"/>
          <circle cx="60" cy="60" r="30" fill="none" stroke="rgba(122,85,32,0.06)" strokeWidth="0.8"/>
          <circle cx="60" cy="60" r="20" fill="none" stroke="rgba(122,85,32,0.06)" strokeWidth="0.8"/>
        </pattern>
      </defs>

      <rect width="460" height="620" fill={theme.pageBg}/>
      <rect width="460" height="620" fill="url(#topo-rings)"/>
      <rect x="15" y="15" width="430" height="590" fill="none" stroke="rgba(74,111,68,0.2)" strokeWidth="1.5"/>

      {/* 1. SEAMLESS WINDING TRAILS */}
      <path d="M 80,500 C 130,400 150,220 200,150 C 250,80 300,350 360,420 C 400,460 430,300 460,240"
        fill="none" stroke={theme.stroke} strokeWidth="8" strokeLinecap="round"/>
      <path d="M 80,500 C 130,400 150,220 200,150 C 250,80 300,350 360,420 C 400,460 430,300 460,240"
        fill="none" stroke={theme.strokeSecondary} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="5 4" className="jmap-route"/>

      {/* ═════════ MILESTONE 0: 2015 ═════════ */}
      <g transform="translate(80,500)">
        <path id="exp-arc-0" d="M -30,0 A 30,30 0 1,1 30,0" fill="none" />
        <text fontSize="7" fontWeight="bold" fill={theme.stroke} letterSpacing="1" fontFamily={theme.font}>
          <textPath href="#exp-arc-0" startOffset="50%" textAnchor="middle">BASECAMP</textPath>
        </text>
        {/* Mountain Outline style node - thick stroke */}
        <circle r="22" fill="#faf6ee" stroke={theme.stroke} strokeWidth="3" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}/>
        <DrawAnchor color={theme.stroke} />
      </g>
      {/* Strict Vertical Guide line (like architectural photo reference) */}
      <line x1="80" y1="525" x2="80" y2="560" stroke={theme.strokeSecondary} strokeWidth="1.8" />
      <circle cx="80" cy="560" r="3" fill={theme.strokeSecondary} />
      <g transform="translate(80,578)">
        <text textAnchor="middle" fontSize="15" fontWeight="bold" fill={theme.textMain} fontFamily={theme.font}>2015</text>
        <text textAnchor="middle" y="12" fontSize="9.5" fill={theme.textMuted}>Elevation zero reached</text>
      </g>

      {/* ═════════ MILESTONE 1: 2019 ═════════ */}
      <g transform="translate(200,150)">
        <path id="exp-arc-1" d="M -30,0 A 30,30 0 1,1 30,0" fill="none" />
        <text fontSize="7" fontWeight="bold" fill={theme.stroke} letterSpacing="1" fontFamily={theme.font}>
          <textPath href="#exp-arc-1" startOffset="50%" textAnchor="middle">CLIMBING</textPath>
        </text>
        <circle r="23" fill="#faf6ee" stroke={theme.stroke} strokeWidth="3" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}/>
        <DrawSchool color={theme.stroke} />
      </g>
      {/* Leader & Direct Text */}
      <line x1="200" y1="125" x2="200" y2="85" stroke={theme.strokeSecondary} strokeWidth="1.8" />
      <circle cx="200" cy="85" r="3" fill={theme.strokeSecondary} />
      <g transform="translate(200,52)">
        <text textAnchor="middle" fontSize="16" fontWeight="bold" fill={theme.textMain} fontFamily={theme.font}>2019</text>
        <text textAnchor="middle" y="12" fontSize="10" fill={theme.textMain} fontWeight="bold">Class X · 90%</text>
        <text textAnchor="middle" y="23" fontSize="8" fill={theme.textMuted}>Newtown School, Kolkata</text>
      </g>

      {/* ═════════ MILESTONE 2: 2021 ═════════ */}
      <g transform="translate(360,420)">
        <path id="exp-arc-2" d="M -30,0 A 30,30 0 1,1 30,0" fill="none" />
        <text fontSize="7" fontWeight="bold" fill={theme.stroke} letterSpacing="1" fontFamily={theme.font}>
          <textPath href="#exp-arc-2" startOffset="50%" textAnchor="middle">ASCENT</textPath>
        </text>
        <circle r="23" fill="#faf6ee" stroke={theme.stroke} strokeWidth="3" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}/>
        <DrawMountain color={theme.stroke} />
      </g>
      {/* Leader & Direct Text */}
      <line x1="360" y1="445" x2="360" y2="495" stroke={theme.strokeSecondary} strokeWidth="1.8" />
      <circle cx="360" cy="495" r="3" fill={theme.strokeSecondary} />
      <g transform="translate(360,512)">
        <text textAnchor="middle" fontSize="16" fontWeight="bold" fill={theme.textMain} fontFamily={theme.font}>2021</text>
        <text textAnchor="middle" y="12" fontSize="10" fill={theme.textMain} fontWeight="bold">Class XII · 83%</text>
        <text textAnchor="middle" y="23" fontSize="8" fill={theme.textMuted}>Newtown School, Kolkata</text>
      </g>
    </svg>
  );
};

const ExplorerRight = () => {
  const theme = THEME.C;
  return (
    <svg width="100%" height="100%" viewBox="0 0 460 620" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
      <rect width="460" height="620" fill={theme.pageBg}/>
      <rect width="460" height="620" fill="url(#topo-rings)"/>
      <rect x="15" y="15" width="430" height="590" fill="none" stroke="rgba(74,111,68,0.2)" strokeWidth="1.5"/>

      {/* 1. SEAMLESS WINDING TRAILS */}
      <path d="M 0,240 C 40,180 120,80 180,120 C 240,160 300,400 340,480 C 380,560 400,380 420,300"
        fill="none" stroke={theme.stroke} strokeWidth="8" strokeLinecap="round"/>
      <path d="M 0,240 C 40,180 120,80 180,120 C 240,160 300,400 340,480 C 380,560 400,380 420,300"
        fill="none" stroke={theme.strokeSecondary} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="5 4" className="jmap-route"/>

      {/* ═════════ MILESTONE 3: 2025 B.TECH ═════════ */}
      <g transform="translate(180,120)">
        <path id="exp-arc-3" d="M -30,0 A 30,30 0 1,1 30,0" fill="none" />
        <text fontSize="7" fontWeight="bold" fill={theme.stroke} letterSpacing="1" fontFamily={theme.font}>
          <textPath href="#exp-arc-3" startOffset="50%" textAnchor="middle">SUMMIT</textPath>
        </text>
        <circle r="24" fill="#faf6ee" stroke={theme.stroke} strokeWidth="3" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}/>
        <DrawGraduation color={theme.stroke} />
      </g>
      {/* Leader & Direct Text */}
      <line x1="180" y1="93" x2="180" y2="55" stroke={theme.strokeSecondary} strokeWidth="1.8" />
      <circle cx="180" cy="55" r="3" fill={theme.strokeSecondary} />
      <g transform="translate(180,24)">
        <text textAnchor="middle" fontSize="16" fontWeight="bold" fill={theme.textMain} fontFamily={theme.font}>2025</text>
        <text textAnchor="middle" y="12" fontSize="10" fill={theme.textMain} fontWeight="bold">B.Tech CSE (AIML)</text>
        <text textAnchor="middle" y="23" fontSize="8" fill={theme.textMuted}>UEM Kolkata · Graduated</text>
      </g>

      {/* ═════════ MILESTONE 4: 2025 NCC ═════════ */}
      <g transform="translate(340,480)">
        <path id="exp-arc-4" d="M -30,0 A 30,30 0 1,1 30,0" fill="none" />
        <text fontSize="7" fontWeight="bold" fill={theme.stroke} letterSpacing="1" fontFamily={theme.font}>
          <textPath href="#exp-arc-4" startOffset="50%" textAnchor="middle">ELEVATION</textPath>
        </text>
        <circle r="23" fill="#faf6ee" stroke={theme.stroke} strokeWidth="3" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}/>
        <DrawAnchor color={theme.stroke} />
      </g>
      {/* Leader & Direct Text */}
      <line x1="340" y1="505" x2="340" y2="540" stroke={theme.strokeSecondary} strokeWidth="1.8" />
      <circle cx="340" cy="540" r="3" fill={theme.strokeSecondary} />
      <g transform="translate(340,558)">
        <text textAnchor="middle" fontSize="16" fontWeight="bold" fill={theme.textMain} fontFamily={theme.font}>2025</text>
        <text textAnchor="middle" y="12" fontSize="9.5" fill={theme.textMain} fontWeight="bold">NCC C Certificate</text>
        <text textAnchor="middle" y="23" fontSize="8" fill={theme.textMuted}>Naval Wing · Captain</text>
      </g>

      {/* Summit Marker Flag */}
      <g transform="translate(420,300)">
        <polygon points="0,-8 10,0 0,8 -5,4" fill={theme.strokeSecondary} />
        <line x1="0" y1="8" x2="0" y2="-12" stroke={theme.stroke} strokeWidth="1.5" />
        <text x="0" y="18" textAnchor="middle" fontSize="7" fill={theme.stroke} fontWeight="bold">PIONEER</text>
      </g>
    </svg>
  );
};

/* ═══════════════════════════════════════════
   CONCEPT D — METRO (Subway Tube Map)
═══════════════════════════════════════════ */
const MetroLeft = () => {
  const theme = THEME.D;
  return (
    <svg width="100%" height="100%" viewBox="0 0 460 620" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
      <defs>
        <pattern id="metro-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="15" cy="15" r="1.2" fill="#cdd2de"/>
        </pattern>
      </defs>

      <rect width="460" height="620" fill={theme.pageBg}/>
      <rect width="460" height="620" fill="url(#metro-grid)"/>
      <rect x="15" y="15" width="430" height="590" fill="none" stroke="rgba(28,45,94,0.15)" strokeWidth="1.5"/>

      {/* 1. SEAMLESS WINDING SOLID METRO TRACK */}
      <path d="M 80,500 C 130,400 150,220 200,150 C 250,80 300,350 360,420 C 400,460 430,300 460,240"
        fill="none" stroke="#2e6bc7" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M 80,500 C 130,400 150,220 200,150 C 250,80 300,350 360,420 C 400,460 430,300 460,240"
        fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"/>

      {/* ═════════ MILESTONE 0: 2015 ═════════ */}
      <g transform="translate(80,500)">
        <path id="met-arc-0" d="M -30,0 A 30,30 0 1,1 30,0" fill="none" />
        <text fontSize="7.5" fontWeight="800" fill="#2e6bc7" letterSpacing="1.2" fontFamily={theme.font}>
          <textPath href="#met-arc-0" startOffset="50%" textAnchor="middle">ORIGIN</textPath>
        </text>
        {/* Metro Roundel Node */}
        <circle r="20" fill="white" stroke="#2e6bc7" strokeWidth="4.5" style={{ filter: 'drop-shadow(0 3px 8px rgba(46,107,199,0.18))' }}/>
        <circle r="8" fill="#2e6bc7" />
      </g>
      {/* Strict subway leader layout */}
      <line x1="80" y1="524" x2="80" y2="560" stroke="#2e6bc7" strokeWidth="2.2" />
      <g transform="translate(80,578)">
        <text textAnchor="middle" fontSize="15" fontWeight="900" fill={theme.textMain} fontFamily={theme.font}>2015</text>
        <text textAnchor="middle" y="12" fontSize="9.5" fill={theme.textMuted} fontWeight="bold">Origin Station</text>
      </g>

      {/* ═════════ MILESTONE 1: 2019 ═════════ */}
      <g transform="translate(200,150)">
        <path id="met-arc-1" d="M -30,0 A 30,30 0 1,1 30,0" fill="none" />
        <text fontSize="7.5" fontWeight="800" fill="#2e6bc7" letterSpacing="1.2" fontFamily={theme.font}>
          <textPath href="#met-arc-1" startOffset="50%" textAnchor="middle">STATION A</textPath>
        </text>
        <circle r="20" fill="white" stroke="#2e6bc7" strokeWidth="4.5" style={{ filter: 'drop-shadow(0 3px 8px rgba(46,107,199,0.18))' }}/>
        <circle r="8" fill="#ffd54f" />
      </g>
      <line x1="200" y1="126" x2="200" y2="85" stroke="#2e6bc7" strokeWidth="2.2" />
      <g transform="translate(200,52)">
        <text textAnchor="middle" fontSize="16" fontWeight="900" fill={theme.textMain} fontFamily={theme.font}>2019</text>
        <text textAnchor="middle" y="12" fontSize="10" fill={theme.textMain} fontWeight="bold">Class X · 90%</text>
        <text textAnchor="middle" y="23" fontSize="8" fill={theme.textMuted} fontWeight="bold">Newtown Station</text>
      </g>

      {/* ═════════ MILESTONE 2: 2021 ═════════ */}
      <g transform="translate(360,420)">
        <path id="met-arc-2" d="M -30,0 A 30,30 0 1,1 30,0" fill="none" />
        <text fontSize="7.5" fontWeight="800" fill="#2e6bc7" letterSpacing="1.2" fontFamily={theme.font}>
          <textPath href="#met-arc-2" startOffset="50%" textAnchor="middle">TRANSFER</textPath>
        </text>
        <circle r="20" fill="white" stroke="#2e6bc7" strokeWidth="4.5" style={{ filter: 'drop-shadow(0 3px 8px rgba(46,107,199,0.18))' }}/>
        <circle r="9" fill="#1c2d5e" />
      </g>
      <line x1="360" y1="444" x2="360" y2="495" stroke="#2e6bc7" strokeWidth="2.2" />
      <g transform="translate(360,512)">
        <text textAnchor="middle" fontSize="16" fontWeight="900" fill={theme.textMain} fontFamily={theme.font}>2021</text>
        <text textAnchor="middle" y="12" fontSize="10" fill={theme.textMain} fontWeight="bold">Class XII · 83%</text>
        <text textAnchor="middle" y="23" fontSize="8" fill={theme.textMuted} fontWeight="bold">Newtown Junction</text>
      </g>
    </svg>
  );
};

const MetroRight = () => {
  const theme = THEME.D;
  return (
    <svg width="100%" height="100%" viewBox="0 0 460 620" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
      <rect width="460" height="620" fill={theme.pageBg}/>
      <rect width="460" height="620" fill="url(#metro-grid)"/>
      <rect x="15" y="15" width="430" height="590" fill="none" stroke="rgba(28,45,94,0.15)" strokeWidth="1.5"/>

      {/* 1. SEAMLESS WINDING SOLID METRO TRACK */}
      <path d="M 0,240 C 40,180 120,80 180,120 C 240,160 300,400 340,480 C 380,560 400,380 420,300"
        fill="none" stroke="#2e6bc7" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M 0,240 C 40,180 120,80 180,120 C 240,160 300,400 340,480 C 380,560 400,380 420,300"
        fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"/>

      {/* ═════════ MILESTONE 3: 2025 B.TECH ═════════ */}
      <g transform="translate(180,120)">
        <path id="met-arc-3" d="M -30,0 A 30,30 0 1,1 30,0" fill="none" />
        <text fontSize="7.5" fontWeight="800" fill="#2e6bc7" letterSpacing="1.2" fontFamily={theme.font}>
          <textPath href="#met-arc-3" startOffset="50%" textAnchor="middle">TERMINUS</textPath>
        </text>
        <circle r="21" fill="white" stroke="#2e6bc7" strokeWidth="4.5" style={{ filter: 'drop-shadow(0 3px 8px rgba(46,107,199,0.18))' }}/>
        <circle r="9" fill="#2e6bc7" />
      </g>
      <line x1="180" y1="95" x2="180" y2="55" stroke="#2e6bc7" strokeWidth="2.2" />
      <g transform="translate(180,24)">
        <text textAnchor="middle" fontSize="16" fontWeight="900" fill={theme.textMain} fontFamily={theme.font}>2025</text>
        <text textAnchor="middle" y="12" fontSize="10" fill={theme.textMain} fontWeight="bold">B.Tech CSE (AIML)</text>
        <text textAnchor="middle" y="23" fontSize="8" fill={theme.textMuted} fontWeight="bold">UEM Kolkata Terminal</text>
      </g>

      {/* ═════════ MILESTONE 4: 2025 NCC ═════════ */}
      <g transform="translate(340,480)">
        <path id="met-arc-4" d="M -30,0 A 30,30 0 1,1 30,0" fill="none" />
        <text fontSize="7.5" fontWeight="800" fill="#2e6bc7" letterSpacing="1.2" fontFamily={theme.font}>
          <textPath href="#met-arc-4" startOffset="50%" textAnchor="middle">NAVY WING</textPath>
        </text>
        <circle r="20" fill="white" stroke="#2e6bc7" strokeWidth="4.5" style={{ filter: 'drop-shadow(0 3px 8px rgba(46,107,199,0.18))' }}/>
        <circle r="8" fill="#ffd54f" />
      </g>
      <line x1="340" y1="504" x2="340" y2="540" stroke="#2e6bc7" strokeWidth="2.2" />
      <g transform="translate(340,558)">
        <text textAnchor="middle" fontSize="16" fontWeight="900" fill={theme.textMain} fontFamily={theme.font}>2025</text>
        <text textAnchor="middle" y="12" fontSize="9.5" fill={theme.textMain} fontWeight="bold">NCC C Certificate</text>
        <text textAnchor="middle" y="23" fontSize="8" fill={theme.textMuted} fontWeight="bold">Captain Station</text>
      </g>

      {/* Platform End Line */}
      <g transform="translate(420,300)">
        <line x1="-12" y1="-8" x2="-12" y2="8" stroke="#2e6bc7" strokeWidth="3" />
        <circle cx="0" cy="0" r="4" fill="#2e6bc7" />
        <text x="0" y="18" textAnchor="middle" fontSize="7" fill={theme.stroke} fontWeight="bold">TRACK</text>
      </g>
    </svg>
  );
};

/* ═══════════════════════════════════════════
   CONCEPT E — ANCIENT (Medieval Scroll)
═══════════════════════════════════════════ */
const AncientLeft = () => {
  const theme = THEME.E;
  return (
    <svg width="100%" height="100%" viewBox="0 0 460 620" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
      <defs>
        <radialGradient id="ancient-radial" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#f5eac2"/>
          <stop offset="100%" stopColor="#d5b974"/>
        </radialGradient>
      </defs>

      <rect width="460" height="620" fill="url(#ancient-radial)"/>
      <rect x="15" y="15" width="430" height="590" fill="none" stroke={theme.stroke} strokeWidth="2" strokeDasharray="3 3"/>
      <rect x="22" y="22" width="416" height="576" fill="none" stroke="rgba(92,56,21,0.25)" strokeWidth="0.8"/>

      {/* Medieval Corner Ornaments */}
      {[[22,22],[438,22],[22,598],[438,598]].map(([cx,cy],i) => (
        <text key={i} x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill={theme.stroke}>✦</text>
      ))}

      {/* 1. SEAMLESS WINDING PARCHMENT PATH */}
      <path d="M 80,500 C 130,400 150,220 200,150 C 250,80 300,350 360,420 C 400,460 430,300 460,240"
        fill="none" stroke={theme.stroke} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M 80,500 C 130,400 150,220 200,150 C 250,80 300,350 360,420 C 400,460 430,300 460,240"
        fill="none" stroke={theme.strokeSecondary} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 4"/>

      {/* ═════════ MILESTONE 0: 2015 ═════════ */}
      <g transform="translate(80,500)">
        <path id="anc-arc-0" d="M -30,0 A 30,30 0 1,1 30,0" fill="none" />
        <text fontSize="8" fontWeight="bold" fill={theme.stroke} letterSpacing="1.2" fontFamily={theme.font} fontStyle="italic">
          <textPath href="#anc-arc-0" startOffset="50%" textAnchor="middle">INITIUM</textPath>
        </text>
        <circle r="22" fill="#faf1d2" stroke={theme.stroke} strokeWidth="3.2" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }}/>
        <DrawAnchor color={theme.stroke} />
      </g>
      {/* Decorative pointer line */}
      <line x1="80" y1="526" x2="80" y2="560" stroke={theme.stroke} strokeWidth="1.2" strokeDasharray="2 4"/>
      <circle cx="80" cy="560" r="2.5" fill={theme.stroke} />
      <g transform="translate(80,578)">
        <text textAnchor="middle" fontSize="15" fontWeight="bold" fill={theme.textMain} fontFamily={theme.font}>MMXV</text>
        <text textAnchor="middle" y="12" fontSize="9.5" fill={theme.textMuted} fontStyle="italic">Depart Anno Domini</text>
      </g>

      {/* ═════════ MILESTONE 1: 2019 ═════════ */}
      <g transform="translate(200,150)">
        <path id="anc-arc-1" d="M -30,0 A 30,30 0 1,1 30,0" fill="none" />
        <text fontSize="8" fontWeight="bold" fill={theme.stroke} letterSpacing="1.2" fontFamily={theme.font} fontStyle="italic">
          <textPath href="#anc-arc-1" startOffset="50%" textAnchor="middle">SCHOLA</textPath>
        </text>
        <circle r="22" fill="#faf1d2" stroke={theme.stroke} strokeWidth="3.2" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }}/>
        <DrawSchool color={theme.stroke} />
      </g>
      <line x1="200" y1="124" x2="200" y2="85" stroke={theme.stroke} strokeWidth="1.2" strokeDasharray="2 4"/>
      <circle cx="200" cy="85" r="2.5" fill={theme.stroke} />
      <g transform="translate(200,52)">
        <text textAnchor="middle" fontSize="16" fontWeight="bold" fill={theme.textMain} fontFamily={theme.font}>MMXIX</text>
        <text textAnchor="middle" y="12" fontSize="10" fill={theme.textMain} fontWeight="bold">Class X · XC%</text>
        <text textAnchor="middle" y="23" fontSize="8" fill={theme.textMuted} fontStyle="italic">Schola Newtownensis</text>
      </g>

      {/* ═════════ MILESTONE 2: 2021 ═════════ */}
      <g transform="translate(360,420)">
        <path id="anc-arc-2" d="M -30,0 A 30,30 0 1,1 30,0" fill="none" />
        <text fontSize="8" fontWeight="bold" fill={theme.stroke} letterSpacing="1.2" fontFamily={theme.font} fontStyle="italic">
          <textPath href="#anc-arc-2" startOffset="50%" textAnchor="middle">HONORES</textPath>
        </text>
        <circle r="22" fill="#faf1d2" stroke={theme.stroke} strokeWidth="3.2" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }}/>
        <DrawGraduation color={theme.stroke} />
      </g>
      <line x1="360" y1="446" x2="360" y2="495" stroke={theme.stroke} strokeWidth="1.2" strokeDasharray="2 4"/>
      <circle cx="360" cy="495" r="2.5" fill={theme.stroke} />
      <g transform="translate(360,512)">
        <text textAnchor="middle" fontSize="16" fontWeight="bold" fill={theme.textMain} fontFamily={theme.font}>MMXXI</text>
        <text textAnchor="middle" y="12" fontSize="10" fill={theme.textMain} fontWeight="bold">Class XII · LXXXIII%</text>
        <text textAnchor="middle" y="23" fontSize="8" fill={theme.textMuted} fontStyle="italic">Schola Newtownensis</text>
      </g>
    </svg>
  );
};

const AncientRight = () => {
  const theme = THEME.E;
  return (
    <svg width="100%" height="100%" viewBox="0 0 460 620" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
      <rect width="460" height="620" fill="url(#ancient-radial)"/>
      <rect x="15" y="15" width="430" height="590" fill="none" stroke={theme.stroke} strokeWidth="2" strokeDasharray="3 3"/>
      <rect x="22" y="22" width="416" height="576" fill="none" stroke="rgba(92,56,21,0.25)" strokeWidth="0.8"/>

      {/* Corner Ornaments */}
      {[[22,22],[438,22],[22,598],[438,598]].map(([cx,cy],i) => (
        <text key={i} x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill={theme.stroke}>✦</text>
      ))}

      {/* 1. SEAMLESS WINDING PARCHMENT PATH */}
      <path d="M 0,240 C 40,180 120,80 180,120 C 240,160 300,400 340,480 C 380,560 400,380 420,300"
        fill="none" stroke={theme.stroke} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M 0,240 C 40,180 120,80 180,120 C 240,160 300,400 340,480 C 380,560 400,380 420,300"
        fill="none" stroke={theme.strokeSecondary} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 4"/>

      {/* ═════════ MILESTONE 3: 2025 B.TECH ═════════ */}
      <g transform="translate(180,120)">
        <path id="anc-arc-3" d="M -30,0 A 30,30 0 1,1 30,0" fill="none" />
        <text fontSize="8" fontWeight="bold" fill={theme.stroke} letterSpacing="1.2" fontFamily={theme.font} fontStyle="italic">
          <textPath href="#anc-arc-3" startOffset="50%" textAnchor="middle">ACADEMIA</textPath>
        </text>
        <circle r="22" fill="#faf1d2" stroke={theme.stroke} strokeWidth="3.2" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }}/>
        <DrawGraduation color={theme.stroke} />
      </g>
      {/* Leader & Direct Text */}
      <line x1="180" y1="94" x2="180" y2="55" stroke={theme.stroke} strokeWidth="1.2" strokeDasharray="2 4"/>
      <circle cx="180" cy="55" r="2.5" fill={theme.stroke} />
      <g transform="translate(180,24)">
        <text textAnchor="middle" fontSize="16" fontWeight="bold" fill={theme.textMain} fontFamily={theme.font}>MMXXV</text>
        <text textAnchor="middle" y="12" fontSize="10" fill={theme.textMain} fontWeight="bold">B.Tech CSE (AIML)</text>
        <text textAnchor="middle" y="23" fontSize="8" fill={theme.textMuted} fontStyle="italic">Universitas UEM Kolkatensis</text>
      </g>

      {/* ═════════ MILESTONE 4: 2025 NCC ═════════ */}
      <g transform="translate(340,480)">
        <path id="anc-arc-4" d="M -30,0 A 30,30 0 1,1 30,0" fill="none" />
        <text fontSize="8" fontWeight="bold" fill={theme.stroke} letterSpacing="1.2" fontFamily={theme.font} fontStyle="italic">
          <textPath href="#anc-arc-4" startOffset="50%" textAnchor="middle">CAPITANEUS</textPath>
        </text>
        <circle r="22" fill="#faf1d2" stroke={theme.stroke} strokeWidth="3.2" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }}/>
        <DrawAnchor color={theme.stroke} />
      </g>
      {/* Leader & Direct Text */}
      <line x1="340" y1="506" x2="340" y2="540" stroke={theme.stroke} strokeWidth="1.2" strokeDasharray="2 4"/>
      <circle cx="340" cy="540" r="2.5" fill={theme.stroke} />
      <g transform="translate(340,558)">
        <text textAnchor="middle" fontSize="16" fontWeight="bold" fill={theme.textMain} fontFamily={theme.font}>MMXXV</text>
        <text textAnchor="middle" y="12" fontSize="9.5" fill={theme.textMain} fontWeight="bold">NCC C Certificate</text>
        <text textAnchor="middle" y="23" fontSize="8" fill={theme.textMuted} fontStyle="italic">Naval Wing · Captain</text>
      </g>

      {/* Decorative Wax Seal Present */}
      <g transform="translate(420,300)">
        <circle r="12" fill="#a93226" style={{ filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.25))' }} />
        <circle r="8" fill="none" stroke="#78281f" strokeWidth="1" />
        <text y="2.5" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">REX</text>
        <text x="0" y="21" textAnchor="middle" fontSize="7" fill={theme.stroke} fontWeight="bold">SIGILLUM</text>
      </g>
    </svg>
  );
};

/* ═══════════════════════════════════════════
   CONCEPT RENDERING MAPS
═══════════════════════════════════════════ */
const LEFT_MAP  = { A: NauticalLeft,  B: CelestialLeft,  C: ExplorerLeft,  D: MetroLeft,  E: AncientLeft  };
const RIGHT_MAP = { A: NauticalRight, B: CelestialRight, C: ExplorerRight, D: MetroRight, E: AncientRight };

/* ═══════════════════════════════════════════
   JourneyLeft — left page
═══════════════════════════════════════════ */
export const JourneyLeft = ({ onPrev }) => {
  const { concept } = useJourney();
  const theme    = THEME[concept];
  const LeftComp = LEFT_MAP[concept];

  return (
    <div className="paper-page jmap-page-wrap" style={{ background: theme.pageBg, padding: 0 }}>
      <div className="jmap-fill">
        <LeftComp />
      </div>
      {onPrev && (
        <span
          className="corner-tab corner-tab-left jmap-nav-tab"
          style={{ color: theme.dark ? 'rgba(197,168,128,0.8)' : undefined }}
          onClick={onPrev}
        >
          ← About
        </span>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════
   JourneyRight — right page
═══════════════════════════════════════════ */
export const JourneyRight = ({ onNext }) => {
  const { concept } = useJourney();
  const theme     = THEME[concept];
  const RightComp = RIGHT_MAP[concept];

  return (
    <div className="paper-page jmap-page-wrap" style={{ background: theme.pageBg, padding: 0 }}>
      <div className="jmap-fill">
        <RightComp />
      </div>
      {onNext && (
        <span
          className="corner-tab corner-tab-right jmap-nav-tab"
          style={{ color: theme.dark ? 'rgba(197,168,128,0.8)' : undefined }}
          onClick={onNext}
        >
          Work →
        </span>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════
   JourneyConceptSelector — fixed overlay
   Rendered in App.jsx when currentPage === 2
═══════════════════════════════════════════ */
export const JourneyConceptSelector = () => {
  const { concept, setConcept } = useJourney();
  const theme = THEME[concept];

  return (
    <div style={{
      position: 'fixed',
      top: '72px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 200,
      pointerEvents: 'auto',
    }}>
      <div
        className={`jmap-selector ${theme.dark ? 'jmap-selector-dark' : ''}`}
        style={{ position: 'static', transform: 'none' }}
      >
        {CONCEPTS.map(c => (
          <button
            key={c.key}
            className={`jmap-btn${concept === c.key ? ' jmap-btn-active' : ''}`}
            style={concept === c.key
              ? { background: theme.btnActive, color: theme.btnActiveTxt, borderColor: theme.btnActive }
              : {}}
            onClick={() => setConcept(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
};

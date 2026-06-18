import { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

/* ─────────────────────────────────────────
   Milestones — positions match 2D SVG map
───────────────────────────────────────── */
const MILESTONES = [
  { year: '2015', title: 'Journey Begins',     sub: 'The adventure starts',       pos: new THREE.Vector3(-3.57, -0.45, 0) },
  { year: '2019', title: 'Class X',            sub: 'Newtown School · 90%',      pos: new THREE.Vector3(-0.77,  0.47, 0) },
  { year: '2021', title: 'Class XII',          sub: 'Newtown School · 83%',      pos: new THREE.Vector3( 1.13,  0.00, 0) },
  { year: '2025', title: 'B.Tech CSE (AIML)', sub: 'UEM Kolkata · Graduated',    pos: new THREE.Vector3( 2.57, -0.96, 0) },
  { year: '2025', title: 'NCC C Certificate', sub: 'Naval Wing · Captain',       pos: new THREE.Vector3( 3.81,  0.39, 0) },
];

const matGold  = { color: '#c9952e', metalness: 0.92, roughness: 0.18 };
const matBrass = { color: '#b8863a', metalness: 0.85, roughness: 0.28 };
const matBlack = { color: '#0d0d0d', metalness: 0.15, roughness: 0.55 };
const matStone = { color: '#d6cbb8', metalness: 0.04, roughness: 0.82 };
const matSlate = { color: '#3a3d4a', metalness: 0.08, roughness: 0.72 };
const matIvory = { color: '#f4edd8', metalness: 0.02, roughness: 0.88 };

/* ─────────────────────────────────────────
   Model 0 — Ornate Brass Astrolabe
───────────────────────────────────────── */
function AstrolabeModel({ scale = 1 }) {
  const outerRingRef = useRef();
  const innerRingRef = useRef();
  const globeRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (outerRingRef.current) outerRingRef.current.rotation.z =  t * 0.30;
    if (innerRingRef.current) innerRingRef.current.rotation.x =  t * 0.45;
    if (globeRef.current)     globeRef.current.rotation.y     =  t * 0.60;
  });
  return (
    <group scale={[scale, scale, scale]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.30, 0.046, 8]} />
        <meshStandardMaterial {...matBrass} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.028]}>
        <cylinderGeometry args={[0.22, 0.24, 0.018, 32]} />
        <meshStandardMaterial {...matGold} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.040]}>
        <cylinderGeometry args={[0.21, 0.21, 0.008, 32]} />
        <meshStandardMaterial color="#0a1428" roughness={0.75} metalness={0.08} />
      </mesh>
      <mesh ref={outerRingRef} position={[0, 0, 0.075]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.23, 0.016, 16, 64]} />
        <meshStandardMaterial {...matGold} />
      </mesh>
      <mesh ref={innerRingRef} position={[0, 0, 0.075]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.17, 0.011, 14, 56]} />
        <meshStandardMaterial color="#e8c060" metalness={0.88} roughness={0.20} />
      </mesh>
      <mesh ref={globeRef} position={[0, 0, 0.075]}>
        <sphereGeometry args={[0.095, 32, 32]} />
        <meshStandardMaterial color="#1a3a5c" metalness={0.22} roughness={0.38} />
      </mesh>
      <mesh position={[0, 0, 0.075]}>
        <sphereGeometry args={[0.052, 28, 28]} />
        <meshStandardMaterial color="#ffd080" emissive="#ff9500" emissiveIntensity={1.6}
          roughness={0.05} transparent opacity={0.92} />
      </mesh>
      <pointLight position={[0, 0, 0.12]} color="#ff9500" intensity={1.2} distance={1.4} />
      {[0, 1, 2, 3].map(i => (
        <mesh key={i} position={[0, 0, 0.075]} rotation={[Math.PI / 2, 0, i * Math.PI / 4]}>
          <boxGeometry args={[0.38, 0.009, 0.007]} />
          <meshStandardMaterial {...matBrass} />
        </mesh>
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────
   Model 1 — Neo-Classical University Building
───────────────────────────────────────── */
function UniversityBuilding({ scale = 1 }) {
  return (
    <group scale={[scale, scale, scale]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.014]}>
        <boxGeometry args={[0.54, 0.024, 0.40]} />
        <meshStandardMaterial {...matStone} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[-0.17, 0, 0.085]}>
        <boxGeometry args={[0.16, 0.12, 0.22]} />
        <meshStandardMaterial color="#cfc3aa" roughness={0.80} metalness={0.04} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0.17, 0, 0.085]}>
        <boxGeometry args={[0.16, 0.12, 0.22]} />
        <meshStandardMaterial color="#cfc3aa" roughness={0.80} metalness={0.04} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.115]}>
        <boxGeometry args={[0.24, 0.20, 0.28]} />
        <meshStandardMaterial color="#d8ccb5" roughness={0.78} metalness={0.04} />
      </mesh>
      <mesh position={[-0.17, -0.001, 0.205]}>
        <coneGeometry args={[0.115, 0.075, 4]} />
        <meshStandardMaterial {...matSlate} />
      </mesh>
      <mesh position={[0.17, -0.001, 0.205]}>
        <coneGeometry args={[0.115, 0.075, 4]} />
        <meshStandardMaterial {...matSlate} />
      </mesh>
      <mesh position={[0, -0.001, 0.262]}>
        <coneGeometry args={[0.145, 0.068, 4]} />
        <meshStandardMaterial color="#e8e0cc" roughness={0.70} metalness={0.04} />
      </mesh>
      {[-0.088, -0.052, -0.018, 0.018, 0.052, 0.088].map((x, i) => (
        <mesh key={i} position={[x, -0.14, 0.118]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.0115, 0.013, 0.210, 16]} />
          <meshStandardMaterial color="#ede7d8" roughness={0.65} metalness={0.04} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.14, 0.028]}>
        <boxGeometry args={[0.24, 0.020, 0.06]} />
        <meshStandardMaterial color="#e4dcc8" roughness={0.75} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.14, 0.228]}>
        <boxGeometry args={[0.25, 0.018, 0.04]} />
        <meshStandardMaterial color="#e4dcc8" roughness={0.75} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.145, 0.068]}>
        <boxGeometry args={[0.060, 0.090, 0.008]} />
        <meshStandardMaterial color="#2c2018" roughness={0.82} />
      </mesh>
      {[-0.17, 0.17].map((wx, wi) => (
        <group key={wi}>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[wx, -0.12, 0.092]}>
            <boxGeometry args={[0.046, 0.056, 0.006]} />
            <meshStandardMaterial color="#1e2a3a" roughness={0.30} metalness={0.25} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[wx, -0.12, 0.093]}>
            <boxGeometry args={[0.052, 0.062, 0.003]} />
            <meshStandardMaterial color="#d0c4a8" roughness={0.80} />
          </mesh>
        </group>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.295]}>
        <boxGeometry args={[0.092, 0.175, 0.092]} />
        <meshStandardMaterial color="#ddd4bc" roughness={0.76} metalness={0.04} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.400]}>
        <coneGeometry args={[0.066, 0.092, 16]} />
        <meshStandardMaterial {...matGold} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.465]}>
        <sphereGeometry args={[0.014, 16, 16]} />
        <meshStandardMaterial color="#ffe070" emissive="#ffb800" emissiveIntensity={0.6}
          metalness={0.92} roughness={0.12} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────
   Model 2 — Ornate Wrought-Iron School Gate
───────────────────────────────────────── */
function SchoolGate({ scale = 1 }) {
  const l1 = useRef(); const l2 = useRef();
  useFrame(({ clock }) => {
    const g = 0.75 + Math.sin(clock.getElapsedTime() * 2.4) * 0.25;
    [l1, l2].forEach(r => { if (r.current) r.current.material.emissiveIntensity = g; });
  });
  const BAR = { color: '#1e2830', metalness: 0.88, roughness: 0.24 };
  const CAP = { color: '#c9952e', metalness: 0.90, roughness: 0.18 };
  return (
    <group scale={[scale, scale, scale]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.012]}>
        <boxGeometry args={[0.58, 0.020, 0.24]} />
        <meshStandardMaterial {...matStone} />
      </mesh>
      {[-0.22, 0.22].map((x, si) => (
        <group key={si}>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[x, 0, 0.175]}>
            <cylinderGeometry args={[0.056, 0.068, 0.330, 16]} />
            <meshStandardMaterial {...matStone} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[x, 0, 0.346]}>
            <cylinderGeometry args={[0.074, 0.074, 0.022, 16]} />
            <meshStandardMaterial {...CAP} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[x, 0, 0.388]}>
            <cylinderGeometry args={[0.018, 0.022, 0.048, 14]} />
            <meshStandardMaterial color="#8a7a5a" metalness={0.72} roughness={0.30} />
          </mesh>
          <mesh ref={si === 0 ? l1 : l2} position={[x, 0, 0.432]}>
            <sphereGeometry args={[0.040, 24, 24]} />
            <meshStandardMaterial color="#fff8e0" emissive="#ffcc44" emissiveIntensity={1.0}
              roughness={0.18} transparent opacity={0.90} />
          </mesh>
          <pointLight position={[x, 0, 0.47]} color="#ffcc44" intensity={0.7} distance={1.0} />
        </group>
      ))}
      {[-0.140, -0.092, -0.044, 0.000, 0.044, 0.092, 0.140].map((x, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[x, 0, 0.160]}>
          <cylinderGeometry args={[0.010, 0.010, 0.290, 10]} />
          <meshStandardMaterial {...BAR} />
        </mesh>
      ))}
      {[-0.140, -0.092, -0.044, 0.000, 0.044, 0.092, 0.140].map((x, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[x, 0, 0.318]}>
          <coneGeometry args={[0.014, 0.030, 4]} />
          <meshStandardMaterial {...CAP} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.100]}>
        <boxGeometry args={[0.300, 0.018, 0.018]} />
        <meshStandardMaterial {...BAR} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.230]}>
        <boxGeometry args={[0.300, 0.018, 0.018]} />
        <meshStandardMaterial {...BAR} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.348]}>
        <boxGeometry args={[0.460, 0.050, 0.068]} />
        <meshStandardMaterial color="#c8bca8" roughness={0.76} metalness={0.06} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.384]}>
        <boxGeometry args={[0.448, 0.009, 0.018]} />
        <meshStandardMaterial {...CAP} />
      </mesh>
      <mesh position={[0, 0, 0.396]}>
        <sphereGeometry args={[0.032, 20, 20]} />
        <meshStandardMaterial color="#ffe070" emissive="#ffb800" emissiveIntensity={0.9}
          metalness={0.92} roughness={0.10} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────
   Model 3 — Graduation Figure
───────────────────────────────────────── */
function GraduationFigure({ scale = 1 }) {
  const capRef = useRef();
  const scrollRef = useRef();
  const BLUE = '#1e40af'; const GOLD = '#d4a82a';
  const SKIN = '#e8b896'; const HAIR = '#140a04';
  const LIGHT = '#6ea8e8';
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (capRef.current)    capRef.current.position.z    = 0.560 + Math.sin(t * 1.1) * 0.007;
    if (scrollRef.current) scrollRef.current.rotation.z = Math.sin(t * 0.8) * 0.055;
  });
  return (
    <group scale={[scale, scale, scale]}>
      {[[0.028, [0.155, 0.220, 0.050, 32]], [0.106, [0.120, 0.155, 0.110, 32]],
        [0.210, [0.098, 0.120, 0.108, 32]], [0.318, [0.082, 0.098, 0.108, 32]]].map(([z, args], i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, z]}>
          <cylinderGeometry args={args} />
          <meshStandardMaterial color={BLUE} roughness={0.60} metalness={0.08} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.010]}>
        <torusGeometry args={[0.188, 0.011, 14, 48]} />
        <meshStandardMaterial color={GOLD} metalness={0.90} roughness={0.15} />
      </mesh>
      <mesh position={[0, -0.004, 0.265]}>
        <boxGeometry args={[0.046, 0.003, 0.185]} />
        <meshStandardMaterial color={GOLD} metalness={0.78} roughness={0.22} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.373]}>
        <torusGeometry args={[0.060, 0.009, 12, 36]} />
        <meshStandardMaterial color={GOLD} metalness={0.90} roughness={0.15} />
      </mesh>
      {[-0.038, 0.038].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.20]} rotation={[0, 0, i === 0 ? 0.10 : -0.10]}>
          <boxGeometry args={[0.010, 0.002, 0.30]} />
          <meshStandardMaterial color={LIGHT} metalness={0.12} roughness={0.55} transparent opacity={0.55} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.404]}>
        <cylinderGeometry args={[0.028, 0.036, 0.048, 24]} />
        <meshStandardMaterial color={SKIN} roughness={0.78} metalness={0.0} />
      </mesh>
      <mesh position={[0, 0, 0.470]}>
        <sphereGeometry args={[0.082, 32, 32]} />
        <meshStandardMaterial color={SKIN} roughness={0.72} metalness={0.0} />
      </mesh>
      <mesh position={[0, -0.018, 0.474]} scale={[1.04, 0.82, 1.16]}>
        <sphereGeometry args={[0.090, 28, 28]} />
        <meshStandardMaterial color={HAIR} roughness={0.82} metalness={0.04} />
      </mesh>
      <mesh position={[0, 0, 0.514]} scale={[0.86, 0.75, 0.52]}>
        <sphereGeometry args={[0.088, 24, 24]} />
        <meshStandardMaterial color={HAIR} roughness={0.82} metalness={0.04} />
      </mesh>
      <mesh position={[-0.095, 0, 0.358]}>
        <sphereGeometry args={[0.034, 20, 20]} />
        <meshStandardMaterial color={BLUE} roughness={0.60} metalness={0.08} />
      </mesh>
      <mesh position={[-0.148, 0, 0.304]} rotation={[0.20, 0, 0.62]}>
        <cylinderGeometry args={[0.022, 0.027, 0.192, 16]} />
        <meshStandardMaterial color={BLUE} roughness={0.60} metalness={0.08} />
      </mesh>
      <mesh position={[-0.250, -0.002, 0.228]}>
        <sphereGeometry args={[0.027, 18, 18]} />
        <meshStandardMaterial color={SKIN} roughness={0.76} metalness={0.0} />
      </mesh>
      <group ref={scrollRef} position={[-0.292, -0.002, 0.208]}>
        <mesh rotation={[Math.PI / 3.2, 0, 0]}>
          <cylinderGeometry args={[0.021, 0.021, 0.146, 20]} />
          <meshStandardMaterial {...matIvory} />
        </mesh>
        {[-0.072, 0.072].map((yy, i) => (
          <mesh key={i} position={[0, yy * Math.cos(Math.PI / 3.2), yy * Math.sin(Math.PI / 3.2)]}
            rotation={[Math.PI / 3.2, 0, 0]}>
            <cylinderGeometry args={[0.024, 0.024, 0.006, 20]} />
            <meshStandardMaterial color={GOLD} metalness={0.90} roughness={0.15} />
          </mesh>
        ))}
        <mesh rotation={[Math.PI / 3.2, 0, 0]}>
          <torusGeometry args={[0.024, 0.007, 10, 24]} />
          <meshStandardMaterial color={BLUE} metalness={0.25} roughness={0.55} />
        </mesh>
      </group>
      <mesh position={[0.095, 0, 0.358]}>
        <sphereGeometry args={[0.034, 20, 20]} />
        <meshStandardMaterial color={BLUE} roughness={0.60} metalness={0.08} />
      </mesh>
      <mesh position={[0.148, 0, 0.322]} rotation={[-0.10, 0, -0.56]}>
        <cylinderGeometry args={[0.022, 0.027, 0.192, 16]} />
        <meshStandardMaterial color={BLUE} roughness={0.60} metalness={0.08} />
      </mesh>
      <group ref={capRef} position={[0, 0, 0.560]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.058, 0.066, 0.046, 28]} />
          <meshStandardMaterial {...matBlack} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.028]}>
          <boxGeometry args={[0.224, 0.224, 0.013]} />
          <meshStandardMaterial {...matBlack} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.029]}>
          <boxGeometry args={[0.232, 0.232, 0.005]} />
          <meshStandardMaterial color={GOLD} metalness={0.92} roughness={0.13} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.036]}>
          <cylinderGeometry args={[0.012, 0.012, 0.010, 12]} />
          <meshStandardMaterial color={GOLD} metalness={0.92} roughness={0.12} />
        </mesh>
        <mesh position={[0.056, 0.056, 0.034]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.136, 0.005, 0.004]} />
          <meshStandardMaterial color={GOLD} metalness={0.88} roughness={0.18} />
        </mesh>
        <mesh position={[0.106, 0.106, -0.006]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.0036, 0.0036, 0.108, 8]} />
          <meshStandardMaterial color={GOLD} metalness={0.88} roughness={0.18} />
        </mesh>
        <mesh position={[0.106, 0.106, -0.062]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.013, 0.034, 10]} />
          <meshStandardMaterial color={GOLD} metalness={0.88} roughness={0.20} />
        </mesh>
      </group>
    </group>
  );
}

/* ─────────────────────────────────────────
   Model 4 — Naval Anchor
───────────────────────────────────────── */
function NavalAnchor({ scale = 1 }) {
  const anchorRef = useRef();
  useFrame(({ clock }) =>
    anchorRef.current && (anchorRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.75) * 0.048)
  );
  const METAL = { color: '#2a3848', metalness: 0.92, roughness: 0.18 };
  const GOLD  = { color: '#c9952e', metalness: 0.90, roughness: 0.16 };
  const SAND  = { color: '#ddd0b0', roughness: 0.94, metalness: 0.02 };
  return (
    <group scale={[scale, scale, scale]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.014]}>
        <cylinderGeometry args={[0.295, 0.320, 0.024, 32]} />
        <meshStandardMaterial {...SAND} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.027]}>
        <torusGeometry args={[0.307, 0.008, 10, 48]} />
        <meshStandardMaterial color="#c8b890" roughness={0.88} />
      </mesh>
      <group ref={anchorRef} position={[0, 0, 0.118]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh position={[0, 0.080, 0]}>
            <cylinderGeometry args={[0.024, 0.026, 0.430, 16]} />
            <meshStandardMaterial {...METAL} />
          </mesh>
          <mesh position={[0, 0.080, 0]}>
            <torusGeometry args={[0.030, 0.008, 12, 32]} />
            <meshStandardMaterial {...GOLD} />
          </mesh>
          <mesh position={[0, 0.228, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.018, 0.022, 0.260, 14]} />
            <meshStandardMaterial {...METAL} />
          </mesh>
          {[-0.130, 0.130].map((x, i) => (
            <mesh key={i} position={[x, 0.228, 0]}>
              <sphereGeometry args={[0.030, 20, 20]} />
              <meshStandardMaterial {...GOLD} />
            </mesh>
          ))}
          <mesh position={[0, 0.325, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.042, 0.013, 10, 24]} />
            <meshStandardMaterial {...GOLD} />
          </mesh>
          <mesh position={[0.042, 0.325, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.010, 0.010, 0.034, 10]} />
            <meshStandardMaterial {...GOLD} />
          </mesh>
          <mesh position={[0, -0.100, 0]}>
            <torusGeometry args={[0.158, 0.022, 12, 32, Math.PI]} />
            <meshStandardMaterial {...METAL} />
          </mesh>
          <mesh position={[ 0.158, -0.100, 0]} rotation={[0, 0, -Math.PI / 5.5]}>
            <coneGeometry args={[0.042, 0.090, 4]} />
            <meshStandardMaterial {...METAL} />
          </mesh>
          <mesh position={[-0.158, -0.100, 0]} rotation={[0, 0, Math.PI / 5.5]}>
            <coneGeometry args={[0.042, 0.090, 4]} />
            <meshStandardMaterial {...METAL} />
          </mesh>
          {[[0, 0.175, 0.018, [0.38, 0.48, 0.30]],
            [0, 0.100, -0.016, [-0.28, 0.52, -0.22]],
            [0, 0.030, 0.016, [0.18, -0.40, 0.36]]].map(([x, y, z, rot], i) => (
            <mesh key={i} position={[x, y, z]} rotation={rot}>
              <torusGeometry args={[0.040, 0.011, 10, 20]} />
              <meshStandardMaterial {...GOLD} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

/* ─────────────────────────────────────────
   Floating bobbing wrapper
───────────────────────────────────────── */
function FloatingGroup({ position, index, children }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current)
      ref.current.position.z = position[2] + 0.10 + Math.sin(clock.getElapsedTime() * 1.4 + index * 1.1) * 0.022;
  });
  return (
    <group ref={ref} position={[position[0], position[1], position[2] + 0.10]}>
      {children}
    </group>
  );
}

/* ─────────────────────────────────────────
   Dotted path — spheres along the curve
───────────────────────────────────────── */
function DottedPath({ curve }) {
  const dots = useMemo(() => {
    const n = 52;
    return Array.from({ length: n }, (_, i) => curve.getPoint(i / (n - 1)));
  }, [curve]);
  return (
    <group>
      {dots.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, 0.018]}>
          <sphereGeometry args={[0.036, 8, 8]} />
          <meshStandardMaterial color="#5a3c1c" metalness={0.28} roughness={0.58} />
        </mesh>
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────
   MAIN SCENE
───────────────────────────────────────── */
const JourneyScene3D = () => {
  const [active, setActive] = useState(null);
  const groupRef = useRef();

  useEffect(() => { if (groupRef.current) groupRef.current.scale.set(1, 1, 0); }, []);

  useFrame((_, delta) => {
    if (groupRef.current && groupRef.current.scale.z < 0.999)
      groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, 1.0, 3.5 * delta);
  });

  const curve = useMemo(() =>
    new THREE.CatmullRomCurve3(MILESTONES.map(m => m.pos), false, 'catmullrom', 0.5)
  , []);

  return (
    <group ref={groupRef} position={[0, -0.18, 0.012]}>
      <ambientLight intensity={0.70} color="#fff8f0" />
      <directionalLight position={[3, 4, 8]} intensity={1.2} color="#fff5e8" castShadow />
      <pointLight position={[-3, 2, 5]} intensity={0.4} color="#c8e0ff" />

      {/* Dotted path connecting all milestones */}
      <DottedPath curve={curve} />

      {/* Milestone platforms + floating models */}
      {MILESTONES.map((m, i) => {
        const on = active === i;
        const sc = on ? 1.28 : 1.0;
        return (
          <group key={i}
            onClick={(e) => { e.stopPropagation(); setActive(p => p === i ? null : i); }}
            onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { document.body.style.cursor = 'auto'; }}
          >
            {/* Small gold platform pad */}
            <mesh position={[m.pos.x, m.pos.y, 0.028]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.28, 0.28, 0.048, 20]} />
              <meshStandardMaterial color="#c9952e" metalness={0.82} roughness={0.24} />
            </mesh>
            <mesh position={[m.pos.x, m.pos.y, 0.054]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.290, 0.008, 8, 36]} />
              <meshStandardMaterial color="#e8c060" metalness={0.90} roughness={0.16} />
            </mesh>

            {/* Floating 3D model */}
            <FloatingGroup position={[m.pos.x, m.pos.y, 0]} index={i}>
              {i === 0 && <AstrolabeModel    scale={sc} />}
              {i === 1 && <UniversityBuilding scale={sc} />}
              {i === 2 && <SchoolGate        scale={sc} />}
              {i === 3 && <GraduationFigure  scale={sc} />}
              {i === 4 && <NavalAnchor       scale={sc} />}
            </FloatingGroup>

            {/* Active glow ring */}
            {on && (
              <mesh position={[m.pos.x, m.pos.y, 0.055]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.34, 0.014, 8, 36]} />
                <meshBasicMaterial color="#c9952e" />
              </mesh>
            )}

            {/* Info popup on click */}
            {on && (
              <Html
                position={[m.pos.x, m.pos.y + (i < 3 ? 0.88 : -0.88), 0.50]}
                center distanceFactor={10}
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                <div style={{
                  background: 'rgba(252,248,236,0.97)',
                  border: '1.5px solid #c9952e',
                  borderRadius: '10px', padding: '10px 15px',
                  minWidth: '140px', textAlign: 'center',
                  boxShadow: '0 6px 24px rgba(180,150,80,0.28)',
                  fontFamily: 'Georgia,serif',
                }}>
                  <div style={{ color: '#c9952e', fontSize: '17px', fontWeight: '800',
                    letterSpacing: '0.04em', marginBottom: '3px' }}>{m.year}</div>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#102040',
                    marginBottom: '2px' }}>{m.title}</div>
                  <div style={{ fontSize: '9px', color: '#556688', lineHeight: 1.35,
                    fontFamily: 'system-ui,sans-serif' }}>{m.sub}</div>
                </div>
              </Html>
            )}

            {/* Year label — always visible */}
            {!on && (
              <Html
                position={[m.pos.x, m.pos.y - 0.46, 0.08]}
                center distanceFactor={12}
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                <div style={{
                  color: '#102040', fontSize: '9px', fontWeight: '700',
                  fontFamily: 'Georgia,serif', letterSpacing: '0.06em',
                  background: 'rgba(252,248,236,0.92)',
                  border: '1px solid #c9952e',
                  padding: '2px 6px', borderRadius: '4px', whiteSpace: 'nowrap',
                }}>{m.year}</div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
};

export default JourneyScene3D;

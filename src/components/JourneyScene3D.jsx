import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useJourney } from './JourneyContext';

/* ═══════════════════════════════════════════
   MILESTONES - Spanned perfectly across open book pages
   Page dimensions are: Width 4.3, Height 5.8
   Left page: X [-4.3, 0]. Right page: X [0, 4.3].
   Vertical height: Y [-2.9, 2.9].
═══════════════════════════════════════════ */
const MILESTONES = [
  {
    year: '2015', title: 'Journey Begins', sub: 'The adventure starts',
    color: '#c5a880', light: '#ffd54f',
    pos: new THREE.Vector3(-3.2, -1.6, 0.08),
  },
  {
    year: '2019', title: 'Class X', sub: 'Newtown School · 90%',
    color: '#4fc3f7', light: '#0288d1',
    pos: new THREE.Vector3(-1.8, 0.8, 0.1),
  },
  {
    year: '2021', title: 'Class XII', sub: 'Newtown School · 83%',
    color: '#ce93d8', light: '#7b1fa2',
    pos: new THREE.Vector3(-0.4, -0.6, 0.08),
  },
  {
    year: '2025', title: 'B.Tech CSE (AIML)', sub: 'UEM Kolkata · Graduated',
    color: '#81c784', light: '#2e7d32',
    pos: new THREE.Vector3(1.6, 1.2, 0.1),
  },
  {
    year: '2025', title: 'NCC C Certificate', sub: 'Naval Wing · Captain',
    color: '#80cbc4', light: '#00695c',
    pos: new THREE.Vector3(3.2, -1.2, 0.08),
  },
];

/* ═══════════════════════════════════════════
   NAUTICAL THEMED POP-UP ELEMENTS
═══════════════════════════════════════════ */
function LighthouseSpotlight({ position }) {
  const lightGroupRef = useRef();
  useFrame((state) => {
    if (!lightGroupRef.current) return;
    lightGroupRef.current.rotation.z = state.clock.getElapsedTime() * 0.8;
  });

  return (
    <group position={position}>
      {/* Tower base */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        {/* Bottom stripe red */}
        <mesh position={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.13, 0.17, 0.2, 12]} />
          <meshStandardMaterial color="#c0392b" roughness={0.4} />
        </mesh>
        {/* Mid stripe white */}
        <mesh position={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.1, 0.13, 0.2, 12]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
        {/* Top stripe red */}
        <mesh position={[0, 0, 0.5]}>
          <cylinderGeometry args={[0.07, 0.1, 0.2, 12]} />
          <meshStandardMaterial color="#c0392b" roughness={0.4} />
        </mesh>
        {/* Gallery floor */}
        <mesh position={[0, 0, 0.61]}>
          <cylinderGeometry args={[0.14, 0.14, 0.02, 12]} />
          <meshStandardMaterial color="#333333" roughness={0.6} />
        </mesh>
        {/* Lantern room */}
        <mesh position={[0, 0, 0.7]} opacity={0.6} transparent>
          <cylinderGeometry args={[0.06, 0.06, 0.16, 12]} />
          <meshStandardMaterial color="#ffd54f" transparent opacity={0.65} roughness={0.1} />
        </mesh>
        {/* Dome roof */}
        <mesh position={[0, 0, 0.81]}>
          <coneGeometry args={[0.08, 0.1, 12]} />
          <meshStandardMaterial color="#c0392b" roughness={0.4} />
        </mesh>
      </group>

      {/* Rotating light group */}
      <group ref={lightGroupRef} position={[0, 0, 0.7]}>
        <pointLight color="#fff" intensity={3.5} distance={3.5} decay={1.5} />
        {/* Light beam representation */}
        <mesh position={[0.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <coneGeometry args={[0.15, 1.0, 16]} />
          <meshStandardMaterial color="#ffd54f" transparent opacity={0.28} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
    </group>
  );
}

function Sailboat({ position }) {
  const boatRef = useRef();
  useFrame((state) => {
    if (!boatRef.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle bobbing on waves
    boatRef.current.position.z = position.z + Math.sin(t * 1.5) * 0.04;
    boatRef.current.rotation.x = Math.sin(t * 1.2) * 0.05;
    boatRef.current.rotation.y = Math.cos(t * 1.0) * 0.05;
  });

  return (
    <group ref={boatRef} position={[position.x, position.y, 0]}>
      {/* Hull */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.04]}>
        <boxGeometry args={[0.22, 0.08, 0.08]} />
        <meshStandardMaterial color="#8d6e63" roughness={0.5} />
      </mesh>
      {/* Mast */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.22]}>
        <cylinderGeometry args={[0.01, 0.01, 0.28, 6]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      {/* Main triangular sail */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0.06, 0, 0.24]}>
        <coneGeometry args={[0.08, 0.22, 4]} />
        <meshStandardMaterial color="#ffffff" side={THREE.DoubleSide} roughness={0.3} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════
   CELESTIAL THEMED POP-UP ELEMENTS
═══════════════════════════════════════════ */
function PlanetMilestone({ m, active, scale }) {
  const orbRef = useRef();
  const moonsRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (orbRef.current) orbRef.current.rotation.z = t * 0.4;
    if (moonsRef.current) moonsRef.current.rotation.z = -t * 0.6;
  });

  return (
    <group position={[m.pos.x, m.pos.y, m.pos.z]}>
      {/* Star Orb */}
      <mesh ref={orbRef} scale={[scale, scale, scale]}>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshStandardMaterial
          color={m.color}
          emissive={m.color}
          emissiveIntensity={active ? 1.6 : 0.4}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Planetary Ring */}
      <mesh rotation={[Math.PI / 3, 0.2, 0]} scale={[scale, scale, scale]}>
        <torusGeometry args={[0.42, 0.015, 8, 64]} />
        <meshStandardMaterial color={m.color} transparent opacity={0.6} emissive={m.color} emissiveIntensity={0.5} />
      </mesh>

      {/* Orbiting Moonlets */}
      <group ref={moonsRef}>
        <mesh position={[0.55, 0, 0.05]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} />
        </mesh>
        {active && (
          <mesh position={[-0.45, 0.3, -0.05]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshStandardMaterial color="#ffd54f" emissive="#ffd54f" emissiveIntensity={0.8} />
          </mesh>
        )}
      </group>
    </group>
  );
}

/* ═══════════════════════════════════════════
   EXPLORER THEMED POP-UP ELEMENTS
═══════════════════════════════════════════ */
function MountainPeak({ position, height }) {
  return (
    <group position={position}>
      {/* Mountain base cone */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, height / 2]}>
        <coneGeometry args={[0.55, height, 5]} />
        <meshStandardMaterial color="#795548" roughness={0.95} flatShading />
      </mesh>
      {/* Snowy cap */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, height - 0.08]}>
        <coneGeometry args={[0.14, 0.18, 5]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} />
      </mesh>
      {/* Flagpole at summit */}
      <group position={[0, 0, height]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.12]}>
          <cylinderGeometry args={[0.01, 0.01, 0.24, 6]} />
          <meshStandardMaterial color="#d7ccc8" />
        </mesh>
        {/* Flag */}
        <mesh position={[0.07, 0, 0.2]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.14, 0.08, 0.005]} />
          <meshStandardMaterial color="#c0392b" />
        </mesh>
      </group>
    </group>
  );
}

function PineTree({ position }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.04]}>
        <cylinderGeometry args={[0.012, 0.012, 0.08, 6]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      {/* Foliage cones */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.12]}>
        <coneGeometry args={[0.07, 0.14, 5]} />
        <meshStandardMaterial color="#2e7d32" flatShading roughness={0.9} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.2]}>
        <coneGeometry args={[0.05, 0.1, 5]} />
        <meshStandardMaterial color="#388e3c" flatShading roughness={0.9} />
      </mesh>
    </group>
  );
}

function Campfire({ position }) {
  return (
    <group position={position}>
      {/* Rock circle */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.015]}>
        <torusGeometry args={[0.08, 0.018, 6, 16]} />
        <meshStandardMaterial color="#616161" roughness={0.9} />
      </mesh>
      {/* Crossed sticks */}
      <mesh rotation={[Math.PI / 2, 0.3, Math.PI / 4]} position={[0, 0, 0.02]}>
        <boxGeometry args={[0.12, 0.02, 0.02]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>
      <mesh rotation={[Math.PI / 2, -0.3, -Math.PI / 4]} position={[0, 0, 0.02]}>
        <boxGeometry args={[0.12, 0.02, 0.02]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>
      {/* Flame cone representation */}
      <mesh position={[0, 0, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.05, 0.1, 5]} />
        <meshStandardMaterial color="#ff6f00" emissive="#ff6f00" emissiveIntensity={2.2} />
      </mesh>
      <pointLight position={[0, 0, 0.09]} color="#ff8f00" intensity={3.5} distance={1.8} />
    </group>
  );
}

/* ═══════════════════════════════════════════
   METRO THEMED POP-UP ELEMENTS
═══════════════════════════════════════════ */
function MetroStation({ position, color, scale }) {
  const cubeRef = useRef();
  useFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.z = state.clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <group position={position}>
      {/* Station Voxel Base */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.04]}>
        <cylinderGeometry args={[0.16, 0.16, 0.08, 6]} />
        <meshStandardMaterial color="#455a64" roughness={0.7} />
      </mesh>

      {/* Floating Station Node */}
      <mesh ref={cubeRef} position={[0, 0, 0.16]} scale={[scale, scale, scale]}>
        <boxGeometry args={[0.16, 0.16, 0.16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function MetroTrain({ curve }) {
  const trainRef = useRef();
  useFrame((state) => {
    if (!trainRef.current) return;
    const t = state.clock.getElapsedTime() * 0.14;
    const progress = t % 1;
    const pos = curve.getPointAt(progress);
    trainRef.current.position.copy(pos);

    // Orient train along curve direction
    const tangent = curve.getTangentAt(progress).normalize();
    const angle = Math.atan2(tangent.y, tangent.x);
    trainRef.current.rotation.z = angle;
  });

  return (
    <group ref={trainRef}>
      {/* train car */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.06]}>
        <boxGeometry args={[0.2, 0.07, 0.07]} />
        <meshStandardMaterial color="#ffd54f" emissive="#ffc107" emissiveIntensity={0.7} />
      </mesh>
      {/* small headlight */}
      <pointLight position={[0.12, 0, 0.08]} color="#ffffff" intensity={2} distance={1.5} />
    </group>
  );
}

/* ═══════════════════════════════════════════
   ANCIENT THEMED POP-UP ELEMENTS
═══════════════════════════════════════════ */
function CastleTower({ position, height }) {
  return (
    <group position={position}>
      {/* Main stone cylinder */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, height / 2]}>
        <cylinderGeometry args={[0.16, 0.2, height, 10]} />
        <meshStandardMaterial color="#90a4ae" roughness={0.9} flatShading />
      </mesh>
      {/* Crenellations top ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, height - 0.03]}>
        <cylinderGeometry args={[0.2, 0.2, 0.06, 10]} />
        <meshStandardMaterial color="#78909c" roughness={0.9} />
      </mesh>
      {/* Flag */}
      <group position={[0, 0, height]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.008, 0.008, 0.2, 6]} />
          <meshStandardMaterial color="#8d6e63" />
        </mesh>
        <mesh position={[0.06, 0, 0.16]}>
          <boxGeometry args={[0.12, 0.06, 0.005]} />
          <meshStandardMaterial color="#8e24aa" />
        </mesh>
      </group>
    </group>
  );
}

function FlyingDragon() {
  const dragonRef = useRef();
  const leftWingRef = useRef();
  const rightWingRef = useRef();

  useFrame((state) => {
    if (!dragonRef.current) return;
    const t = state.clock.getElapsedTime();
    // Circular flight path around spine
    dragonRef.current.rotation.z = t * 0.45;
    // Wing flapping
    if (leftWingRef.current) leftWingRef.current.rotation.y = Math.sin(t * 13) * 0.45;
    if (rightWingRef.current) rightWingRef.current.rotation.y = -Math.sin(t * 13) * 0.45;
  });

  return (
    <group ref={dragonRef} position={[0, 0, 0.8]}>
      {/* Offset dragon body */}
      <group position={[1.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        {/* Body */}
        <mesh>
          <boxGeometry args={[0.08, 0.24, 0.07]} />
          <meshStandardMaterial color="#c0392b" roughness={0.4} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.16, 0.03]}>
          <boxGeometry args={[0.07, 0.09, 0.07]} />
          <meshStandardMaterial color="#d32f2f" />
        </mesh>
        {/* Left Wing */}
        <group position={[-0.04, 0, 0]} ref={leftWingRef}>
          <mesh position={[-0.14, 0, 0]}>
            <boxGeometry args={[0.26, 0.06, 0.008]} />
            <meshStandardMaterial color="#990000" side={THREE.DoubleSide} />
          </mesh>
        </group>
        {/* Right Wing */}
        <group position={[0.04, 0, 0]} ref={rightWingRef}>
          <mesh position={[0.14, 0, 0]}>
            <boxGeometry args={[0.26, 0.06, 0.008]} />
            <meshStandardMaterial color="#990000" side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* ═══════════════════════════════════════════
   MAIN 3D SCENE COMPONENT
═══════════════════════════════════════════ */
const JourneyScene3D = () => {
  const { concept } = useJourney();
  const [activeIndex, setActiveIndex] = useState(null);
  const groupRef = useRef();

  // Vertical unfolding pop-up entries
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, 1.0, 3.5 * delta);
    }
  });

  // Calculate curve line connecting milestone coordinates
  const curve = useMemo(() => {
    const pts = MILESTONES.map(m => new THREE.Vector3(m.pos.x, m.pos.y, m.pos.z));
    return new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.5);
  }, []);

  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 90, 0.015, 8, false), [curve]);

  const handleSelect = (idx) => {
    setActiveIndex(prev => (prev === idx ? null : idx));
  };

  // Concept-specific constants
  const conceptDark = concept === 'B';
  const mainLineColor = 
    concept === 'A' ? '#4fc3f7' :
    concept === 'B' ? '#c5a880' :
    concept === 'C' ? '#a1887f' :
    concept === 'D' ? '#ffd54f' : '#8d6e63';

  return (
    <group ref={groupRef} position={[0, -0.2, 0.12]} scale={[1.0, 1.0, 0.0]}>
      {/* Subtle local ambient fill */}
      <ambientLight intensity={conceptDark ? 0.35 : 0.65} color={conceptDark ? '#08122c' : '#eceff1'} />
      <pointLight position={[0, 0, 4]} intensity={conceptDark ? 2.5 : 1.5} color={conceptDark ? '#ffd54f' : '#ffffff'} />

      {/* 1. Theme-Specific Backdrop / Environment */}
      {concept === 'A' && (
        // Nautical Water Grid
        <mesh position={[0, 0, 0.005]}>
          <planeGeometry args={[7.2, 5.2]} />
          <meshStandardMaterial color="#1a3d6e" transparent opacity={0.28} roughness={0.3} metalness={0.7} />
        </mesh>
      )}

      {concept === 'C' && (
        // Topographic Campfire scene
        <>
          <Campfire position={[0, -1.8, 0.02]} />
          <PineTree position={[-2.4, 0.2, 0.02]} />
          <PineTree position={[-1.2, 1.3, 0.02]} />
          <PineTree position={[1.0, 0.6, 0.02]} />
          <PineTree position={[2.4, -0.6, 0.02]} />
        </>
      )}

      {concept === 'D' && (
        // Metro grid overlay representing circuit tracks
        <gridHelper args={[6.8, 12, mainLineColor, 'rgba(255,255,255,0.06)']} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.01]} />
      )}

      {concept === 'E' && (
        // Ancient flying dragon
        <FlyingDragon />
      )}

      {/* 2. Glowing Path Connection Tube */}
      <mesh geometry={tubeGeo}>
        <meshStandardMaterial
          color={mainLineColor}
          emissive={mainLineColor}
          emissiveIntensity={conceptDark ? 1.4 : 0.7}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Animated Metro Train */}
      {concept === 'D' && <MetroTrain curve={curve} />}

      {/* 3. Render Milestones based on active theme */}
      {MILESTONES.map((m, i) => {
        const isActive = activeIndex === i;
        const scale = isActive ? 1.35 : 1.0;

        return (
          <group key={i}>
            {/* Themed pop-up model */}
            {concept === 'A' && (
              <>
                {i === 4 ? (
                  <LighthouseSpotlight position={[m.pos.x, m.pos.y, m.pos.z]} />
                ) : i === 0 ? (
                  <Sailboat position={m.pos} />
                ) : (
                  <mesh position={[m.pos.x, m.pos.y, m.pos.z]} scale={[scale, scale, scale]}
                    onClick={() => handleSelect(i)}
                    onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
                    onPointerOut={() => { document.body.style.cursor = 'auto'; }}>
                    <sphereGeometry args={[0.18, 24, 24]} />
                    <meshStandardMaterial color={m.color} emissive={m.color} emissiveIntensity={0.6} roughness={0.1} />
                  </mesh>
                )}
              </>
            )}

            {concept === 'B' && (
              <PlanetMilestone m={m} active={isActive} scale={scale} />
            )}

            {concept === 'C' && (
              <MountainPeak position={m.pos} height={i === 3 ? 1.1 : i === 1 ? 0.85 : i === 2 ? 0.6 : 0.45} />
            )}

            {concept === 'D' && (
              <MetroStation position={m.pos} color={m.color} scale={scale} />
            )}

            {concept === 'E' && (
              <CastleTower position={m.pos} height={i === 3 ? 0.95 : i === 0 ? 0.5 : 0.7} />
            )}

            {/* Standard sphere raycast target for clicks if model is not directly clickable */}
            {(concept !== 'B' && concept !== 'D') && (
              <mesh
                position={[m.pos.x, m.pos.y, m.pos.z + 0.15]}
                visible={false}
                onClick={() => handleSelect(i)}
                onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
                onPointerOut={() => { document.body.style.cursor = 'auto'; }}
              >
                <sphereGeometry args={[0.35, 12, 12]} />
              </mesh>
            )}

            {/* Glowing active outline */}
            {isActive && (
              <mesh position={[m.pos.x, m.pos.y, m.pos.z + 0.02]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.32, 0.015, 8, 32]} />
                <meshBasicMaterial color={m.color} />
              </mesh>
            )}

            {/* Milestone Text popup inside book HTML overlay */}
            {isActive && (
              <Html
                position={[m.pos.x, m.pos.y + (i % 2 === 0 ? 0.8 : -0.8), m.pos.z + 0.3]}
                center
                distanceFactor={10}
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                <div style={{
                  background: 'linear-gradient(135deg, rgba(4,8,22,0.96) 0%, rgba(12,20,50,0.96) 100%)',
                  border: `1.5px solid ${m.color}`,
                  borderRadius: '10px',
                  padding: '10px 14px',
                  minWidth: '150px',
                  boxShadow: `0 0 25px ${m.color}55, 0 10px 24px rgba(0,0,0,0.4)`,
                  color: 'white',
                  fontFamily: 'system-ui, sans-serif',
                  textAlign: 'center',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}>
                  <div style={{
                    color: m.color,
                    fontSize: '18px',
                    fontWeight: '800',
                    fontFamily: 'Georgia, serif',
                    letterSpacing: '0.04em',
                    marginBottom: '4px',
                    textShadow: `0 0 10px ${m.color}`,
                  }}>
                    {m.year}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    marginBottom: '3px',
                    color: '#fff',
                  }}>
                    {m.title}
                  </div>
                  <div style={{
                    fontSize: '9px',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: '1.3',
                  }}>
                    {m.sub}
                  </div>
                </div>
              </Html>
            )}

            {/* Floating static year label under node */}
            {!isActive && (
              <Html
                position={[m.pos.x, m.pos.y - 0.42, m.pos.z + 0.1]}
                center
                distanceFactor={12}
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                <div style={{
                  color: conceptDark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.65)',
                  fontSize: '9.5px',
                  fontWeight: '700',
                  fontFamily: 'monospace',
                  letterSpacing: '0.06em',
                  background: conceptDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.45)',
                  padding: '2px 5px',
                  borderRadius: '4px',
                  whiteSpace: 'nowrap',
                }}>
                  {m.year}
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
};

export default JourneyScene3D;

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { AboutPage, SkillsPage, WorkPage, FunFactsPage, ContactPage } from './BookPages';
import { JourneyLeft, JourneyRight } from './JourneyMap';
import JourneyScene3D from './JourneyScene3D';
import kunikaPhoto from '../assets/kunika.jpg';

// Hinge dimensions
const PAGE_WIDTH = 4.3;
const PAGE_HEIGHT = 5.8;
const COVER_WIDTH = 4.45;
const COVER_HEIGHT = 6.0;

// Individual Sheet component
const BookSheet3D = ({ 
  index, 
  currentPage, 
  handlePageTurn,
  isCover = false,
  frontContent, 
  backContent,
  zOffset = 0
}) => {
  const groupRef = useRef();
  const frontWrapperRef = useRef();
  const backWrapperRef = useRef();

  const groupWorldPos = useRef(new THREE.Vector3()).current;
  const groupWorldQuat = useRef(new THREE.Quaternion()).current;
  const toCamera = useRef(new THREE.Vector3()).current;
  const frontNormal = useRef(new THREE.Vector3()).current;

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Determine target rotation based on whether current page has flipped past this sheet
    const targetRotY = currentPage >= index ? -Math.PI : 0;
    
    // Smoothly interpolate rotation
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y, 
      targetRotY, 
      6.5 * delta
    );

    // Calculate if the front face is facing the camera using world orientation
    const cameraPosition = state.camera.position;
    groupRef.current.getWorldPosition(groupWorldPos);
    groupRef.current.getWorldQuaternion(groupWorldQuat);
    toCamera.subVectors(cameraPosition, groupWorldPos).normalize();
    frontNormal.set(0, 0, 1).applyQuaternion(groupWorldQuat);
    const isFrontFacingCamera = frontNormal.dot(toCamera) > 0;

    // Check if the page is currently in the middle of a flip transition
    const currentRotY = groupRef.current.rotation.y;
    const isFlipping = Math.abs(currentRotY - targetRotY) > 0.01;

    // Front content is visible if it's facing the camera AND (it is the outer cover OR active page-side OR actively flipping)
    const isFrontCover = index === 1;
    const showFront = isFrontFacingCamera && (isFrontCover || currentPage === index - 1 || isFlipping);

    // Back content is visible if the back face is facing the camera AND (it is the outer cover OR active page-side OR actively flipping)
    const isBackCover = index === 5;
    const showBack = !isFrontFacingCamera && (isBackCover || currentPage === index || isFlipping);

    if (frontWrapperRef.current) {
      frontWrapperRef.current.style.display = showFront ? 'block' : 'none';
      frontWrapperRef.current.style.pointerEvents = showFront ? 'auto' : 'none';
    }
    if (backWrapperRef.current) {
      backWrapperRef.current.style.display = showBack ? 'block' : 'none';
      backWrapperRef.current.style.pointerEvents = showBack ? 'auto' : 'none';
    }
  });

  const thickness = isCover ? 0.12 : 0.015;

  return (
    // Sheet Group positioned at spine hinge axis (x = 0)
    <group ref={groupRef} position={[0, 0, zOffset]}>
      {/* 3D Core Physical Geometry for Sheet */}
      {isCover ? (
        // Hardcover thick mesh
        <mesh position={[COVER_WIDTH / 2, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[COVER_WIDTH, COVER_HEIGHT, thickness]} />
          <meshStandardMaterial 
            color="#3b5ca8" 
            roughness={0.65} 
            metalness={0.15} 
          />
        </mesh>
      ) : (
        // Thin paper page mesh
        <mesh position={[PAGE_WIDTH / 2, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[PAGE_WIDTH, PAGE_HEIGHT, thickness]} />
          <meshStandardMaterial 
            color="#faf6e8" 
            roughness={0.9} 
          />
        </mesh>
      )}

      {/* Front Face HTML Component */}
      <group position={[index === 1 ? COVER_WIDTH / 2 : PAGE_WIDTH / 2, 0, thickness / 2 + 0.002]}>
        <Html 
          transform 
          pointerEvents="auto"
          scale={0.34} 
          style={{ width: index === 1 ? '524px' : '506px', height: index === 1 ? '706px' : '682px' }}
        >
          <div 
            ref={frontWrapperRef}
            style={{ width: '100%', height: '100%' }}
          >
            {frontContent}
          </div>
        </Html>
      </group>

      {/* Back Face HTML Component (Rotated Y by 180 degrees) */}
      <group 
        position={[index === 5 ? COVER_WIDTH / 2 : PAGE_WIDTH / 2, 0, -(thickness / 2 + 0.002)]} 
        rotation={[0, Math.PI, 0]}
      >
        <Html 
          transform 
          pointerEvents="auto"
          scale={0.34} 
          style={{ width: index === 5 ? '524px' : '506px', height: index === 5 ? '706px' : '682px' }}
        >
          <div 
            ref={backWrapperRef}
            style={{ width: '100%', height: '100%' }}
          >
            {backContent}
          </div>
        </Html>
      </group>
    </group>
  );
};

// Helper function to wrap angles to the range [-PI, PI] to prevent rapid spinning on state changes
const wrapAngle = (angle) => {
  let w = angle % (2 * Math.PI);
  if (w > Math.PI) w -= 2 * Math.PI;
  if (w < -Math.PI) w += 2 * Math.PI;
  return w;
};

const Book3D = ({ isOpen, currentPage, setCurrentPage }) => {
  const bookGroupRef = useRef();
  const spineRef = useRef();

  const targetRotY = useRef(0);
  const targetRotXState = useRef(0.08);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const startRotY = useRef(0);
  const startRotX = useRef(0.08);

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (
        e.target.closest('button') || 
        e.target.closest('input') || 
        e.target.closest('a') || 
        e.target.closest('.corner-tab')
      ) return;
      
      isDragging.current = true;
      startX.current = e.clientX;
      startY.current = e.clientY;
      startRotY.current = targetRotY.current;
      startRotX.current = targetRotXState.current;
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      
      const deltaX = e.clientX - startX.current;
      const deltaY = e.clientY - startY.current;
      
      const sensitivityX = 0.005;
      const sensitivityY = 0.005;
      
      targetRotY.current = startRotY.current + deltaX * sensitivityX;
      targetRotXState.current = startRotX.current + deltaY * sensitivityY;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleTouchStart = (e) => {
      if (
        e.target.closest('button') || 
        e.target.closest('input') || 
        e.target.closest('a') || 
        e.target.closest('.corner-tab')
      ) return;
      
      isDragging.current = true;
      startX.current = e.touches[0].clientX;
      startY.current = e.touches[0].clientY;
      startRotY.current = targetRotY.current;
      startRotX.current = targetRotXState.current;
    };

    const handleTouchMove = (e) => {
      if (!isDragging.current) return;
      const deltaX = e.touches[0].clientX - startX.current;
      const deltaY = e.touches[0].clientY - startY.current;
      
      const sensitivityX = 0.007;
      const sensitivityY = 0.007;
      
      targetRotY.current = startRotY.current + deltaX * sensitivityX;
      targetRotXState.current = startRotX.current + deltaY * sensitivityY;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  // Wrap current rotations and reset targets to default center view when the book opens or page changes
  useEffect(() => {
    if (isOpen) {
      if (bookGroupRef.current) {
        bookGroupRef.current.rotation.y = wrapAngle(bookGroupRef.current.rotation.y);
        bookGroupRef.current.rotation.x = wrapAngle(bookGroupRef.current.rotation.x);
      }
      targetRotY.current = 0;
      targetRotXState.current = currentPage === 2 ? 0.45 : 0.18; // Reset to page-specific tilt (Journey tilted more forward!)
    }
  }, [isOpen, currentPage]);

  useFrame((state, delta) => {
    if (!bookGroupRef.current) return;

    // Define target position, rotation, and scale based on whether the book is open
    const targetX = isOpen ? 0 : -2.4;
    const targetY = isOpen ? -0.8 : 0.2;
    const targetZ = isOpen ? 1.2 : 0;
    
    const targetScale = isOpen ? 2.04 : 2.0;

    // Smoothly lerp position
    bookGroupRef.current.position.x = THREE.MathUtils.lerp(bookGroupRef.current.position.x, targetX, 5 * delta);
    bookGroupRef.current.position.y = THREE.MathUtils.lerp(bookGroupRef.current.position.y, targetY, 5 * delta);
    bookGroupRef.current.position.z = THREE.MathUtils.lerp(bookGroupRef.current.position.z, targetZ, 5 * delta);

    // Smoothly lerp scale
    const s = THREE.MathUtils.lerp(bookGroupRef.current.scale.x, targetScale, 5 * delta);
    bookGroupRef.current.scale.set(s, s, s);

    // Adjust limits based on page: Journey page allows wider, deeper tilting to inspect the 3D popups!
    const isJourneyPage = currentPage === 2;
    const LIMIT_Y = isJourneyPage ? 82 * Math.PI / 180 : 60 * Math.PI / 180; // 82 deg vs 60 deg
    const DEFAULT_ROT_X = isOpen ? (isJourneyPage ? 0.45 : 0.18) : 0.08; 
    const LIMIT_X = isJourneyPage ? 38 * Math.PI / 180 : 10 * Math.PI / 180; // 38 deg vs 10 deg

    let visibleRotX = targetRotXState.current;
    let visibleRotY = targetRotY.current;

    if (isOpen) {
      // OPEN BOOK: Apply limits and spring back to bounds
      
      // Y-axis spring limits
      if (!isDragging.current) {
        if (targetRotY.current > LIMIT_Y) {
          targetRotY.current = THREE.MathUtils.lerp(targetRotY.current, LIMIT_Y, 10 * delta);
        } else if (targetRotY.current < -LIMIT_Y) {
          targetRotY.current = THREE.MathUtils.lerp(targetRotY.current, -LIMIT_Y, 10 * delta);
        }
      }

      if (targetRotY.current > LIMIT_Y) {
        visibleRotY = LIMIT_Y + (targetRotY.current - LIMIT_Y) * 0.15;
      } else if (targetRotY.current < -LIMIT_Y) {
        visibleRotY = -LIMIT_Y + (targetRotY.current + LIMIT_Y) * 0.15;
      }

      // X-axis (vertical tilt) spring limits
      const maxRotX = DEFAULT_ROT_X + LIMIT_X;
      const minRotX = DEFAULT_ROT_X - LIMIT_X;

      if (!isDragging.current) {
        if (targetRotXState.current > maxRotX) {
          targetRotXState.current = THREE.MathUtils.lerp(targetRotXState.current, maxRotX, 10 * delta);
        } else if (targetRotXState.current < minRotX) {
          targetRotXState.current = THREE.MathUtils.lerp(targetRotXState.current, minRotX, 10 * delta);
        }
      }

      if (targetRotXState.current > maxRotX) {
        visibleRotX = maxRotX + (targetRotXState.current - maxRotX) * 0.15;
      } else if (targetRotXState.current < minRotX) {
        visibleRotX = minRotX + (targetRotXState.current - minRotX) * 0.15;
      }
    } else {
      // CLOSED BOOK: Allow full free rotation (direct tracking Y & X with no constraints)
      visibleRotX = targetRotXState.current;
      visibleRotY = targetRotY.current;
    }

    // Smoothly interpolate Y and X rotations
    bookGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      bookGroupRef.current.rotation.x, 
      visibleRotX, 
      8 * delta
    );
    bookGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      bookGroupRef.current.rotation.y, 
      visibleRotY, 
      8 * delta
    );

    // Smoothly lerp spine Z position back when open to sit behind pages on all sheets
    const targetSpineZ = isOpen ? -0.15 - currentPage * 0.1 : 0;
    if (spineRef.current) {
      spineRef.current.position.z = THREE.MathUtils.lerp(spineRef.current.position.z, targetSpineZ, 5 * delta);
    }
  });

  const handlePageTurn = (dir, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (dir === 'next' && currentPage < 5) {
      setCurrentPage(currentPage + 1);
    } else if (dir === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleBookClick = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (currentPage === 0) {
      goToPage(1);
    }
  };

  return (
    // Entire book model centered around spine Y-axis
    <group 
      ref={bookGroupRef} 
      position={[-2.4, 0.2, 0]} 
      rotation={[0.08, 0, 0]} 
      scale={[2, 2, 2]} 
      onClick={handleBookClick}
    >
      {/* 3D Center Spine cylinders */}
      <mesh ref={spineRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, COVER_HEIGHT + 0.02, 16]} />
        <meshStandardMaterial 
          color="#3b5ca8" 
          roughness={0.7} 
          metalness={0.2} 
        />
      </mesh>

      {/* Dynamic stack of 5 sheets */}
      
      {/* ================= SHEET 1: FRONT COVER / INSIDE LEFT ================= */}
      <BookSheet3D
        index={1}
        currentPage={currentPage}
        handlePageTurn={handlePageTurn}
        isCover={true}
        zOffset={0.20}
        frontContent={
          <div 
            className="page-side page-front cover-front" 
            style={{ width: '524px', height: '706px', margin: 0, cursor: 'pointer' }}
            onClick={() => goToPage(1)}
          >
            {/* Elegant Double Gold Border */}
            <div className="cover-border-outer">
              <div className="cover-border-inner"></div>
            </div>

            {/* Glowing Turtle Cover Art */}
            <div className="cover-fairy" style={{ width: '80px', height: '80px', top: 'auto', bottom: '150px', right: '80px' }}>
              <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="rotate(-12, 60, 60)">
                  {/* Background Back Flipper */}
                  <path 
                    d="M 41 66 C 37 73, 33 80, 28 83 C 26 84, 23 83, 24 79 C 26 73, 31 69, 36 66" 
                    stroke="white" 
                    strokeWidth="1.2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    opacity="0.4" 
                  />

                  {/* Background Front Flipper */}
                  <path 
                    d="M 78 64 C 81 72, 82 80, 78 85 C 75 88, 72 88, 71 83 C 70 76, 72 70, 75 65" 
                    stroke="white" 
                    strokeWidth="1.2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    opacity="0.4" 
                  />

                  {/* Tail */}
                  <path 
                    d="M 35 66 Q 28 67, 24 69 C 25 71, 28 71, 33 68" 
                    stroke="white" 
                    strokeWidth="1.8" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />

                  {/* Belly line */}
                  <path 
                    d="M 42 67 C 48 70, 70 70, 76 67" 
                    stroke="white" 
                    strokeWidth="1.6" 
                    strokeLinecap="round" 
                    opacity="0.8" 
                  />

                  {/* Head and Neck (Sleek and cute) */}
                  <path 
                    d="M 78 57 C 84 56, 88 50, 93 50 C 98 50, 102 52, 102 56 C 102 59, 99 61, 95 61 C 88 61, 83 65, 80 70" 
                    stroke="white" 
                    strokeWidth="2.0" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />

                  {/* Smile */}
                  <path 
                    d="M 97 57 C 98 59, 100 59, 101 57" 
                    stroke="white" 
                    strokeWidth="1.2" 
                    strokeLinecap="round" 
                  />

                  {/* Chibi Shiny Eye */}
                  <circle cx="95" cy="54" r="2.5" stroke="white" strokeWidth="1.2" fill="none" />
                  <circle cx="94.2" cy="53.2" r="0.8" fill="white" />
                  <circle cx="95.8" cy="54.8" r="0.4" fill="white" />

                  {/* Foreground Back Flipper */}
                  <path 
                    d="M 45 68 C 42 76, 37 84, 32 87 C 29 89, 26 87, 27 82 C 29 76, 35 71, 40 68" 
                    stroke="white" 
                    strokeWidth="2.0" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />

                  {/* Foreground Front Flipper */}
                  <path 
                    d="M 75 66 C 78 75, 79 85, 74 91 C 71 94, 67 94, 66 89 C 65 80, 68 73, 72 67" 
                    stroke="white" 
                    strokeWidth="2.0" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />

                  {/* Shell Carapace (Outer dome) */}
                  <path 
                    d="M 35 65 C 35 42, 85 42, 85 65 Z" 
                    stroke="white" 
                    strokeWidth="2.2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    fill="rgba(255, 255, 255, 0.12)" 
                  />

                  {/* Shell Rim (Thick lip) */}
                  <path 
                    d="M 33 66 C 33 68, 87 68, 87 66 C 87 64, 33 64, 33 66 Z" 
                    stroke="white" 
                    strokeWidth="1.8" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    fill="rgba(255, 255, 255, 0.2)" 
                  />

                  {/* Constellation lines inside Shell */}
                  <path 
                    d="M 48 51 L 56 59 L 64 49 L 74 57" 
                    stroke="white" 
                    strokeWidth="0.8" 
                    strokeDasharray="2,3" 
                    opacity="0.7" 
                  />

                  {/* Constellation Stars */}
                  {/* Star A (large) */}
                  <path d="M 48 48.5 L 49.2 50 L 51.5 51 L 49.2 52 L 48 53.5 L 46.8 52 L 44.5 51 L 46.8 50 Z" fill="white" opacity="0.95" />
                  {/* Star B (small) */}
                  <path d="M 56 57 L 56.8 58.2 L 58 59 L 56.8 59.8 L 56 61 L 55.2 59.8 L 54 59 L 55.2 58.2 Z" fill="white" opacity="0.9" />
                  {/* Star C (large) */}
                  <path d="M 64 46.5 L 65.2 48 L 67.5 49 L 65.2 50 L 64 51.5 L 62.8 50 L 60.5 49 L 62.8 48 Z" fill="white" opacity="0.95" />
                  {/* Star D (small) */}
                  <path d="M 74 55 L 74.8 56.2 L 76 57 L 74.8 57.8 L 74 59 L 73.2 57.8 L 72 57 L 73.2 56.2 Z" fill="white" opacity="0.9" />

                  {/* Ambient starry dots */}
                  <circle cx="44" cy="58" r="0.6" fill="white" opacity="0.5" />
                  <circle cx="58" cy="46" r="0.6" fill="white" opacity="0.5" />
                  <circle cx="68" cy="56" r="0.6" fill="white" opacity="0.5" />
                  <circle cx="78" cy="48" r="0.6" fill="white" opacity="0.5" />

                  {/* Sparkle Trail */}
                  {/* Sparkle 1 */}
                  <path d="M 25 45 L 26 47.2 L 28.2 48 L 26 48.8 L 25 51 L 24 48.8 L 21.8 48 L 24 47.2 Z" fill="white" opacity="0.8" />
                  {/* Sparkle 2 */}
                  <path d="M 18 55.5 L 18.8 57.2 L 20.5 58 L 18.8 58.8 L 18 60.5 L 17.2 58.8 L 15.5 58 L 17.2 57.2 Z" fill="white" opacity="0.6" />
                  {/* Sparkle 3 */}
                  <path d="M 29 71.5 L 29.8 73.2 L 31.5 74 L 29.8 74.8 L 29 76.5 L 28.2 74.8 L 26.5 74 L 28.2 73.2 Z" fill="white" opacity="0.7" />
                </g>
              </svg>
            </div>

            {/* Elegant Moon & Stars background behind title */}
            <div className="cover-moon">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 20C55 20 75 40 75 65C75 78 70 90 60 97C78 90 90 72 90 52C90 27 70 7 45 7C39 7 34 8 30 20Z" fill="rgba(197, 168, 128, 0.08)" stroke="var(--color-gold)" strokeWidth="1" style={{ opacity: 0.65 }}/>
                <circle cx="45" cy="40" r="1" fill="#fff" opacity="0.6" className="pulse-star" />
                <circle cx="58" cy="28" r="0.8" fill="#fff" opacity="0.4" />
                <circle cx="35" cy="60" r="1" fill="var(--color-gold)" opacity="0.5" />
              </svg>
            </div>

            <div className="cover-header">Portfolio</div>
            
            <div className="cover-title-container">
              <h1 className="cover-horizontal-title">
                <span className="horizontal-word">KUNIKA</span>
                <span className="cover-horizontal-line"></span>
                <span className="horizontal-word">PAGARIA</span>
              </h1>
              <div className="cover-subtitle">AI Assisted Developer</div>
            </div>

            {/* Stardust trail drawing */}
            <div style={{ position: 'absolute', bottom: '28%', right: '22%', width: '40%', opacity: 0.55 }}>
              <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M90 10C80 40 20 50 50 90C70 120 10 130 30 150" stroke="rgba(197,168,128,0.35)" strokeWidth="1" strokeDasharray="3 3"/>
                <circle cx="90" cy="10" r="1.5" fill="white"/>
                <circle cx="80" cy="30" r="2.5" fill="white" style={{ opacity: 0.8 }}/>
                <circle cx="60" cy="45" r="1" fill="white"/>
                <circle cx="35" cy="50" r="2" fill="white"/>
                <circle cx="25" cy="65" r="3" fill="#c5a880" style={{ filter: 'drop-shadow(0 0 4px #fff)' }}/>
                <circle cx="45" cy="80" r="1.5" fill="white"/>
                <circle cx="55" cy="95" r="2" fill="white"/>
                <circle cx="40" cy="110" r="1" fill="white"/>
                <circle cx="20" cy="122" r="2.5" fill="white"/>
                <circle cx="30" cy="140" r="1.5" fill="white"/>
              </svg>
            </div>
          </div>
        }
        backContent={
          <div className="page-side page-back" style={{ width: '506px', height: '682px', margin: 0 }}>
            <AboutPage 
              currentPage={currentPage}
              goToPage={goToPage}
              onNext={(e) => handlePageTurn('next', e)}
            />
          </div>
        }
      />

      {/* ================= SHEET 2: SKILLS / JOURNEY LEFT ================= */}
      <BookSheet3D
        index={2}
        currentPage={currentPage}
        handlePageTurn={handlePageTurn}
        zOffset={0.10}
        frontContent={
          <div className="page-side page-front" style={{ width: '506px', height: '682px', margin: 0 }}>
            <SkillsPage 
              currentPage={currentPage}
              goToPage={goToPage}
              onNext={(e) => handlePageTurn('next', e)} 
            />
          </div>
        }
        backContent={
          <div className="page-side page-back" style={{ width: '506px', height: '682px', margin: 0 }}>
            <JourneyLeft 
              onPrev={(e) => handlePageTurn('prev', e)} 
            />
          </div>
        }
      />

      {/* ================= SHEET 3: JOURNEY RIGHT / WORK ================= */}
      <BookSheet3D
        index={3}
        currentPage={currentPage}
        handlePageTurn={handlePageTurn}
        zOffset={0.0}
        frontContent={
          <div className="page-side page-front" style={{ width: '506px', height: '682px', margin: 0 }}>
            <JourneyRight 
              onNext={(e) => handlePageTurn('next', e)} 
            />
          </div>
        }
        backContent={
          <div className="page-side page-back" style={{ width: '506px', height: '682px', margin: 0 }}>
            <WorkPage 
              currentPage={currentPage}
              goToPage={goToPage}
              onPrev={(e) => handlePageTurn('prev', e)} 
            />
          </div>
        }
      />

      {/* ================= SHEET 4: FUN FACTS / CONTACT ================= */}
      <BookSheet3D
        index={4}
        currentPage={currentPage}
        handlePageTurn={handlePageTurn}
        zOffset={-0.10}
        frontContent={
          <div className="page-side page-front" style={{ width: '506px', height: '682px', margin: 0 }}>
            <FunFactsPage 
              currentPage={currentPage}
              goToPage={goToPage}
              onNext={(e) => handlePageTurn('next', e)} 
            />
          </div>
        }
        backContent={
          <div className="page-side page-back" style={{ width: '506px', height: '682px', margin: 0 }}>
            <ContactPage 
              currentPage={currentPage}
              goToPage={goToPage}
              onPrev={(e) => handlePageTurn('prev', e)} 
            />
          </div>
        }
      />

      {/* ================= SHEET 5: FINIS / BACK COVER ================= */}
      <BookSheet3D
        index={5}
        currentPage={currentPage}
        handlePageTurn={handlePageTurn}
        isCover={true}
        zOffset={-0.20}
        frontContent={
          <div className="page-side page-front" style={{ width: '506px', height: '682px', margin: 0 }}>
            <div className="paper-page" style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <div style={{ textAlign: 'center', opacity: 0.4 }}>
                <div style={{ fontSize: '2.5rem', color: 'var(--color-gold)', marginBottom: '10px' }}>❦</div>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.85rem', letterSpacing: '0.1em' }}>Finis</p>
              </div>
              {currentPage === 4 && (
                <span className="corner-tab corner-tab-right" onClick={(e) => handlePageTurn('next', e)}>
                  Close Cover &rarr;
                </span>
              )}
            </div>
          </div>
        }
        backContent={
          <div className="page-side page-back cover-back" style={{ width: '524px', height: '706px', margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '60px' }}>
            <div style={{ width: '80%', opacity: 0.6 }}>
              <svg className="cover-line-art" viewBox="0 0 400 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M 10,75 C 30,75 35,50 45,50 C 50,50 55,60 55,68 C 55,80 35,85 35,95 C 35,105 55,108 60,95 C 63,88 65,55 70,55 C 75,55 80,75 90,75 L 110,75 C 125,75 130,55 138,55 C 142,55 145,62 145,68 C 145,78 128,82 128,92 C 128,100 145,103 150,92 C 152,85 155,58 158,58 C 162,58 165,75 180,75 L 200,75 C 205,75 208,65 210,65 C 212,65 213,70 213,78 C 213,85 205,88 205,95 C 205,102 215,104 218,95 C 220,88 221,68 223,68 C 225,68 228,75 235,75 L 250,75 C 260,75 262,68 265,68 C 270,68 273,50 278,45 C 283,40 292,40 295,45 C 298,50 295,65 292,72 C 288,80 282,88 282,92 C 282,96 295,96 320,96 C 335,96 335,80 335,75 C 335,70 338,70 340,75 C 342,80 345,96 360,96 L 390,75" 
                  stroke="white" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <circle cx="205" cy="125" r="2.5" fill="white" style={{ opacity: 0.8 }}/>
                <circle cx="100" cy="130" r="1.5" fill="white" style={{ opacity: 0.5 }}/>
              </svg>
            </div>
            <div style={{ marginTop: '20px', fontSize: '0.8rem', color: '#c5a880', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-serif)' }}>
              KUNIKA PAGARIA
            </div>
            <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: '8px', fontFamily: 'var(--font-sans)' }}>
              Designed underneath the twilight sky.
            </div>
            {currentPage === 5 && (
              <span 
                className="corner-tab corner-tab-left" 
                style={{ bottom: '25px', left: '25px' }} 
                onClick={(e) => goToPage(4)}
              >
                &larr; Reopen
              </span>
            )}
          </div>
        }
      />

      {/* ═══════ 3D JOURNEY SCENE — floats above the open pages ═══════ */}
      {currentPage === 2 && isOpen && <JourneyScene3D />}

    </group>
  );
};

export default Book3D;

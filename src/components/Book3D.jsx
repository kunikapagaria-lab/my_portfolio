import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { AboutPage, SkillsPage, WorkPage, FunFactsPage, ContactPage } from './BookPages';
import { JourneyLeft, JourneyRight, THEME } from './JourneyMap';
import JourneyScene3D from './JourneyScene3D';
import { useJourney } from './JourneyContext';
import kunikaPhoto from '../assets/kunika.jpg';
import coverArt from '../assets/cover_art.png';

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
  zOffset = 0,
  pageColor = "#faf6e8",
  passthroughPointerEvents = false
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

    // Determine target Z position: if flipped, invert the zOffset to maintain correct layering.
    // When the book is open, we scale down the zOffset for internal pages to reduce perspective parallax misalignment.
    const isOpenBook = currentPage > 0 && currentPage < 5;
    const currentZOffset = (isOpenBook && !isCover) ? zOffset * 0.15 : zOffset;
    const targetZ = currentPage >= index ? -currentZOffset : currentZOffset;
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
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
      frontWrapperRef.current.style.pointerEvents = (passthroughPointerEvents || !showFront) ? 'none' : 'auto';
    }
    if (backWrapperRef.current) {
      backWrapperRef.current.style.display = showBack ? 'block' : 'none';
      backWrapperRef.current.style.pointerEvents = (passthroughPointerEvents || !showBack) ? 'none' : 'auto';
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
        <mesh
          position={[PAGE_WIDTH / 2, 0, 0]}
          castShadow={false}
          receiveShadow={false}
        >
          <boxGeometry args={[PAGE_WIDTH, PAGE_HEIGHT, thickness]} />
          <meshStandardMaterial color={pageColor} roughness={0.9} />
        </mesh>
      )}

      {/* Front Face HTML Component */}
      <group position={[index === 1 ? COVER_WIDTH / 2 : PAGE_WIDTH / 2, 0, thickness / 2 + 0.002]}>
        <Html
          transform
          pointerEvents="none"
          className="book-page-html"
          scale={0.34}
          style={{ width: index === 1 ? '524px' : '506px', height: index === 1 ? '706px' : '682px' }}
        >
          <div
            ref={frontWrapperRef}
            style={{ width: '100%', height: '100%' }}
            className="three-page-wrapper"
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
          pointerEvents="none"
          className="book-page-html"
          scale={0.34}
          style={{ width: index === 5 ? '524px' : '506px', height: index === 5 ? '706px' : '682px' }}
        >
          <div
            ref={backWrapperRef}
            style={{ width: '100%', height: '100%' }}
            className="three-page-wrapper"
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

const Book3D = ({ isOpen, currentPage, setCurrentPage, extRotX = 0, extRotY = 0 }) => {
  const { concept, patchEdit } = useJourney();
  const journeyTheme = THEME[concept];
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
      if (patchEdit) return; // locked while patch editor is open
      if (
        e.target.closest('button') ||
        e.target.closest('input') ||
        e.target.closest('a') ||
        e.target.closest('.page-number')
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
      if (patchEdit) return; // locked while patch editor is open
      if (
        e.target.closest('button') ||
        e.target.closest('input') ||
        e.target.closest('a') ||
        e.target.closest('.page-number')
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
  }, [patchEdit]); // re-register when lock state changes so closure is fresh

  // Wrap current rotations and reset targets to default center view when the book opens or page changes
  useEffect(() => {
    if (isOpen) {
      if (bookGroupRef.current) {
        bookGroupRef.current.rotation.y = wrapAngle(bookGroupRef.current.rotation.y);
        bookGroupRef.current.rotation.x = wrapAngle(bookGroupRef.current.rotation.x);
      }
      targetRotY.current = currentPage === 2 ? 0.08 : 0;
      targetRotXState.current = currentPage === 2 ? -1.10 : 0.18;
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

    const isJourneyPage = currentPage === 2;
    const LIMIT_Y = isJourneyPage ? 82 * Math.PI / 180 : 60 * Math.PI / 180;
    const DEFAULT_ROT_X = isOpen ? (isJourneyPage ? -1.10 : 0.18) : 0.08;
    const LIMIT_X = isJourneyPage ? 38 * Math.PI / 180 : 10 * Math.PI / 180;

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
      const maxRotX = isJourneyPage ? -0.30 : DEFAULT_ROT_X + LIMIT_X;
      const minRotX = isJourneyPage ? -1.45 : DEFAULT_ROT_X - LIMIT_X;

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

    // Smoothly interpolate Y and X rotations (slider offsets applied on top)
    bookGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      bookGroupRef.current.rotation.x,
      visibleRotX + (extRotX * Math.PI / 180),
      8 * delta
    );
    bookGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      bookGroupRef.current.rotation.y,
      visibleRotY + (extRotY * Math.PI / 180),
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
            style={{ width: '524px', height: '706px', margin: 0, cursor: 'pointer', padding: 0, overflow: 'hidden', position: 'relative' }}
            onClick={() => goToPage(1)}
          >
            {/* Full-bleed cover illustration */}
            <img
              src={coverArt}
              alt="Cover Art"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
            {/* Bottom gradient + title overlay */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(35,15,25,0.82))', padding: '50px 32px 32px', textAlign: 'center' }}>
              <h1 style={{ color: '#fce8e8', fontFamily: 'Georgia,serif', fontSize: '26px', letterSpacing: '0.18em', fontWeight: 700, margin: 0 }}>KUNIKA PAGARIA</h1>
              <div style={{ color: '#e8b4c0', fontFamily: 'Georgia,serif', fontSize: '12px', letterSpacing: '0.14em', marginTop: '8px' }}>AI Assisted Developer</div>
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
        pageColor="#faf6e8"
        passthroughPointerEvents={currentPage === 2}
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
              is3D={true}
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
        pageColor="#faf6e8"
        passthroughPointerEvents={currentPage === 2}
        frontContent={
          <div className="page-side page-front" style={{ width: '506px', height: '682px', margin: 0 }}>
            <JourneyRight
              onNext={(e) => handlePageTurn('next', e)}
              is3D={true}
            />
          </div>
        }
        backContent={
          <div className="page-side page-back" style={{ width: '506px', height: '682px', margin: 0 }}>
            <WorkPage
              part={1}
              currentPage={currentPage}
              goToPage={goToPage}
              onPrev={(e) => handlePageTurn('prev', e)}
            />
          </div>
        }
      />

      {/* ================= SHEET 4: WORK PART 2 / FUN FACTS ================= */}
      <BookSheet3D
        index={4}
        currentPage={currentPage}
        handlePageTurn={handlePageTurn}
        zOffset={-0.10}
        frontContent={
          <div className="page-side page-front" style={{ width: '506px', height: '682px', margin: 0 }}>
            <WorkPage
              part={2}
              currentPage={currentPage}
              goToPage={goToPage}
              onNext={(e) => handlePageTurn('next', e)}
            />
          </div>
        }
        backContent={
          <div className="page-side page-back" style={{ width: '506px', height: '682px', margin: 0 }}>
            <FunFactsPage
              currentPage={currentPage}
              goToPage={goToPage}
              onPrev={(e) => handlePageTurn('prev', e)}
            />
          </div>
        }
      />

      {/* ================= SHEET 5: CONTACT / BACK COVER ================= */}
      <BookSheet3D
        index={5}
        currentPage={currentPage}
        handlePageTurn={handlePageTurn}
        isCover={true}
        zOffset={-0.20}
        frontContent={
          <div className="page-side page-front" style={{ width: '506px', height: '682px', margin: 0 }}>
            <ContactPage
              currentPage={currentPage}
              goToPage={goToPage}
              onNext={(e) => handlePageTurn('next', e)}
            />
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
                <circle cx="205" cy="125" r="2.5" fill="white" style={{ opacity: 0.8 }} />
                <circle cx="100" cy="130" r="1.5" fill="white" style={{ opacity: 0.5 }} />
              </svg>
            </div>
            <div style={{ marginTop: '20px', fontSize: '0.8rem', color: '#c5a880', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-serif)' }}>
              KUNIKA PAGARIA
            </div>
            <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: '8px', fontFamily: 'var(--font-sans)' }}>
              Designed underneath the twilight sky.
            </div>
            {currentPage === 5 && (
              <div
                style={{ marginTop: '16px', fontSize: '0.72rem', color: 'rgba(197,168,128,0.7)', letterSpacing: '0.12em', cursor: 'pointer', fontFamily: 'var(--font-serif)' }}
                onClick={(e) => goToPage(4)}
              >
                ↩ Reopen
              </div>
            )}
          </div>
        }
      />

      {/* ═══════ 3D JOURNEY SCENE ═══════ */}
      {currentPage === 2 && isOpen && <JourneyScene3D />}

    </group>
  );
};

export default Book3D;

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Book3D from './components/Book3D';
import Environment3D from './components/Environment3D';
import Book from './components/Book';
import ParallaxStars from './components/ParallaxStars';
import { BookOpen } from 'lucide-react';
import CelestialHeader from './components/CelestialHeader';
import { JourneyProvider } from './components/JourneyContext';
import JourneyOverlay from './components/JourneyOverlay';
import CameraDebugPanel from './components/CameraDebugPanel';
import BookCameraDebugPanel, { BookCameraController, DEFAULT_BOOK_CAM, DEFAULT_BOOK_CAM_JOURNEY } from './components/BookCameraDebugPanel';


function App() {
  const [is3D, setIs3D] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [bookCamParams, setBookCamParams] = useState(DEFAULT_BOOK_CAM);

  const isOpen = currentPage > 0 && currentPage < 6;

  // Switch to page-appropriate camera defaults when navigating
  const currentDefault = currentPage === 2 ? DEFAULT_BOOK_CAM_JOURNEY : DEFAULT_BOOK_CAM;
  useEffect(() => {
    setBookCamParams(currentPage === 2 ? DEFAULT_BOOK_CAM_JOURNEY : DEFAULT_BOOK_CAM);
  }, [currentPage]);

  // Synchronize book open state with page index changes
  const handleNextPage = () => {
    if (currentPage < 6) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleReset = () => {
    setCurrentPage(0);
  };

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  // Keyboard navigation for turning pages
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore key events if the user is typing in form fields
      const activeEl = document.activeElement;
      if (
        activeEl && 
        (activeEl.tagName === 'INPUT' || 
         activeEl.tagName === 'TEXTAREA' || 
         activeEl.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        handleNextPage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage]);

  // Auto-reset after showing the back cover
  useEffect(() => {
    if (currentPage === 6) {
      const timer = setTimeout(() => setCurrentPage(0), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  return (
    <JourneyProvider>
      <JourneyOverlay />
      <CameraDebugPanel />
      {is3D && (
        <BookCameraDebugPanel params={bookCamParams} setParams={setBookCamParams} defaultParams={currentDefault} />
      )}

      {/* 1. Canvas Starfield with Parallax and Particle Trails (shared background) */}
      <ParallaxStars />

      {/* 2. Soft, Animated Cloud Background */}
      <div className="clouds-container" style={{ zIndex: 0 }}>
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
      </div>

      {/* 3.5. Interactive Navigation Header Overlay (only visible when book is open) */}
      {isOpen && (
        <CelestialHeader currentPage={currentPage} goToPage={goToPage} />
      )}

      {/* 4. Book Interaction Layer (2D HTML/CSS or 3D WebGL Canvas) */}
      {is3D ? (
        /* 3D WebGL Book View */
        <div 
          className="three-canvas-container"
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh', 
            zIndex: 1, 
            pointerEvents: 'auto' 
          }}
        >
          <Canvas
            shadows
            camera={{ position: [0, 0, 20], fov: 42 }}
          >
            <Environment3D />
            <Book3D
              isOpen={isOpen}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              extRotX={bookCamParams.bookRotX}
              extRotY={bookCamParams.bookRotY}
            />
            <BookCameraController params={bookCamParams} />
          </Canvas>
        </div>
      ) : (
        /* 2D HTML/CSS Book View */
        <div className="book-wrapper">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <Book
              isOpen={isOpen}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      )}

      {/* 5. HTML Navigation UI Overlays (placed on top of Canvas/Book) */}
      <div 
        style={{ 
          position: 'fixed', 
          bottom: '30px', 
          left: 0, 
          width: '100vw', 
          display: 'flex', 
          justifyContent: 'center', 
          zIndex: 10, 
          pointerEvents: 'none' 
        }}
      >
        <div 
          style={{ 
            pointerEvents: 'auto', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center' 
          }}
        >
          {!isOpen && (
            <div 
              style={{
                color: '#ffffff',
                fontSize: '0.85rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                opacity: 0.8,
                animation: 'pulseGlow 2s infinite alternate',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                pointerEvents: 'none',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500
              }}
            >
              <BookOpen size={16} />
              {is3D ? "Drag screen to rotate • Click cover to open" : "Click the book to open"}
            </div>
          )}
        </div>
      </div>

      {/* Back cover — fixed overlay, independent of the book's flip/transition system */}
      {currentPage === 6 && (
        <div style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '440px', height: '600px', zIndex: 200,
          background: 'radial-gradient(circle at center, rgba(28,45,96,1) 0%, rgba(14,22,48,1) 100%)',
          borderRadius: '10px 18px 18px 10px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          padding: '40px', boxSizing: 'border-box',
        }}>
          <div style={{ width: '80%', opacity: 0.6 }}>
            <svg viewBox="0 0 400 150" fill="none" style={{ width: '100%' }}>
              <path d="M 10,75 C 30,75 35,50 45,50 C 50,50 55,60 55,68 C 55,80 35,85 35,95 C 35,105 55,108 60,95 C 63,88 65,55 70,55 C 75,55 80,75 90,75 L 110,75 C 125,75 130,55 138,55 C 142,55 145,62 145,68 C 145,78 128,82 128,92 C 128,100 145,103 150,92 C 152,85 155,58 158,58 C 162,58 165,75 180,75 L 200,75 C 205,75 208,65 210,65 C 212,65 213,70 213,78 C 213,85 205,88 205,95 C 205,102 215,104 218,95 C 220,88 221,68 223,68 C 225,68 228,75 235,75 L 250,75 C 260,75 262,68 265,68 C 270,68 273,50 278,45 C 283,40 292,40 295,45 C 298,50 295,65 292,72 C 288,80 282,88 282,92 C 282,96 295,96 320,96 C 335,96 335,80 335,75 C 335,70 338,70 340,75 C 342,80 345,96 360,96 L 390,75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="205" cy="125" r="2.5" fill="white" opacity="0.8"/>
              <circle cx="100" cy="130" r="1.5" fill="white" opacity="0.5"/>
            </svg>
          </div>
          <div style={{ marginTop: '20px', fontSize: '0.8rem', color: '#c5a880', letterSpacing: '0.15em', textTransform: 'uppercase' }}>KUNIKA PAGARIA</div>
          <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: '8px' }}>Designed underneath the twilight sky.</div>
          <div style={{ marginTop: '16px', fontSize: '0.72rem', color: 'rgba(197,168,128,0.7)', letterSpacing: '0.12em', cursor: 'pointer', fontFamily: 'var(--font-serif)' }} onClick={() => setCurrentPage(1)}>↩ Reopen</div>
        </div>
      )}

      {/* Inline animations helper for tip glow */}
      <style>{`
        @keyframes pulseGlow {
          0% {
            opacity: 0.5;
            text-shadow: 0 0 5px rgba(255,255,255,0.3);
          }
          100% {
            opacity: 1;
            text-shadow: 0 0 15px rgba(255,255,255,0.8);
          }
        }
      `}</style>
    </JourneyProvider>
  );
}

export default App;

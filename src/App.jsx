import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Book3D from './components/Book3D';
import Environment3D from './components/Environment3D';
import Book from './components/Book';
import ParallaxStars from './components/ParallaxStars';
import { BookOpen, Box, Layers } from 'lucide-react';
import CelestialHeader from './components/CelestialHeader';
import { JourneyProvider } from './components/JourneyContext';


function App() {
  const [is3D, setIs3D] = useState(false); // Default to 2D view as requested
  const [currentPage, setCurrentPage] = useState(0);

  const isOpen = currentPage > 0 && currentPage < 5;

  // Synchronize book open state with page index changes
  const handleNextPage = () => {
    if (currentPage < 5) {
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

  // Auto-reset book to front page after 2 seconds on the back cover (page 5)
  useEffect(() => {
    if (currentPage === 5) {
      const timer = setTimeout(() => {
        handleReset();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);


  return (
    <JourneyProvider>
      {/* 1. Canvas Starfield with Parallax and Particle Trails (shared background) */}
      <ParallaxStars />

      {/* 2. Soft, Animated Cloud Background */}
      <div className="clouds-container" style={{ zIndex: 0 }}>
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
      </div>

      {/* 3. Floating View Mode Toggle Button */}
      <div 
        style={{ 
          position: 'fixed', 
          top: '25px', 
          right: '25px', 
          zIndex: 100, 
          pointerEvents: 'auto' 
        }}
      >
        <button 
          onClick={() => setIs3D(!is3D)} 
          className="toggle-view-btn"
          aria-label={is3D ? "Switch to 2D Mode" : "Switch to 3D Mode"}
        >
          {is3D ? (
            <>
              <Layers size={16} />
              <span>2D View</span>
            </>
          ) : (
            <>
              <Box size={16} />
              <span>3D View</span>
            </>
          )}
        </button>
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
            />
            <OrbitControls 
              enablePan={false} 
              enableRotate={false}
              minDistance={15} 
              maxDistance={40}
            />
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

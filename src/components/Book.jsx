import React, { useRef } from 'react';
import { AboutPage, SkillsPage, WorkPage, FunFactsPage, ContactPage } from './BookPages';
import { JourneyLeft, JourneyRight } from './JourneyMap';
import kunikaPhoto from '../assets/kunika.jpg';
import coverArt from '../assets/cover_art.png';

const MAX_TILT_DEG = 8;

const Book = ({ isOpen, currentPage, setCurrentPage }) => {
  // Max pages represents the number of page turns (0 to 5)
  // 0: Closed (Front Cover)
  // 1: Open to Spread 1 (Inside cover on left, About Me on right)
  // 2: Open to Spread 2 (Skills on left, Journey on right)
  // 3: Open to Spread 3 (Work on left, Fun Facts on right)
  // 4: Open to Spread 4 (Contact on left, Inside back cover on right)
  // 5: Closed Back (Back Cover)

  const bookRef = useRef(null);

  const handlePageTurn = (dir, e) => {
    e.stopPropagation();
    if (dir === 'next' && currentPage < 5) {
      setCurrentPage(currentPage + 1);
    } else if (dir === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleBookClick = () => {
    if (!isOpen) {
      setCurrentPage(1); // Open to About Me
    }
  };

  // Once a sheet is flipped, it should stack above earlier flipped sheets (closer to
  // the viewer); while unflipped, the soonest-to-turn sheet should stack on top of the
  // ones still further ahead. Otherwise an early page (e.g. About) stays visually and
  // interactively on top of later pages (e.g. Work, Contact) once you've paged past it.
  const sheetZIndex = (sheetNum) =>
    currentPage >= sheetNum ? 10 + sheetNum : 10 - sheetNum;

  // Only the two page-sides that make up the currently visible spread should ever
  // receive pointer events. With preserve-3d + rotateY page flips, overlapping
  // inactive sheets can otherwise intercept hover/clicks meant for the active page
  // (z-index alone doesn't fully control hit-testing across 3D-transformed layers).
  const isFrontActive = (sheetNum) => currentPage === sheetNum - 1;
  const isBackActive = (sheetNum) => currentPage === sheetNum;
  // Sheets use translateZ for depth ordering; an inactive sheet closer to the
  // camera (larger translateZ) can still intercept the compositor's hit-testing
  // for content behind it even when its own page-sides are pointer-events:none,
  // so the outer sheet itself must also be excluded when neither face is active.
  const isSheetActive = (sheetNum) => isFrontActive(sheetNum) || isBackActive(sheetNum);

  // Mouse-parallax tilt on the closed cover, standing in for the unfinished 3D view
  const handleMouseMove = (e) => {
    if (isOpen || !bookRef.current) return;
    const rect = bookRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    bookRef.current.style.setProperty('--tilt-y', `${relX * MAX_TILT_DEG * 2}deg`);
    bookRef.current.style.setProperty('--tilt-x', `${-relY * MAX_TILT_DEG * 2}deg`);
  };

  const handleMouseLeave = () => {
    if (!bookRef.current) return;
    bookRef.current.style.setProperty('--tilt-x', '0deg');
    bookRef.current.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <div className={`book-float-wrapper ${isOpen ? 'open' : 'closed'}`}>
      <div
        ref={bookRef}
        className={`book ${isOpen ? 'open' : 'closed'} page-${currentPage}`}
        onClick={handleBookClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >

      {/* ================= SHEET 1: FRONT COVER / INSIDE LEFT ================= */}
      <div className={`book-page ${currentPage >= 1 ? 'flipped' : ''} ${isSheetActive(1) ? '' : 'sheet-inactive'}`} style={{ zIndex: sheetZIndex(1) }}>
        {/* Front Cover — illustration full-bleed */}
        <div className={`page-side page-front cover-front ${isFrontActive(1) ? '' : 'sheet-inactive'}`} style={{ padding: 0, overflow: 'hidden' }}>
          {/* Full-bleed illustration */}
          <img
            src={coverArt}
            alt="Cover Art"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              borderRadius: 'inherit',
            }}
          />

          {/* Bottom gradient overlay for text readability */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '45%',
            background: 'linear-gradient(to top, rgba(35,15,25,0.88) 0%, rgba(35,15,25,0.50) 60%, transparent 100%)',
            borderRadius: 'inherit',
          }} />

          {/* Title text overlay */}
          <div style={{
            position: 'absolute',
            bottom: '36px',
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          }}>
            <div style={{ fontSize: '0.62rem', letterSpacing: '0.28em', color: 'rgba(232,180,192,0.90)', fontFamily: 'var(--font-sans)', fontWeight: 500, textTransform: 'uppercase' }}>Portfolio</div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.55rem', fontWeight: 700, color: '#fce8e8', letterSpacing: '0.1em', margin: 0, textAlign: 'center' }}>KUNIKA PAGARIA</h1>
            <div style={{ fontSize: '0.62rem', letterSpacing: '0.22em', color: 'rgba(232,180,192,0.85)', fontFamily: 'var(--font-sans)', fontWeight: 400 }}>AI Assisted Developer</div>
          </div>
        </div>

        {/* Sheet 1 Back: About Me (was Introductory) */}
        <div className={`page-side page-back ${isBackActive(1) ? '' : 'sheet-inactive'}`} style={{ zIndex: 1 }}>
          <AboutPage
            currentPage={currentPage}
            goToPage={goToPage}
            onNext={(e) => handlePageTurn('next', e)}
          />
        </div>
      </div>

      {/* ================= SHEET 2: SKILLS / JOURNEY LEFT ================= */}
      <div className={`book-page ${currentPage >= 2 ? 'flipped' : ''} ${isSheetActive(2) ? '' : 'sheet-inactive'}`} style={{ zIndex: sheetZIndex(2) }}>
        {/* Front Side: Skills */}
        <div className={`page-side page-front ${isFrontActive(2) ? '' : 'sheet-inactive'}`}>
          <SkillsPage
            currentPage={currentPage}
            goToPage={goToPage}
            onNext={(e) => handlePageTurn('next', e)}
          />
        </div>

        {/* Back Side: Journey Left */}
        <div className={`page-side page-back ${isBackActive(2) ? '' : 'sheet-inactive'}`}>
          <JourneyLeft
            onPrev={(e) => handlePageTurn('prev', e)} 
          />
        </div>
      </div>

      {/* ================= SHEET 3: JOURNEY RIGHT / WORK ================= */}
      <div className={`book-page ${currentPage >= 3 ? 'flipped' : ''} ${isSheetActive(3) ? '' : 'sheet-inactive'}`} style={{ zIndex: sheetZIndex(3) }}>
        {/* Front Side: Journey Right */}
        <div className={`page-side page-front ${isFrontActive(3) ? '' : 'sheet-inactive'}`}>
          <JourneyRight
            onNext={(e) => handlePageTurn('next', e)}
          />
        </div>

        {/* Back Side: Work Part 1 */}
        <div className={`page-side page-back ${isBackActive(3) ? '' : 'sheet-inactive'}`}>
          <WorkPage
            part={1}
            currentPage={currentPage}
            goToPage={goToPage}
            onPrev={(e) => handlePageTurn('prev', e)} 
          />
        </div>
      </div>

      {/* ================= SHEET 4: WORK PART 2 / FUN FACTS ================= */}
      <div className={`book-page ${currentPage >= 4 ? 'flipped' : ''} ${isSheetActive(4) ? '' : 'sheet-inactive'}`} style={{ zIndex: sheetZIndex(4) }}>
        {/* Front Side: Work Part 2 */}
        <div className={`page-side page-front ${isFrontActive(4) ? '' : 'sheet-inactive'}`}>
          <WorkPage
            part={2}
            currentPage={currentPage}
            goToPage={goToPage}
            onNext={(e) => handlePageTurn('next', e)}
          />
        </div>

        {/* Back Side: Fun Facts */}
        <div className={`page-side page-back ${isBackActive(4) ? '' : 'sheet-inactive'}`}>
          <FunFactsPage
            currentPage={currentPage}
            goToPage={goToPage}
            onPrev={(e) => handlePageTurn('prev', e)} 
          />
        </div>
      </div>

      {/* ================= SHEET 5: CONTACT / BACK COVER ================= */}
      <div className={`book-page ${currentPage >= 5 ? 'flipped' : ''} ${isSheetActive(5) ? '' : 'sheet-inactive'}`} style={{ zIndex: sheetZIndex(5) }}>
        {/* Front Side: Contact */}
        <div className={`page-side page-front ${isFrontActive(5) ? '' : 'sheet-inactive'}`}>
          <ContactPage
            currentPage={currentPage}
            goToPage={goToPage}
            onNext={(e) => handlePageTurn('next', e)}
          />
        </div>

        {/* Back Cover */}
        <div className={`page-side page-back cover-back ${isBackActive(5) ? '' : 'sheet-inactive'}`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
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
          <div style={{ marginTop: '20px', fontSize: '0.8rem', color: '#c5a880', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            KUNIKA PAGARIA
          </div>
          <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: '8px' }}>
            Designed underneath the twilight sky.
          </div>
          {currentPage === 5 && (
            <div
              style={{ marginTop: '16px', fontSize: '0.72rem', color: 'rgba(197,168,128,0.7)', letterSpacing: '0.12em', cursor: 'pointer', fontFamily: 'var(--font-serif)' }}
              onClick={(e) => handlePageTurn('prev', e)}
            >
              ↩ Reopen
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Book;

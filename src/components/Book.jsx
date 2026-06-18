import React from 'react';
import { AboutPage, SkillsPage, WorkPage, FunFactsPage, ContactPage } from './BookPages';
import { JourneyLeft, JourneyRight } from './JourneyMap';
import kunikaPhoto from '../assets/kunika.jpg';

const Book = ({ isOpen, currentPage, setCurrentPage }) => {
  // Max pages represents the number of page turns (0 to 5)
  // 0: Closed (Front Cover)
  // 1: Open to Spread 1 (Inside cover on left, About Me on right)
  // 2: Open to Spread 2 (Skills on left, Journey on right)
  // 3: Open to Spread 3 (Work on left, Fun Facts on right)
  // 4: Open to Spread 4 (Contact on left, Inside back cover on right)
  // 5: Closed Back (Back Cover)

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

  return (
    <div className={`book-float-wrapper ${isOpen ? 'open' : 'closed'}`}>
      <div 
        className={`book ${isOpen ? 'open' : 'closed'} page-${currentPage}`} 
        onClick={handleBookClick}
      >

      {/* ================= SHEET 1: FRONT COVER / INSIDE LEFT ================= */}
      <div className={`book-page ${currentPage >= 1 ? 'flipped' : ''}`} style={{ zIndex: 5 }}>
        {/* Front Cover (Visible when book is closed) */}
        <div className="page-side page-front cover-front">
          {/* Elegant Double Gold Border */}
          <div className="cover-border-outer">
            <div className="cover-border-inner"></div>
          </div>

          {/* Glowing Turtle Cover Art */}
          <div className="cover-fairy" style={{ width: '80px', height: '80px', top: 'auto', bottom: '150px', right: '40px' }}>
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

          <div className="cover-header">
            Portfolio
          </div>

          <div className="cover-title-container">
            <h1 className="cover-horizontal-title">
              <span className="horizontal-word">KUNIKA</span>
              <span className="cover-horizontal-line"></span>
              <span className="horizontal-word">PAGARIA</span>
            </h1>
            <div className="cover-subtitle">
              AI Assisted Developer
            </div>
          </div>

          {/* Stardust trail drawing */}
          <div style={{ position: 'absolute', bottom: '40%', right: '22%', width: '40%', opacity: 0.55 }}>
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

        {/* Sheet 1 Back: About Me (was Introductory) */}
        <div className="page-side page-back" style={{ zIndex: 1 }}>
          <AboutPage 
            currentPage={currentPage}
            goToPage={goToPage}
            onNext={(e) => handlePageTurn('next', e)}
          />
        </div>
      </div>

      {/* ================= SHEET 2: SKILLS / JOURNEY LEFT ================= */}
      <div className={`book-page ${currentPage >= 2 ? 'flipped' : ''}`} style={{ zIndex: 5 }}>
        {/* Front Side: Skills */}
        <div className="page-side page-front">
          <SkillsPage 
            currentPage={currentPage}
            goToPage={goToPage}
            onNext={(e) => handlePageTurn('next', e)} 
          />
        </div>

        {/* Back Side: Journey Left */}
        <div className="page-side page-back">
          <JourneyLeft 
            onPrev={(e) => handlePageTurn('prev', e)} 
          />
        </div>
      </div>

      {/* ================= SHEET 3: JOURNEY RIGHT / WORK ================= */}
      <div className={`book-page ${currentPage >= 3 ? 'flipped' : ''}`} style={{ zIndex: 4 }}>
        {/* Front Side: Journey Right */}
        <div className="page-side page-front">
          <JourneyRight 
            onNext={(e) => handlePageTurn('next', e)} 
          />
        </div>

        {/* Back Side: Work */}
        <div className="page-side page-back">
          <WorkPage 
            currentPage={currentPage}
            goToPage={goToPage}
            onPrev={(e) => handlePageTurn('prev', e)} 
          />
        </div>
      </div>

      {/* ================= SHEET 4: FUN FACTS / CONTACT ================= */}
      <div className={`book-page ${currentPage >= 4 ? 'flipped' : ''}`} style={{ zIndex: 3 }}>
        {/* Front Side: Fun Facts */}
        <div className="page-side page-front">
          <FunFactsPage 
            currentPage={currentPage}
            goToPage={goToPage}
            onNext={(e) => handlePageTurn('next', e)} 
          />
        </div>

        {/* Back Side: Contact */}
        <div className="page-side page-back">
          <ContactPage 
            currentPage={currentPage}
            goToPage={goToPage}
            onPrev={(e) => handlePageTurn('prev', e)} 
          />
        </div>
      </div>

      {/* ================= SHEET 5: FINIS / BACK COVER ================= */}
      <div className={`book-page ${currentPage >= 5 ? 'flipped' : ''}`} style={{ zIndex: 2 }}>
        {/* Front Side: Finis */}
        <div className="page-side page-front">
          <div className="paper-page" style={{ justifyContent: 'center', alignItems: 'center' }}>
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

        {/* Back Cover */}
        <div className="page-side page-back cover-back" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
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
            <span className="corner-tab corner-tab-left" style={{ bottom: '25px', left: '25px' }} onClick={(e) => handlePageTurn('prev', e)}>
              &larr; Reopen
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Book;

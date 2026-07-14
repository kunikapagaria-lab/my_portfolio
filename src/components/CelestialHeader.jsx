import React from 'react';

const CelestialHeader = ({ currentPage, goToPage }) => {
  const chapters = [
    { id: 0, label: 'Cover',          page: 0 },
    { id: 1, label: 'Persona',        page: 1 },
    { id: 2, label: 'Journey',        page: 2 },
    { id: 3, label: 'Creations',      page: 3 },
    { id: 4, label: 'Contact Me',     page: 4 },
  ];

  const activeNodeId = currentPage >= 5 ? 0 : currentPage;

  const tabWidth = 110;
  const startOffset = 55;
  // Find which tab index should show the star (match by page, take first match)
  const activeTabIndex = chapters.findIndex(ch => ch.page === activeNodeId);
  const starOffset = (activeTabIndex >= 0 ? activeTabIndex : 0) * tabWidth + startOffset;

  return (
    <div className="celestial-header-container">
      <div className="celestial-header-tabs" style={{ width: `${chapters.length * tabWidth}px` }}>
        {chapters.map((ch) => {
          const isActive = ch.page === activeNodeId;
          return (
            <button
              key={ch.id}
              onClick={() => goToPage(ch.page)}
              className={`celestial-header-tab ${isActive ? 'active' : ''}`}
              style={{ width: `${tabWidth}px` }}
            >
              {ch.label}
            </button>
          );
        })}

        {/* Sliding Star Tracker */}
        <div className="celestial-tracker-line" style={{ width: `${chapters.length * tabWidth}px` }}>
          <svg 
            width="100%" 
            height="16" 
            style={{ overflow: 'visible' }}
          >
            {/* Horizontal gold background line */}
            <line 
              x1="20" 
              y1="8" 
              x2={chapters.length * tabWidth - 20} 
              y2="8" 
              stroke="rgba(197, 168, 128, 0.2)" 
              strokeWidth="1" 
              strokeDasharray="2 3"
            />
            {/* Active gold progress line */}
            <line 
              x1="55" 
              y1="8" 
              x2={starOffset} 
              y2="8" 
              stroke="var(--color-gold)" 
              strokeWidth="1" 
              strokeDasharray="2 3"
              style={{ transition: 'x2 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)' }}
            />
            {/* Star pointer */}
            <g 
              transform={`translate(${starOffset}, 8)`}
              style={{ transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)' }}
            >
              <circle r="6" fill="rgba(255, 255, 255, 0.15)" />
              <path
                d="M 0 -5 L 1.5 -1.5 L 5 0 L 1.5 1.5 L 0 5 L -1.5 1.5 L -5 0 L -1.5 -1.5 Z"
                fill="#ffffff"
                style={{ filter: 'drop-shadow(0 0 4px var(--color-gold))' }}
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CelestialHeader;

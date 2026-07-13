import React, { createContext, useContext, useState, useRef } from 'react';

export const JOURNEY_MILESTONES = [
  { year: '2015', title: 'Journey Begins',     sub: 'The adventure starts'    },
  { year: '2019', title: 'Class X',            sub: 'Newtown School · 90%'   },
  { year: '2021', title: 'Class XII',          sub: 'Newtown School · 83%'   },
  { year: '2025', title: 'B.Tech CSE (AIML)', sub: 'UEM Kolkata · Graduated' },
  { year: '2025', title: 'NCC C Certificate', sub: 'Naval Wing · Captain'    },
];

// Default camera offset values — all relative to the clicked building's world position (wp)
// camFor  = (wp.x,          wp.y + camDy, wp.z + camDz)
// lookAt  = (wp.x + lookDx, wp.y + lookDy, wp.z + lookDz)
export const DEFAULT_CAM_PARAMS = {
  camDy:  -1.450,
  camDz:   4.250,
  lookDx:  0.500,
  lookDy: -0.350,
  lookDz:  0.150,
  fov:     18,
  roll:     2.0,
};

const JourneyContext = createContext({
  concept: 'A', setConcept: () => {},
  zoomed: null,  setZoomed: () => {},
  registerNav: () => {},
  doBack: () => {}, doNext: () => {},
  camParams: DEFAULT_CAM_PARAMS, setCamParams: () => {},
  registerPreview: () => {}, startPreview: () => {},
  journeyCamActiveRef: { current: false }, setJourneyCamActive: () => {},
});

export const JourneyProvider = ({ children }) => {
  const [concept, setConcept] = useState('A');
  const [zoomed, setZoomed]   = useState(null);
  const [camParams, setCamParams] = useState(DEFAULT_CAM_PARAMS);
  const navRef     = useRef({ back: null, next: null });
  const previewRef = useRef(null);
  // True while JourneyScene3D is actively animating the camera
  const journeyCamActiveRef = useRef(false);

  // Patch drag-and-drop editor — state lives here so HTML panel (outside Canvas)
  // and the 3D scene (inside Canvas) can both read/write it via context.
  const [patchEdit,   setPatchEdit]   = useState(false);
  const [patchXY,     setPatchXY]     = useState(null); // null = use scene defaults
  const [activePatch, setActivePatch] = useState(null);

  const registerNav     = (back, next) => { navRef.current.back = back; navRef.current.next = next; };
  const registerPreview = (fn)         => { previewRef.current = fn; };
  const startPreview    = ()           => previewRef.current?.();
  const setJourneyCamActive = (val)    => { journeyCamActiveRef.current = val; };

  const doBack = () => navRef.current.back?.();
  const doNext = () => navRef.current.next?.();

  return (
    <JourneyContext.Provider value={{
      concept, setConcept,
      zoomed, setZoomed,
      registerNav, doBack, doNext,
      camParams, setCamParams,
      registerPreview, startPreview,
      journeyCamActiveRef, setJourneyCamActive,
      patchEdit, setPatchEdit,
      patchXY,   setPatchXY,
      activePatch, setActivePatch,
    }}>
      {children}
    </JourneyContext.Provider>
  );
};

export const useJourney = () => useContext(JourneyContext);

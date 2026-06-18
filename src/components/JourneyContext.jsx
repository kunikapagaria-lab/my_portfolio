import React, { createContext, useContext, useState } from 'react';

const JourneyContext = createContext({ concept: 'A', setConcept: () => {} });

export const JourneyProvider = ({ children }) => {
  const [concept, setConcept] = useState('A');
  return (
    <JourneyContext.Provider value={{ concept, setConcept }}>
      {children}
    </JourneyContext.Provider>
  );
};

export const useJourney = () => useContext(JourneyContext);

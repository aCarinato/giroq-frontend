import React, { useContext, useState } from 'react';

const mainContext = React.createContext();

export function useMainContext() {
  return useContext(mainContext);
}

export function ContextProvider({ children }) {
  // All data from API
  const [eventsCtx, setEventsCtx] = useState([]);

  // SELECTION
  const [currentPlaceIdCtx, setCurrentPlaceIdCtx] = useState(null);

  const value = {
    eventsCtx,
    setEventsCtx,
    currentPlaceIdCtx,
    setCurrentPlaceIdCtx,
  };

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>;
}

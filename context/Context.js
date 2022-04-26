import React, { useContext, useState } from 'react';

const mainContext = React.createContext();

export function useMainContext() {
  return useContext(mainContext);
}

export function ContextProvider({ children }) {
  // All data from API
  const [eventData, setEventData] = useState([]);

  // SELECTION
  const [currentPlaceIdCtx, setCurrentPlaceIdCtx] = useState(null);

  //Need to re-render markers because user has changed filer option
  const [reRenderMarkers, setReRenderMarkers] = useState(null);

  const value = {
    eventData,
    setEventData,
    currentPlaceIdCtx,
    setCurrentPlaceIdCtx,
    reRenderMarkers,
    setReRenderMarkers,
  };

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>;
}

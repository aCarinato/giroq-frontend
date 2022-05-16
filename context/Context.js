import React, { useContext, useState } from 'react';

const mainContext = React.createContext();

export function useMainContext() {
  return useContext(mainContext);
}

export function ContextProvider({ children }) {
  // All data from API
  const [eventData, setEventData] = useState([]);

  // MAP reference object
  const [mapCenter, setMapCenter] = useState({ lat: 45.671519, lng: 11.68314 });
  const [zoom, setZoom] = useState(10);

  //Need to re-render markers because user has changed filer option
  const [reRenderMarkers, setReRenderMarkers] = useState(null);

  // Selected event
  const [selectedEvent, setSetSelectedEvent] = useState(null);

  // Mobile
  const [mobileView, setMobileView] = useState(null);

  const value = {
    eventData,
    setEventData,
    mapCenter,
    setMapCenter,
    zoom,
    setZoom,
    reRenderMarkers,
    setReRenderMarkers,
    selectedEvent,
    setSetSelectedEvent,
    mobileView,
    setMobileView,
  };

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>;
}

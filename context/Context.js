import React, { useContext, useState } from 'react';

const mainContext = React.createContext({
  userName: '',
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export function useMainContext() {
  return useContext(mainContext);
}

export function ContextProvider({ children }) {
  // All data from API
  const [eventData, setEventData] = useState([]);

  // MAP reference object
  const [mapCenter, setMapCenter] = useState({ lat: 45.671519, lng: 11.68314 });
  const [zoom, setZoom] = useState(8);

  //Need to re-render markers because user has changed filer option
  // const [reRenderMarkers, setReRenderMarkers] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState(null);

  // Selected event
  const [selectedEvent, setSetSelectedEvent] = useState(null);

  // Mobile
  const [mobileView, setMobileView] = useState(null);

  // AUTHENTICATION
  let initialToken;
  if (typeof window !== 'undefined') {
    initialToken = localStorage.getItem('token');
  }

  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;
  const [username, setUsername] = useState(null);

  const loginHandler = (username, token) => {
    setUsername(username);
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logoutHandler = () => {
    setUsername(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const value = {
    eventData,
    setEventData,
    mapCenter,
    setMapCenter,
    zoom,
    setZoom,
    filteredEvents,
    setFilteredEvents,
    selectedEvent,
    setSetSelectedEvent,
    mobileView,
    setMobileView,

    // AUTH
    username: username,
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>;
}

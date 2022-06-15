import React, { useContext, useState, useEffect } from 'react';
// import axios from 'axios';

const mainContext = React.createContext({
  authState: {},
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

  const [authState, setAuthState] = useState({
    username: '',
    email: '',
    token: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAuthState(JSON.parse(localStorage.getItem('auth')));
    }
  }, []);

  // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  // const [userEmail, setUserEmail] = useState('')

  const loginHandler = (username, email, token) => {
    // setUsername(username);
    // setToken(token);
    localStorage.setItem('token', token);

    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    localStorage.setItem(
      'auth',
      JSON.stringify({
        username,
        token,
        email,
      })
    );
    setAuthState({
      username,
      token,
      email,
    });
  };

  const logoutHandler = () => {
    // setUsername(null);
    // setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('auth');
    setAuthState({
      username: '',
      email: '',
      token: '',
    });
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
    authState: authState,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>;
}

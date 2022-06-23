import React, { useContext, useState, useEffect } from 'react';
// import axios from 'axios';

const mainContext = React.createContext({
  // eventData,
  //   setEventData,
  //   mapCenter,
  //   setMapCenter,
  //   zoom,
  //   setZoom,
  //   filteredEvents,
  //   setFilteredEvents,
  //   selectedEvent,
  //   setSetSelectedEvent,
  // mobileView,
  // setMobileView,
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
    preferences: [],
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 820) {
        setMobileView(true);
      } else {
        setMobileView(false);
      }

      setAuthState(JSON.parse(localStorage.getItem('gq-user-auth')));
    }

    // if (typeof window !== 'undefined') {
    //   if (window.innerWidth <= 820) {
    //     setMobileView(true);
    //   } else {
    //     setMobileView(false);
    //   }
    // }
  }, []);

  // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  // const [userEmail, setUserEmail] = useState('')

  const loginHandler = (username, email, token, preferences) => {
    // setUsername(username);
    // setToken(token);
    localStorage.setItem('token', token);

    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    localStorage.setItem(
      'gq-user-auth',
      JSON.stringify({
        username,
        token,
        email,
        preferences,
      })
    );

    setAuthState({
      username,
      token,
      email,
      preferences,
    });
  };

  const logoutHandler = () => {
    // setUsername(null);
    // setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('gq-user-auth');
    setAuthState({
      username: '',
      email: '',
      token: '',
      preferences: [],
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
